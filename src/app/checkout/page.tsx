"use client";

import { useCartStore } from "@/lib/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center text-gray-400">
        Chargement...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-light text-gray-900 mb-3">
          Connectez-vous pour commander
        </h1>
        <p className="text-gray-500 mb-6">
          Vous devez être connecté pour finaliser votre commande.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider rounded-md hover:bg-gray-700 transition-colors"
        >
          Se connecter
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    router.push("/panier");
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du paiement");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
      setLoading(false);
    }
  };

  const shipping = totalPrice() >= 150 ? 0 : 5.9;
  const total = totalPrice() + shipping;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light text-gray-900 mb-8">
        <span className="font-bold">Commande</span>
      </h1>

      {/* Order summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="font-medium text-gray-900 mb-4">Récapitulatif</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-600">
                {item.name} x{item.quantity}
                {item.size && ` (${item.size})`}
              </span>
              <span className="text-gray-900 font-medium">
                {(item.price * item.quantity).toFixed(2)} €
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Sous-total</span>
              <span>{totalPrice().toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Livraison</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">Offerte</span>
                ) : (
                  `${shipping.toFixed(2)} €`
                )}
              </span>
            </div>
            <div className="flex justify-between font-medium text-gray-900 text-lg mt-3">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected as */}
      <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-500">
          Connecté en tant que{" "}
          <span className="font-medium text-gray-900">
            {session.user?.email}
          </span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-md p-3 mb-6">
          {error}
        </div>
      )}

      {/* Pay button */}
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-4 bg-gray-900 text-white text-sm uppercase tracking-wider font-medium rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Lock size={16} />
        {loading ? "Redirection vers Stripe..." : `Payer ${total.toFixed(2)} €`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        Vous serez redirigé vers Stripe pour effectuer votre paiement de manière
        sécurisée. Vos informations bancaires ne sont jamais stockées sur nos
        serveurs.
      </p>
    </div>
  );
}
