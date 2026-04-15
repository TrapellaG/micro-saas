import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ManageSubscriptionButton from "@/components/billing/ManageSubscriptionButton";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const planColors = {
    free: "bg-gray-100 text-gray-700",
    pro: "bg-blue-100 text-blue-700",
    enterprise: "bg-purple-100 text-purple-700",
  };

  const planColor =
    planColors[subscription?.plan as keyof typeof planColors] ??
    planColors.free;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {session.user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">Gestiona tu cuenta y suscripción</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tu suscripción
          </h2>

          <div className="flex items-center gap-3 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${planColor}`}
            >
              {subscription?.plan ?? "free"}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                subscription?.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {subscription?.status ?? "active"}
            </span>
          </div>

          {subscription?.currentPeriodEnd && (
            <p className="text-sm text-gray-500 mb-6">
              Próxima renovación:{" "}
              <span className="font-medium text-gray-700">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString(
                  "es-ES",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            </p>
          )}

          {subscription?.plan !== "free" ? (
            <ManageSubscriptionButton />
          ) : (
            <Link href="/pricing">
              <Button className="w-full">Actualizar plan</Button>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tu cuenta
          </h2>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium text-gray-900">{session.user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
