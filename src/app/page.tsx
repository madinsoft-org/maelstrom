"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, services } from "@/lib/data";
import { useCartStore } from "@/lib/cart";
import {
  ArrowRight,
  Scissors,
  Shirt,
  Sparkles,
  Truck,
  Plus,
} from "lucide-react";

export default function Home() {
  const addItem = useCartStore((s) => s.addItem);
  const featuredProducts = products.filter((p) => p.featured);
  const featuredServices = services.slice(0, 4);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[85vh] min-h-[600px] bg-gray-900 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
              Collection Printemps 2026
            </p>
            <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              L&apos;élégance
              <br />
              <span className="font-bold">en mouvement</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Des créations vestimentaires uniques, imaginées et réalisées par
              notre styliste. Chaque pièce raconte une histoire de style et
              d&apos;artisanat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 text-sm uppercase tracking-wider font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Découvrir la collection
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-wider font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                <Scissors size={16} />
                Nos retouches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMISE BANNER ===== */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Sparkles size={24} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm uppercase tracking-wider">
                  Créations Originales
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Chaque pièce est unique, dessinée par notre styliste
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Scissors size={24} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm uppercase tracking-wider">
                  Retouches Expert
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Service de retouches couture professionnel
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Truck size={24} className="text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 text-sm uppercase tracking-wider">
                  Livraison Offerte
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Dès 150€ d&apos;achat en France métropolitaine
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COLLECTIONS SECTION ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900">
              Nos <span className="font-bold">Collections</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Des vêtements conçus pour sublimer votre silhouette, alliant coupe
              contemporaine et matières nobles.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Robes", slug: "robes", icon: "👗" },
              { name: "Vestes & Manteaux", slug: "vestes", icon: "🧥" },
              { name: "Pantalons", slug: "pantalons", icon: "👖" },
              { name: "Tops", slug: "tops", icon: "👚" },
              { name: "Jupes", slug: "jupes", icon: "💃" },
              { name: "Chemises", slug: "chemises", icon: "🔘" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/boutique?category=${cat.slug}`}
                className="group relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-gray-900 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <div className="relative text-center z-10">
                  <span className="text-4xl mb-2 block">{cat.icon}</span>
                  <span className="text-white font-medium text-sm uppercase tracking-wider">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-light text-gray-900">
                Coups de <span className="font-bold">Cœur</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Les pièces favorites de notre styliste
              </p>
            </div>
            <Link
              href="/boutique"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
            >
              Voir tout
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
            >
              Voir toute la collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION (inspired by Rapid Couture) ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scissors size={20} className="text-gray-400" />
                <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  Atelier de retouches
                </span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Réparez. Ajustez.{" "}
                <span className="font-bold">Transformez.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Notre atelier de retouches couture vous propose des prestations
                variées pour prolonger la vie de vos vêtements. Ourlets,
                ajustements, réparations, transformations — nos couturières
                expertes prennent soin de chacune de vos pièces.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Choisissez la prestation souhaitée",
                  "Ajoutez-la à votre panier",
                  "Validez votre commande en ligne",
                  "Envoyez ou déposez votre vêtement à l'atelier",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600 pt-1">{step}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider rounded-md hover:bg-gray-700 transition-colors"
              >
                Toutes nos prestations
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shirt size={20} className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {service.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {service.price.toFixed(0)} €
                    </span>
                    <button
                      onClick={() =>
                        addItem({
                          id: service.id,
                          type: "service",
                          name: service.name,
                          price: service.price,
                          image: service.image,
                          quantity: 1,
                        })
                      }
                      className="p-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
                      aria-label={`Ajouter ${service.name} au panier`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / STORY SECTION ===== */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light mb-6">
              Notre <span className="font-bold">Histoire</span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              Maelstrom est née de la passion d&apos;une styliste pour les
              vêtements qui racontent une histoire. Chaque création est dessinée,
              coupée et assemblée avec soin dans notre atelier.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Nous croyons que la mode doit être durable, originale et
              accessible. C&apos;est pourquoi nous proposons aussi un service
              complet de retouches couture — pour que vos vêtements préférés
              vous accompagnent le plus longtemps possible.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-10">
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm text-gray-400 mt-1">Fait main</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm text-gray-400 mt-1">Retouches / an</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-gray-400 mt-1">
                  Clients satisfaits
                </p>
              </div>
            </div>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:no-underline"
            >
              En savoir plus
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
