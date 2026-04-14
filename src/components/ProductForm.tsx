"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus } from "lucide-react";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    images: string;
    category: string;
    sizes: string;
    colors: string;
    taille: string;
    customisation: string;
    materiaux: string;
    inStock: boolean;
    featured: boolean;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(product?.image || "");
  const [additionalImages, setAdditionalImages] = useState<string[]>(
    product ? JSON.parse(product.images || "[]") : []
  );

  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    image: product?.image || "",
    category: product?.category || "",
    sizes: product ? JSON.parse(product.sizes || "[]").join(", ") : "",
    colors: product ? JSON.parse(product.colors || "[]").join(", ") : "",
    taille: product?.taille || "",
    customisation: product?.customisation || "",
    materiaux: product?.materiaux || "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: product ? prev.slug : generateSlug(name),
    }));
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", form.category);

    const res = await fetch("/maelstrom/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (isMain) {
        setForm((prev) => ({ ...prev, image: data.path }));
        setImagePreview(data.path);
      } else {
        setAdditionalImages((prev) => [...prev, data.path]);
      }
    } else {
      alert("Erreur lors de l'upload");
    }
  }

  function removeAdditionalImage(index: number) {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const body = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image,
      images: JSON.stringify(
        additionalImages.length > 0
          ? additionalImages
          : form.image
          ? [form.image]
          : []
      ),
      category: form.category,
      sizes: JSON.stringify(
        form.sizes
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      ),
      colors: JSON.stringify(
        form.colors
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean)
      ),
      taille: form.taille,
      customisation: form.customisation,
      materiaux: form.materiaux,
      inStock: form.inStock,
      featured: form.featured,
    };

    try {
      const url = product
        ? `/maelstrom/api/admin/products/${product.id}`
        : "/maelstrom/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin/produits");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Informations générales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du produit
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, price: e.target.value }))
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value }))
              }
              required
              placeholder="robes, vestes, cravattes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tailles (séparées par des virgules)
            </label>
            <input
              type="text"
              value={form.sizes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sizes: e.target.value }))
              }
              placeholder="XS, S, M, L, XL"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleurs (séparées par des virgules)
            </label>
            <input
              type="text"
              value={form.colors}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, colors: e.target.value }))
              }
              placeholder="Noir, Blanc, Bleu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 pt-4">
          Détails produit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taille
            </label>
            <input
              type="text"
              value={form.taille}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, taille: e.target.value }))
              }
              placeholder="149 cm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matériaux
            </label>
            <input
              type="text"
              value={form.materiaux}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, materiaux: e.target.value }))
              }
              placeholder="Polyester, soie naturelle..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customisation
          </label>
          <textarea
            value={form.customisation}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, customisation: e.target.value }))
            }
            rows={3}
            placeholder="Perles en pierre de lune, broche, patches cousus et peints à la main..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, inStock: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700">En stock</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700">Mis en avant</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Images</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image principale
          </label>
          <div className="flex items-start gap-4">
            {imagePreview && (
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/maelstrom${imagePreview}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <Upload size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Uploader une image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, true)}
                />
              </label>
              <p className="text-xs text-gray-400 mt-1">
                ou saisissez le chemin manuellement :
              </p>
              <input
                type="text"
                value={form.image}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, image: e.target.value }));
                  setImagePreview(e.target.value);
                }}
                placeholder="/images/products/mon-image.jpg"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images supplémentaires
          </label>
          <div className="flex flex-wrap gap-3 mb-3">
            {additionalImages.map((img, i) => (
              <div key={i} className="relative w-20 h-20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/maelstrom${img}`}
                  alt={`Image ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <Plus size={20} className="text-gray-400" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, false)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading
            ? "Enregistrement..."
            : product
            ? "Mettre à jour"
            : "Créer le produit"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
