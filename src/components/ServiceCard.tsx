"use client";

import type { Service } from "@/types";
import { useCartStore } from "@/lib/cart";
import { Plus } from "lucide-react";

export default function ServiceCard({ service }: { service: Service }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      id: service.id,
      type: "service",
      name: service.name,
      price: service.price,
      image: service.image,
      quantity: 1,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-900 transition-colors group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-semibold text-gray-900">
            {service.price.toFixed(0)} €
          </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
        >
          <Plus size={16} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
