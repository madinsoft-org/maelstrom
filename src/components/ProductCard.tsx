"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { useCartStore } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
  };

  return (
    <Link href={`/boutique/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
        {/* Placeholder image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-sm font-medium">{product.name}</span>
        </div>
        {/* Quick add button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-900 hover:text-white"
          aria-label="Ajouter au panier"
        >
          <ShoppingBag size={18} />
        </button>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            Coup de cœur
          </span>
        )}
      </div>
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 group-hover:underline">
            {product.name}
          </h3>
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {product.price.toFixed(2)} €
          </span>
        </div>
        <div className="mt-1 flex gap-1.5">
          {product.colors.slice(0, 3).map((color) => (
            <span
              key={color}
              className="text-xs text-gray-500"
            >
              {color}
            </span>
          ))}
          {product.colors.length > 3 && (
            <span className="text-xs text-gray-400">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
