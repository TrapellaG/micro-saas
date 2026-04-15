import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenido, {session.user?.name} 👋
      </h1>
      <p className="text-gray-500 mt-2">Este es tu dashboard</p>
    </main>
  );
}
