import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Error verificando webhook:", error);
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Pago completado → activar suscripción
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;

        if (!userId) break;

        const stripeSubscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = stripeSubscription.items.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);
        const periodEnd = stripeSubscription.items.data[0].current_period_end;

        await prisma.subscription.update({
          where: { userId },
          data: {
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            plan,
            status: "active",
            currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
          },
        });
        break;
      }

      // Renovación mensual exitosa
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | { id: string };
        };

        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;

        if (!subscriptionId) break;

        const stripeSubscription =
          await stripe.subscriptions.retrieve(subscriptionId);
        const periodEnd = stripeSubscription.items.data[0].current_period_end;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            status: "active",
            currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
          },
        });
        break;
      }

      // Pago fallido
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | { id: string };
        };

        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;

        if (!subscriptionId) break;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscriptionId },
          data: { status: "past_due" },
        });
        break;
      }

      // Suscripción cancelada
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: "canceled",
            plan: "free",
            stripeSubscriptionId: null,
            stripePriceId: null,
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return NextResponse.json(
      { error: "Error procesando evento" },
      { status: 500 }
    );
  }
}

function getPlanFromPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "pro";
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return "enterprise";
  return "free";
}
