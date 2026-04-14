import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/admin");
  }
  const role = (session.user as Record<string, unknown>).role;
  if (role !== "ADMIN") {
    redirect("/");
  }
  return session;
}
