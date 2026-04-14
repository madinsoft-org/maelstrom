# Architecture — Maelstrom

> Application e-commerce de mode artisanale : vente de vêtements originaux et services de retouche couture.

---

## Sommaire

1. [Niveau 1 — Vue système globale](#niveau-1--vue-système-globale)
2. [Niveau 2 — Architecture en couches](#niveau-2--architecture-en-couches)
3. [Niveau 3 — Vue détaillée des modules](#niveau-3--vue-détaillée-des-modules)
4. [Schéma de la base de données](#schéma-de-la-base-de-données)
5. [Flux de commande (Séquence)](#flux-de-commande-séquence)

---

## Niveau 1 — Vue système globale

Vue macro des acteurs et des systèmes externes avec lesquels interagit l'application. Ce niveau répond à la question : **qui utilise quoi ?**

```mermaid
graph TB
    subgraph Acteurs
        V([Visiteur])
        C([Client connecté])
    end

    subgraph Système["🌀 Maelstrom — Application Web"]
        APP[Application Next.js]
    end

    subgraph Externes["Services externes"]
        STRIPE[💳 Stripe\nPaiement en ligne]
        GOOGLE[🔑 Google OAuth\nAuthentification]
        DB[(🗄️ Base de données\nSQLite / Prisma)]
    end

    V -->|Navigue, consulte boutique & services| APP
    C -->|Se connecte, commande, paye| APP
    APP -->|Crée session de paiement| STRIPE
    STRIPE -->|Webhook — confirmation commande| APP
    APP -->|Authentification OAuth| GOOGLE
    APP -->|Lecture / Écriture données| DB
```

---

## Niveau 2 — Architecture en couches

Vue intermédiaire des grandes couches techniques de l'application. Next.js unifie le rendu côté serveur et côté client dans un seul déploiement (paradigme **fullstack monolithique**).

```mermaid
graph LR
    subgraph Client["🖥️ Navigateur (Client)"]
        UI[Interface React\nTailwind CSS]
        ZUSTAND[État panier\nZustand + localStorage]
    end

    subgraph Server["⚙️ Serveur Next.js (App Router)"]
        direction TB
        PAGES[Pages & Layouts\nRendu SSR / RSC]
        APIROUTES[API Routes\nRoute Handlers]
        NEXTAUTH[NextAuth.js v5\nSession JWT]
        PRISMALIB[Prisma ORM\nClient typé]
    end

    subgraph Data["💾 Persistance"]
        DB[(SQLite\nschema.prisma)]
    end

    subgraph ThirdParty["🌐 Tiers"]
        STRIPE[Stripe API]
        GOOGLEOAUTH[Google OAuth 2.0]
    end

    UI <-->|RSC / fetch| PAGES
    UI -->|POST /api/checkout| APIROUTES
    ZUSTAND -->|Hydratation panier| UI

    PAGES --> NEXTAUTH
    APIROUTES --> NEXTAUTH
    APIROUTES --> PRISMALIB
    NEXTAUTH --> PRISMALIB
    PRISMALIB --> DB

    APIROUTES -->|Crée Checkout Session| STRIPE
    STRIPE -->|POST /api/webhook| APIROUTES
    NEXTAUTH <-->|Code OAuth| GOOGLEOAUTH
```

---

## Niveau 3 — Vue détaillée des modules

Vue fine de l'organisation interne du code source : pages, composants, couche `lib`, routes API et leurs dépendances.

```mermaid
graph TB
    subgraph src/app["📁 src/app  (Pages & Routes)"]
        direction TB
        P_HOME[page.tsx\nAccueil]
        P_BOUTIQUE[boutique/page.tsx\nCatalogue produits]
        P_PRODUIT["boutique/[id]/page.tsx\nFiche produit"]
        P_SERVICES[services/page.tsx\nServices retouche]
        P_PANIER[panier/page.tsx\nPanier]
        P_CHECKOUT[checkout/page.tsx\nRedirection Stripe]
        P_SUCCESS[checkout/success/page.tsx\nConfirmation]
        P_LOGIN[auth/login/page.tsx]
        P_REGISTER[auth/register/page.tsx]

        API_AUTH["api/auth/[...nextauth]/route.ts"]
        API_REGISTER[api/auth/register/route.ts]
        API_CHECKOUT[api/checkout/route.ts]
        API_WEBHOOK[api/webhook/route.ts]
    end

    subgraph src/components["📁 src/components"]
        NAVBAR[Navbar.tsx]
        FOOTER[Footer.tsx]
        PRODUCTCARD[ProductCard.tsx]
        SERVICECARD[ServiceCard.tsx]
        PROVIDERS[Providers.tsx\nSessionProvider]
    end

    subgraph src/lib["📁 src/lib"]
        LIB_AUTH[auth.ts\nNextAuth config]
        LIB_CART[cart.ts\nZustand store]
        LIB_DATA[data.ts\nDonnées statiques]
        LIB_PRISMA[prisma.ts\nClient Prisma]
        LIB_STRIPE[stripe.ts\nClient Stripe]
    end

    subgraph src/types["📁 src/types"]
        TYPES[index.ts\nProduct · Service · CartItem]
    end

    %% Pages → Lib
    P_BOUTIQUE --> LIB_DATA
    P_PRODUIT --> LIB_DATA
    P_SERVICES --> LIB_DATA
    P_PANIER --> LIB_CART
    P_CHECKOUT --> LIB_CART

    %% API Routes → Lib
    API_AUTH --> LIB_AUTH
    API_REGISTER --> LIB_PRISMA
    API_CHECKOUT --> LIB_AUTH
    API_CHECKOUT --> LIB_STRIPE
    API_WEBHOOK --> LIB_STRIPE
    API_WEBHOOK --> LIB_PRISMA

    %% Auth → Prisma
    LIB_AUTH --> LIB_PRISMA

    %% Components → Lib
    NAVBAR --> LIB_CART
    PRODUCTCARD --> TYPES
    SERVICECARD --> TYPES
```

---

## Schéma de la base de données

Modèle relationnel géré par **Prisma ORM** sur une base **SQLite**. Les tableaux JSON (`sizes`, `colors`, `images`) sont sérialisés en texte.

```mermaid
erDiagram
    User {
        String id PK
        String name
        String email UK
        String password
        DateTime emailVerified
        String image
    }

    Account {
        String id PK
        String userId FK
        String provider
        String providerAccountId
        String type
        String access_token
    }

    Session {
        String id PK
        String sessionToken UK
        String userId FK
        DateTime expires
    }

    VerificationToken {
        String identifier
        String token UK
        DateTime expires
    }

    Product {
        String id PK
        String name
        String slug UK
        String description
        Float price
        String category
        String sizes
        String colors
        Boolean inStock
        Boolean featured
    }

    Service {
        String id PK
        String name
        String slug UK
        String description
        Float price
        String category
    }

    Order {
        String id PK
        String userId FK
        String status
        Float total
        String stripeSessionId UK
        DateTime createdAt
    }

    OrderItem {
        String id PK
        String orderId FK
        String productId FK
        String serviceId FK
        Int quantity
        Float price
        String size
        String color
    }

    User ||--o{ Account : "possède"
    User ||--o{ Session : "ouvre"
    User ||--o{ Order : "passe"
    Order ||--o{ OrderItem : "contient"
    Product ||--o{ OrderItem : "référencé dans"
    Service ||--o{ OrderItem : "référencé dans"
```

---

## Flux de commande (Séquence)

Déroulé complet d'une commande depuis le panier jusqu'à la confirmation, illustrant les interactions entre le navigateur, le serveur Next.js et Stripe.

```mermaid
sequenceDiagram
    actor Client
    participant Navigateur as Navigateur<br/>(React / Zustand)
    participant NextJS as Serveur Next.js<br/>(API Routes)
    participant Stripe as Stripe
    participant DB as Base de données<br/>(SQLite / Prisma)

    Client->>Navigateur: Ajoute des articles au panier
    Navigateur->>Navigateur: Persiste le panier (localStorage via Zustand)

    Client->>Navigateur: Clique sur "Commander"
    Navigateur->>NextJS: POST /api/checkout { items[] }
    NextJS->>NextJS: Vérifie la session (NextAuth JWT)
    alt Non authentifié
        NextJS-->>Navigateur: 401 — Redirection /auth/login
    end
    NextJS->>Stripe: Crée une Checkout Session (line_items, userId metadata)
    Stripe-->>NextJS: { url: "https://checkout.stripe.com/..." }
    NextJS-->>Navigateur: { url }
    Navigateur->>Stripe: Redirection vers la page de paiement Stripe

    Client->>Stripe: Saisit ses informations de paiement
    Stripe->>Stripe: Traite le paiement

    alt Paiement accepté
        Stripe->>NextJS: POST /api/webhook (checkout.session.completed)
        NextJS->>NextJS: Vérifie la signature du webhook
        NextJS->>DB: Crée Order (status: "paid", stripeSessionId)
        Stripe-->>Navigateur: Redirection vers /checkout/success
        Navigateur->>Client: Page de confirmation ✓
    else Paiement refusé
        Stripe-->>Navigateur: Redirection vers /checkout (avec erreur)
        Navigateur->>Client: Message d'erreur Stripe
    end
```
