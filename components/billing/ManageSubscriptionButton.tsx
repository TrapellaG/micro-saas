"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function handleManage() {
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleManage} disabled={loading} variant="outline">
      {loading ? "Redirigiendo..." : "Gestionar suscripción"}
    </Button>
  );
}
