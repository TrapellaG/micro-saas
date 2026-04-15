"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface CheckoutButtonProps {
  priceId: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function CheckoutButton({
  priceId,
  children,
  variant = "primary",
  className = "",
}: CheckoutButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error en checkout:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      variant={variant}
      className={className}
    >
      {loading ? "Redirigiendo..." : children}
    </Button>
  );
}
