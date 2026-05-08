"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900">
          Notre <span className="font-bold">Boutique</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Découvrez toutes nos créations originales, imaginées et réalisées par
          notre styliste.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
          <SlidersHorizontal size={16} />
          Filtrer :
        </div>
        <a
          href="/boutique"
          className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors ${
            !selectedCategory
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-200 text-gray-600 hover:border-gray-900"
          }`}
        >
          Tout voir
        </a>
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/boutique?category=${cat.slug}`}
            className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-600 hover:border-gray-900"
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}
        {selectedCategory && (
          <>
            {" "}
            dans{" "}
            <span className="font-medium text-gray-900">
              {categories.find((c) => c.slug === selectedCategory)?.name}
            </span>
          </>
        )}
      </p>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">
            Aucun produit trouvé dans cette catégorie.
          </p>
        </div>
      )}
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-400">
          Chargement...
        </div>
      }
    >
      <BoutiqueContent />
    </Suspense>
  );
}
