"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/cart";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const product = products.find((p) => p.slug === params.id);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-light text-gray-900 mb-4">
          Produit non trouvé
        </h1>
        <Link href="/boutique" className="text-sm text-gray-500 hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link
        href="/boutique"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={14} />
        Retour à la boutique
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
          {product.image ? (
            <img
              src={`/maelstrom${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <span className="text-gray-400 text-lg font-medium">
                {product.name}
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-gray-900 mb-6">
            {product.price.toFixed(2)} €
          </p>

          <p className="text-gray-500 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Color selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Couleur{" "}
              {selectedColor && (
                <span className="font-normal text-gray-500">
                  — {selectedColor}
                </span>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                    selectedColor === color
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Taille
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-sm font-medium border rounded-md transition-colors ${
                    selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor}
            className={`w-full py-4 rounded-md text-sm uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-2 ${
              added
                ? "bg-green-600 text-white"
                : !selectedSize || !selectedColor
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            {added ? (
              <>
                <Check size={18} />
                Ajouté au panier !
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                Ajouter au panier
              </>
            )}
          </button>

          {(!selectedSize || !selectedColor) && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Sélectionnez une couleur et une taille
            </p>
          )}

          {/* Trust badges */}
          <div className="mt-8 pt-8 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Truck size={16} />
              Livraison offerte dès 150€
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <RotateCcw size={16} />
              Retours gratuits sous 14 jours
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Shield size={16} />
              Paiement sécurisé par Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
