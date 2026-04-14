Type de Carte / Moyen de paiement	Frais par transaction (estimations 2026)
Cartes Européennes (Visa, Mastercard)	1,5 % + 0,25 €
Cartes Internationales (USA, etc.)	3,25 % + 0,25 €
Wero (via Stripe)	Souvent aligné ou légèrement inférieur aux cartes
Remboursement client	Stripe garde les frais initiaux (le 1,5% + 0,25€)

Cartes Bancaires + Apple/Google Pay + Wero.

// Exemple Node.js simplifié
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card', 'wero'], // On active Wero ici !
  line_items: [{ price_data: { ... }, quantity: 1 }],
  mode: 'payment',
  success_url: 'https://votre-site.com/success',
  cancel_url: 'https://votre-site.com/cart',
  customer: user.stripe_customer_id, // Lie l'achat à votre utilisateur en DB
});

