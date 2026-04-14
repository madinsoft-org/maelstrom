"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Shield, ShieldOff, Trash2 } from "lucide-react";

export function UserActions({
  userId,
  userRole,
  userEmail,
}: {
  userId: string;
  userRole: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleRole() {
    const newRole = userRole === "ADMIN" ? "USER" : "ADMIN";
    if (
      !confirm(
        `Changer le rôle de ${userEmail} en ${newRole} ?`
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/maelstrom/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Erreur");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Supprimer l'utilisateur ${userEmail} ? Cette action est irréversible.`))
      return;

    setLoading(true);
    try {
      const res = await fetch(`/maelstrom/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
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
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleRole}
        disabled={loading}
        className="p-2 text-gray-400 hover:text-purple-600 transition-colors disabled:opacity-50"
        title={userRole === "ADMIN" ? "Rétrograder" : "Promouvoir admin"}
      >
        {userRole === "ADMIN" ? <ShieldOff size={16} /> : <Shield size={16} />}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
