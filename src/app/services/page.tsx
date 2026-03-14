"use client";

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import { services, serviceCategories } from "@/lib/data";
import { Scissors, SlidersHorizontal } from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? services.filter((s) => s.category === selectedCategory)
    : services;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Scissors size={24} className="text-gray-400" />
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          Réparez. Ajustez. <span className="font-bold">Transformez.</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Notre atelier de retouches couture vous offre des solutions variées
          pour prolonger la vie de vos textiles. Ajuster, réparer, transformer —
          vos vêtements sont durables et réutilisables à l&apos;infini.
        </p>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-medium text-gray-900 text-center mb-8">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: "Choisissez",
              description:
                "Sélectionnez la prestation souhaitée dans notre catalogue.",
            },
            {
              step: 2,
              title: "Instructions",
              description:
                "Suivez les indications pour préparer votre vêtement (photos, mesures).",
            },
            {
              step: 3,
              title: "Commandez",
              description:
                "Validez votre panier et payez en ligne de manière sécurisée.",
            },
            {
              step: 4,
              title: "Envoyez",
              description:
                "Préparez votre colis et collez le bordereau fourni. Retour livré chez vous.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="inline-flex w-10 h-10 rounded-full bg-gray-900 text-white items-center justify-center font-bold text-sm mb-3">
                {item.step}
              </span>
              <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
          <SlidersHorizontal size={16} />
          Filtrer :
        </div>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors ${
            !selectedCategory
              ? "bg-gray-900 text-white border-gray-900"
              : "border-gray-200 text-gray-600 hover:border-gray-900"
          }`}
        >
          Toutes les prestations
        </button>
        {serviceCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap transition-colors ${
              selectedCategory === cat.slug
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-200 text-gray-600 hover:border-gray-900"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filteredServices.length} prestation
        {filteredServices.length > 1 ? "s" : ""}
      </p>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-gray-900 text-white rounded-xl p-10">
        <h2 className="text-2xl font-light mb-3">
          Une retouche <span className="font-bold">sur mesure</span> ?
        </h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          Vous avez un projet spécial ? Contactez notre atelier pour un devis
          personnalisé gratuit.
        </p>
        <a
          href="mailto:contact@maelstrom.fr"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm uppercase tracking-wider font-medium rounded-md hover:bg-gray-100 transition-colors"
        >
          Nous contacter
        </a>
      </div>
    </div>
  );
}
