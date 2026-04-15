🚀 Micro-SaaS

Plataforma SaaS completa con autenticación, suscripciones y pagos construida con Next.js 16, Prisma, Supabase y Stripe.

🌐 **Live demo:** [micro-saas-ugbb.vercel.app](https://micro-saas-ugbb.vercel.app)

---

✨ Features

- 🔐 **Autenticación** — Registro y login con email/contraseña usando NextAuth v5
- 💳 **Pagos** — Checkout y suscripciones recurrentes con Stripe
- 👤 **Dashboard** — Panel de usuario con gestión de suscripción
- 🔔 **Webhooks** — Sincronización automática del estado de suscripción
- 🗄️ **Base de datos** — PostgreSQL con Prisma ORM y Supabase
- 🎨 **UI** — Diseño responsive con Tailwind CSS
- 🚀 **Deploy** — Desplegado en Vercel con CI/CD automático

---

🛠️ Tech Stack

| Tecnología | Uso |
|------------|-----|
| [Next.js 16](https://nextjs.org) | Framework React con App Router |
| [NextAuth v5](https://authjs.dev) | Autenticación |
| [Prisma](https://prisma.io) | ORM para base de datos |
| [Supabase](https://supabase.com) | PostgreSQL en la nube |
| [Stripe](https://stripe.com) | Pagos y suscripciones |
| [Tailwind CSS](https://tailwindcss.com) | Estilos |
| [Vercel](https://vercel.com) | Deploy y hosting |

---

📦 Instalación

1. Clona el repositorio

  git clone https://github.com/TrapellaG/micro-saas.git
  cd micro-saas

2. Instala las dependencias
   npm install

3. Configura las variables de entorno
   # Base de datos
  DATABASE_URL="postgresql://..."
  DIRECT_URL="postgresql://..."
  
  # NextAuth
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="tu-secret"
  
  # Stripe
  STRIPE_SECRET_KEY="sk_test_..."
  STRIPE_PUBLISHABLE_KEY="pk_test_..."
  STRIPE_WEBHOOK_SECRET="whsec_..."
  STRIPE_PRO_PRICE_ID="price_..."
  STRIPE_ENTERPRISE_PRICE_ID="price_..."
  
  # Stripe públicas
  NEXT_PUBLIC_STRIPE_PRO_PRICE_ID="price_..."
  NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID="price_..."
  NEXT_PUBLIC_APP_URL="http://localhost:3000"

4. Genera el cliente de Prisma y ejecuta las migraciones  
   npx prisma generate
   npx prisma db push

5. Arranca el servidor
   npm run dev

💳 Stripe en local
  Para probar los pagos en local necesitas el Stripe CLI:
    Escuchar webhooks
      stripe listen --forward-to localhost:3000/api/stripe/webhook
    Tarjeta de test:
    Número:  4242 4242 4242 4242
    Fecha:   12/29
    CVC:     123

🚀 Deploy en Vercel
  Importa el repositorio en Vercel
  Añade todas las variables de entorno
  Añade el webhook de Stripe apuntando a:
    https://tu-dominio.vercel.app/api/stripe/webhook
