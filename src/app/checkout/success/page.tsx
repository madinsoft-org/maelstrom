"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-light text-gray-900 mb-3">
        Merci pour votre <span className="font-bold">commande</span> !
      </h1>
      <p className="text-gray-500 mb-2">
        Votre paiement a été accepté avec succès.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        Vous recevrez un email de confirmation avec les détails de votre
        commande et les instructions pour l&apos;envoi de vos vêtements (si vous
        avez commandé des retouches).
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider rounded-md hover:bg-gray-700 transition-colors"
        >
          Continuer mes achats
          <ArrowRight size={14} />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 text-sm uppercase tracking-wider rounded-md hover:border-gray-900 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
