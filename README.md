# Maelstrom — Vêtements Originaux & Retouches Couture

Site e-commerce pour **Maelstrom**, une marque de vêtements originaux créés par une styliste, avec un service de retouches couture intégré.

## Stack Technique

- **Framework** : Next.js 16 (App Router) + TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : SQLite (via Prisma ORM) — facilement migrable vers PostgreSQL
- **Authentification** : NextAuth.js v5 (credentials email/mot de passe + Google OAuth)
- **Paiement** : Stripe Checkout
- **État du panier** : Zustand (persisté dans localStorage)
- **Icônes** : Lucide React

## Structure du Projet

```
src/
├── app/
│   ├── page.tsx                    # Page d'accueil (hero, collections, produits, services)
│   ├── layout.tsx                  # Layout global (navbar, footer)
│   ├── boutique/
│   │   ├── page.tsx                # Catalogue produits avec filtres par catégorie
│   │   └── [id]/page.tsx           # Page détail produit (sélection taille/couleur)
│   ├── services/page.tsx           # Prestations retouches couture
│   ├── a-propos/page.tsx           # Page "Notre Histoire"
│   ├── panier/page.tsx             # Panier d'achat
│   ├── checkout/
│   │   ├── page.tsx                # Page de validation (redirection Stripe)
│   │   └── success/page.tsx        # Confirmation de commande
│   ├── auth/
│   │   ├── login/page.tsx          # Connexion (email + Google)
│   │   └── register/page.tsx       # Inscription
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/route.ts  # API NextAuth
│       │   └── register/route.ts       # API inscription
│       ├── checkout/route.ts           # Création session Stripe
│       └── webhook/route.ts            # Webhook Stripe
├── components/
│   ├── Navbar.tsx                  # Barre de navigation
│   ├── Footer.tsx                  # Pied de page avec newsletter
│   ├── ProductCard.tsx             # Carte produit
│   ├── ServiceCard.tsx             # Carte prestation retouche
│   └── Providers.tsx               # Wrapper SessionProvider
├── lib/
│   ├── auth.ts                     # Configuration NextAuth
│   ├── prisma.ts                   # Client Prisma
│   ├── stripe.ts                   # Client Stripe (lazy init)
│   ├── cart.ts                     # Store Zustand pour le panier
│   └── data.ts                     # Données mock (produits & services)
└── types/
    └── index.ts                    # Types TypeScript
```

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

Remplir les valeurs dans `.env` :

```env
DATABASE_URL="file:./dev.db"

# NextAuth — générer un secret : openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-aleatoire

# Google OAuth (optionnel)
# Créer des identifiants sur https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=votre-client-id
GOOGLE_CLIENT_SECRET=votre-client-secret

# Stripe
# Récupérer les clés sur https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Initialiser la base de données

```bash
npx prisma db push
npx prisma generate
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir http://localhost:3000

---

## Fonctionnalités détaillées

### 1. Système d'enregistrement des utilisateurs

**Email / Mot de passe :**
- Inscription via `/auth/register` avec nom, email, mot de passe (minimum 8 caractères)
- Le mot de passe est hashé avec **bcrypt** (12 rounds) avant stockage en base
- Connexion via `/auth/login` avec NextAuth Credentials Provider
- Sessions JWT (stateless, pas de session stockée en base)

**Google OAuth :**
- Bouton "Continuer avec Google" sur les pages login et register
- Configuration requise :
  1. Aller sur https://console.cloud.google.com/apis/credentials
  2. Créer un projet → Créer des identifiants → ID client OAuth 2.0
  3. Ajouter `http://localhost:3000/api/auth/callback/google` comme URI de redirection autorisée
  4. Copier le Client ID et Client Secret dans `.env`

### 2. Système de panier

- **State management** : Zustand avec middleware `persist` → sauvegardé dans localStorage
- Persiste entre les sessions (même si l'utilisateur ferme le navigateur)
- **Fonctionnalités** :
  - Ajouter des produits (avec sélection taille + couleur) ou des services de retouche
  - Modifier les quantités (+/-)
  - Supprimer un article individuel
  - Vider le panier entièrement
  - Calcul automatique sous-total / frais de livraison / total
  - Livraison offerte dès 150 €
  - Badge compteur sur l'icône panier dans la navbar

### 3. Système de paiement Stripe

Le paiement utilise **Stripe Checkout** (page de paiement hébergée par Stripe).

**Flux de paiement :**

```
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────────┐
│  Page /checkout  │────►│  POST /api/      │────►│  Stripe crée une     │
│  (récapitulatif) │     │  checkout        │     │  Checkout Session    │
└─────────────────┘     └──────────────────┘     └──────────┬───────────┘
                                                             │
                                                             ▼
                                                ┌──────────────────────┐
                                                │  Page Stripe         │
                                                │  (saisie CB sécurisée│
                                                │   hébergée par Stripe)│
                                                └──────────┬───────────┘
                                                           │
                                              ┌────────────┼────────────┐
                                              ▼                         ▼
                                     ┌─────────────┐           ┌──────────┐
                                     │   Succès     │           │  Annulé  │
                                     │   /checkout/ │           │  /panier │
                                     │   success    │           └──────────┘
                                     └──────┬──────┘
                                            │
                                            ▼
                                  ┌──────────────────┐
                                  │  Webhook Stripe   │
                                  │  POST /api/webhook│
                                  │  → Crée la        │
                                  │    commande en BDD│
                                  └──────────────────┘
```

**Configuration Stripe :**

1. **Créer un compte** sur https://dashboard.stripe.com
2. **Récupérer les clés API** (Developers → API keys) :
   - `STRIPE_SECRET_KEY` : clé secrète (`sk_test_...`)
   - `STRIPE_PUBLISHABLE_KEY` : clé publique (`pk_test_...`)
3. **Configurer le webhook local** (développement) :
   ```bash
   # Installer Stripe CLI : https://stripe.com/docs/stripe-cli
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copier le `whsec_...` affiché → `STRIPE_WEBHOOK_SECRET`
4. **En production** :
   - Dashboard Stripe → Developers → Webhooks → Ajouter un endpoint
   - URL : `https://votre-domaine.com/api/webhook`
   - Événement à écouter : `checkout.session.completed`

**Pourquoi Stripe Checkout (mode hébergé) :**
- **Sécurité** : aucune donnée bancaire ne transite par votre serveur → conformité PCI-DSS automatique
- **Confiance** : interface de paiement Stripe reconnue par les utilisateurs
- **Moyens de paiement** : CB, Apple Pay, Google Pay, SEPA inclus automatiquement
- **Responsive** : optimisé mobile de base

---

## Prochaines étapes

- [ ] Remplacer les données mock (`lib/data.ts`) par des requêtes Prisma
- [ ] Ajouter un panel admin (gestion produits/services/commandes)
- [ ] Ajouter de vraies images produits
- [ ] Intégrer un service d'emails (confirmation commande, etc.)
- [ ] Ajouter avis clients et système de notation
- [ ] Ajouter un blog / actualités
- [ ] Déployer sur Vercel + migrer vers PostgreSQL
