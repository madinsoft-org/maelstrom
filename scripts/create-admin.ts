import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@maelstrom.fr";
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log(`Utilisateur ${email} promu ADMIN`);
  } else {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`Admin créé: ${email} / admin123`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
