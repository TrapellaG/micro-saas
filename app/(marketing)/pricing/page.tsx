import Link from "next/link";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfecto para empezar",
    features: [
      "1 proyecto",
      "1,000 requests/mes",
      "Soporte por email",
      "SSL incluido",
    ],
    cta: "Empieza gratis",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 9,
    description: "Para proyectos en crecimiento",
    features: [
      "10 proyectos",
      "100,000 requests/mes",
      "Soporte prioritario",
      "SSL incluido",
      "Analytics avanzados",
      "API access",
    ],
    cta: "Empezar con Pro",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 29,
    description: "Para equipos y empresas",
    features: [
      "Proyectos ilimitados",
      "Requests ilimitadas",
      "Soporte 24/7",
      "SSL incluido",
      "Analytics avanzados",
      "API access",
      "SLA garantizado",
      "Facturación personalizada",
    ],
    cta: "Contactar ventas",
    href: "/register",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Precios simples y transparentes
        </h1>
        <p className="text-xl text-gray-500">
          Sin sorpresas. Cancela cuando quieras.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 flex flex-col ${
              plan.highlighted
                ? "bg-blue-600 text-white shadow-xl scale-105"
                : "bg-white border border-gray-200"
            }`}
          >
            {plan.highlighted && (
              <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
                MÁS POPULAR
              </span>
            )}

            <h2
              className={`text-2xl font-bold mb-2 ${
                plan.highlighted ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.name}
            </h2>

            <p
              className={`text-sm mb-6 ${
                plan.highlighted ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {plan.description}
            </p>

            <div className="mb-6">
              <span
                className={`text-4xl font-bold ${
                  plan.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                ${plan.price}
              </span>
              <span
                className={plan.highlighted ? "text-blue-100" : "text-gray-500"}
              >
                /mes
              </span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <span>{plan.highlighted ? "✅" : "✓"}</span>
                  <span
                    className={
                      plan.highlighted ? "text-blue-100" : "text-gray-600"
                    }
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link href={plan.href}>
              <Button
                variant={plan.highlighted ? "secondary" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
