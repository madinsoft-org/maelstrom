import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: {
        include: {
          product: { select: { name: true } },
          service: { select: { name: true } },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Commandes</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Articles
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                  {order.id.slice(0, 8)}...
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {order.user.name || "—"}
                  </p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                </td>
                <td className="px-6 py-4">
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity}x{" "}
                        {item.product?.name || item.service?.name || "—"}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order.total.toFixed(2)} €
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status === "paid"
                      ? "Payée"
                      : order.status === "pending"
                      ? "En attente"
                      : order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>Aucune commande pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
