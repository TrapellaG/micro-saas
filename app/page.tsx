import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mt-6 mb-6 leading-tight">
          La plataforma SaaS que
          <span className="text-blue-600"> necesitas</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Gestiona tus suscripciones, pagos y usuarios en un solo lugar. Empieza
          gratis y escala cuando lo necesites.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button className="px-8 py-3 text-lg">Empieza gratis</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Ver precios
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Todo lo que necesitas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¿Listo para empezar?
        </h2>
        <p className="text-gray-500 mb-8">
          Únete a miles de usuarios que ya confían en nosotros
        </p>
        <Link href="/register">
          <Button className="px-8 py-3 text-lg">Crear cuenta gratis</Button>
        </Link>
      </section>
    </main>
  );
}

const features = [
  {
    icon: "🔐",
    title: "Autenticación segura",
    description:
      "Login y registro con email y contraseña. Sesiones seguras con JWT.",
  },
  {
    icon: "💳",
    title: "Pagos con Stripe",
    description:
      "Integración completa con Stripe. Suscripciones, pagos y facturas automáticas.",
  },
  {
    icon: "📊",
    title: "Dashboard completo",
    description:
      "Gestiona tu suscripción, ve el estado de tus pagos y actualiza tu plan.",
  },
];
