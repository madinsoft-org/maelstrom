import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

interface CheckoutItem {
  id: string;
  type: "product" | "service";
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour passer commande" },
        { status: 401 }
      );
    }

    const { items } = (await request.json()) as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Le panier est vide" },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description:
            item.type === "product"
              ? `${item.color || ""} — Taille ${item.size || ""}`.trim()
              : "Prestation retouche couture",
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Calculate if shipping is free
    const subtotal = items.reduce((t, i) => t + i.price * i.quantity, 0);
    if (subtotal < 150) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais de livraison",
            description: "Livraison standard France métropolitaine",
          },
          unit_amount: 590, // 5.90€
        },
        quantity: 1,
      });
    }

    const checkoutSession = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/panier`,
      customer_email: session.user.email ?? undefined,
      metadata: {
        userId: session.user.id ?? "",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
