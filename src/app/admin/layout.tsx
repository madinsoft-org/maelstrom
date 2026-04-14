import { requireAdmin } from "@/lib/admin";
import Providers from "@/components/Providers";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <Providers>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 bg-gray-50">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </Providers>
  );
}
