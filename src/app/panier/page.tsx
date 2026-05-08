"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-light text-gray-900 mb-3">
          Votre panier est vide
        </h1>
        <p className="text-gray-500 mb-8">
          Découvrez nos créations et nos services de retouches.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/boutique"
            className="px-6 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider rounded-md hover:bg-gray-700 transition-colors"
          >
            Voir la boutique
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 border border-gray-200 text-gray-600 text-sm uppercase tracking-wider rounded-md hover:border-gray-900 transition-colors"
          >
            Nos retouches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light text-gray-900 mb-8">
        Votre <span className="font-bold">Panier</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-4 p-4 bg-white border border-gray-100 rounded-lg"
            >
              {/* Thumbnail */}
              <div className="w-20 h-24 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                <span className="text-[10px] text-gray-400 text-center px-1">
                  {item.name}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.type === "product" ? "Vêtement" : "Retouche"}
                      {item.size && ` — Taille ${item.size}`}
                      {item.color && ` — ${item.color}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Retirer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                      aria-label="Diminuer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                      aria-label="Augmenter"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="font-medium text-gray-900">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors mt-2"
          >
            Vider le panier
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-32">
            <h2 className="font-medium text-gray-900 mb-4">Récapitulatif</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>
                  Sous-total ({items.reduce((t, i) => t + i.quantity, 0)}{" "}
                  article{items.reduce((t, i) => t + i.quantity, 0) > 1 ? "s" : ""})
                </span>
                <span>{totalPrice().toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Livraison</span>
                <span>
                  {totalPrice() >= 150 ? (
                    <span className="text-green-600">Offerte</span>
                  ) : (
                    "5,90 €"
                  )}
                </span>
              </div>
              {totalPrice() < 150 && (
                <p className="text-xs text-gray-400">
                  Plus que {(150 - totalPrice()).toFixed(2)} € pour la livraison
                  gratuite
                </p>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900 text-base">
                <span>Total</span>
                <span>
                  {(totalPrice() + (totalPrice() >= 150 ? 0 : 5.9)).toFixed(2)}{" "}
                  €
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full mt-6 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white text-sm uppercase tracking-wider font-medium rounded-md hover:bg-gray-700 transition-colors"
            >
              Commander
              <ArrowRight size={16} />
            </Link>

            <p className="text-xs text-gray-400 text-center mt-3">
              Paiement sécurisé par Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
