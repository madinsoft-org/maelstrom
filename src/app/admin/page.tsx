import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [productCount, userCount, orderCount, recentOrders] = await Promise.all(
    [
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true } } },
      }),
    ]
  );

  const totalRevenue = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: "paid" },
  });

  const stats = [
    {
      label: "Produits",
      value: productCount,
      icon: Package,
      href: "/admin/produits",
      color: "bg-blue-500",
    },
    {
      label: "Utilisateurs",
      value: userCount,
      icon: Users,
      href: "/admin/utilisateurs",
      color: "bg-green-500",
    },
    {
      label: "Commandes",
      value: orderCount,
      icon: ShoppingCart,
      href: "/admin/commandes",
      color: "bg-purple-500",
    },
    {
      label: "Revenus",
      value: `${(totalRevenue._sum.total || 0).toFixed(2)} €`,
      icon: TrendingUp,
      href: "/admin/commandes",
      color: "bg-amber-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Tableau de bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.color} p-3 rounded-lg text-white`}
              >
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Commandes récentes
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentOrders.length === 0 ? (
            <p className="p-6 text-gray-500 text-sm">Aucune commande</p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {order.user.name || order.user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {order.total.toFixed(2)} €
                  </p>
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
