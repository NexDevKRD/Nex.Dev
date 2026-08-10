// Single source of truth for all copy + content.
// Voice: direct, technical, confident. Volt is the only accent.

export type DeviceKind = "phone" | "laptop" | "desktop";
export type SceneKind = "mobile" | "web" | "dash";

export const hero = {
  badge: "Software studio in Erbil",
  h1a: "Nex builds software",
  h1b: "people keep using.",
  sub: "Apps, websites and systems, built by one team in Erbil.",
  code: "Apps. Web. Systems. Reliability.",
  codeTail: "Built by Nex",
};

export interface MorphStage {
  device: DeviceKind;
  scene: SceneKind;
  no: string;
  /** Real product shots staged in the frame — left/right when the stage is a pair. */
  shot: string;
  shotB?: string;
  kicker: string;
  headline: string;
  sub: string;
}

// Showcase: phone (iOS + Android) -> laptop -> desktop.
export const morphStages: MorphStage[] = [
  {
    device: "phone",
    scene: "mobile",
    no: "01",
    shot: "/media/work/countcal-diary.webp",
    shotB: "/media/work/liftlog-home.webp",
    kicker: "On the phone",
    headline: "On the home screen.",
    sub: "iPhone and Android apps people open every day.",
  },
  {
    device: "laptop",
    scene: "web",
    no: "02",
    shot: "/media/work/pace-dashboard.webp",
    kicker: "On the web",
    headline: "Fast sites that convert.",
    sub: "Marketing sites and web apps that bring customers in.",
  },
  {
    device: "desktop",
    scene: "dash",
    no: "03",
    shot: "/media/work/marketly-dashboard.webp",
    kicker: "Behind the counter",
    headline: "Your whole shop, one screen.",
    sub: "Sales, stock and staff, connected.",
  },
];

// "What we do" — six capability cards, each with the real stack we use.
// `slug` matches simpleicons.org for the brand logo.
const t = (name: string, slug: string) => ({ name, slug });
export const whatWeDo = [
  { title: "Apps", line: "iOS & Android", tools: [t("Swift", "swift"), t("Kotlin", "kotlin"), t("Flutter", "flutter")] },
  { title: "Web", line: "Sites & web apps", tools: [t("React", "react"), t("Next.js", "nextdotjs"), t("TypeScript", "typescript")] },
  {
    title: "Systems",
    line: "Backends & data",
    tools: [t("Go", "go"), t("Node.js", "nodedotjs"), t("PostgreSQL", "postgresql"), t("Redis", "redis")],
  },
  { title: "Design", line: "UI, UX & brand", tools: [t("Figma", "figma"), t("Excalidraw", "excalidraw")] },
  { title: "Infra", line: "Deploy & scale", tools: [t("Docker", "docker"), t("Kubernetes", "kubernetes"), t("Flux", "flux")] },
  { title: "Security", line: "Backed up & watched", tools: [t("Sentry", "sentry"), t("Cloudflare", "cloudflare")] },
];

export interface Shot {
  src: string;
  label: string;
  cap: string;
}

export interface StackGroup {
  group: string;
  items: { name: string; slug: string | null }[];
}

export interface Project {
  id: string;
  no: string;
  name: string;
  category: string;
  year: string;
  device: DeviceKind;
  logo: string | null;
  tagline: string;
  desc: string;
  pillars: string[];
  shots: Shot[];
  stack: StackGroup[];
}

// Work showcase. Real Nex projects, screenshots in public/media/work.
export const projects: Project[] = [
  {
    id: "pace",
    no: "01",
    name: "Pace",
    category: "Productivity · Personal workspace",
    year: "2026",
    device: "laptop",
    logo: "/media/work/logo-pace.webp",
    tagline: "One place for your calendar, projects, notes and files.",
    desc: "Everything a working day needs, in one app. Plan it, track it, write it, and open your files without switching tools. Less time hunting through tabs, more work actually finished.",
    pillars: ["Plan the day", "Track projects", "Write notes", "Open your files", "Whiteboard", "Knowledge graph"],
    shots: [
      { src: "/media/work/pace-dashboard.webp", label: "Dashboard", cap: "Your whole day at a glance." },
      { src: "/media/work/pace-files.webp", label: "Files", cap: "Open and edit without leaving Pace." },
      { src: "/media/work/pace-whiteboard.webp", label: "Whiteboard", cap: "Think it out, visually." },
      { src: "/media/work/pace-graph.webp", label: "Graph", cap: "See how everything links." },
    ],
    stack: [
      {
        group: "Frontend",
        items: [
          { name: "Next.js 16", slug: "nextdotjs" },
          { name: "React 19", slug: "react" },
          { name: "TypeScript", slug: "typescript" },
          { name: "Tailwind v4", slug: "tailwindcss" },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Go", slug: "go" },
          { name: "chi", slug: null },
          { name: "sqlc", slug: null },
          { name: "pgx", slug: null },
        ],
      },
      { group: "Database", items: [{ name: "PostgreSQL 17", slug: "postgresql" }] },
      {
        group: "Editing + viz",
        items: [
          { name: "ONLYOFFICE", slug: "onlyoffice" },
          { name: "Excalidraw", slug: "excalidraw" },
          { name: "Sigma.js", slug: null },
        ],
      },
    ],
  },
  {
    id: "countcal",
    no: "02",
    name: "CountCal",
    category: "Health · Calorie & nutrition tracker",
    year: "2026",
    device: "phone",
    logo: "/media/work/logo-countcal.webp",
    tagline: "Know what you eat, in seconds a day.",
    desc: "Scan a barcode, snap a nutrition label, or search a catalog that already knows Kurdish, Iraqi and Persian food. Set a goal once and CountCal handles the numbers, with or without signal.",
    pillars: ["Scan and log", "Your goal, your macros", "Works offline", "Local dishes included", "Meal photos", "Syncs everywhere"],
    shots: [
      { src: "/media/work/countcal-diary.webp", label: "Diary", cap: "The day adds up as you log it." },
      { src: "/media/work/countcal-food.webp", label: "Food", cap: "One tap and it is in." },
      { src: "/media/work/countcal-scan.webp", label: "Scan", cap: "Point the camera. Done." },
      { src: "/media/work/countcal-onboarding.webp", label: "Onboarding", cap: "Two minutes to your targets." },
    ],
    stack: [
      {
        group: "iOS app",
        items: [
          { name: "Swift", slug: "swift" },
          { name: "SwiftUI", slug: null },
          { name: "SQLite", slug: "sqlite" },
          { name: "HealthKit", slug: null },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Go", slug: "go" },
          { name: "PostgreSQL", slug: "postgresql" },
          { name: "Redis", slug: "redis" },
        ],
      },
      {
        group: "Food data",
        items: [
          { name: "OpenFoodFacts", slug: null },
          { name: "USDA", slug: null },
          { name: "Curated catalog", slug: null },
        ],
      },
      { group: "Security", items: [{ name: "Argon2", slug: null }, { name: "JWT", slug: null }] },
    ],
  },
  {
    id: "clusterquest",
    no: "03",
    name: "ClusterQuest",
    category: "EdTech · 3D Kubernetes learning game",
    year: "2026",
    device: "desktop",
    logo: "/media/work/logo-clusterquest.webp",
    tagline: "A game that teaches real Kubernetes, on real infrastructure.",
    desc: "Most training tools fake the hard part. ClusterQuest hands every player a real cluster to build, break and repair, with a 3D world that reacts as they work. 63 missions take a beginner to certification level.",
    pillars: ["Real clusters, not demos", "63 guided missions", "Live 3D world", "Learn by fixing", "Chaos mode", "Certification ready"],
    shots: [
      { src: "/media/work/clusterquest-mission.webp", label: "Mission", cap: "Mission one: ignite the control plane." },
      { src: "/media/work/clusterquest-base.webp", label: "Base", cap: "Where every shift starts." },
      { src: "/media/work/clusterquest-arcs.webp", label: "Arcs", cap: "A clear path, arc by arc." },
      { src: "/media/work/clusterquest-lesson.webp", label: "Lesson", cap: "KCNA and KCSA, covered end to end." },
      { src: "/media/work/clusterquest-madmonkey.webp", label: "Mad Monkey", cap: "Something breaks every minute." },
    ],
    stack: [
      {
        group: "Frontend",
        items: [
          { name: "React 18", slug: "react" },
          { name: "TypeScript", slug: "typescript" },
          { name: "Vite", slug: "vite" },
          { name: "Tailwind v4", slug: "tailwindcss" },
        ],
      },
      {
        group: "3D + editor",
        items: [
          { name: "Three.js", slug: "threedotjs" },
          { name: "R3F + drei", slug: null },
          { name: "Monaco", slug: null },
          { name: "xterm.js", slug: null },
          { name: "Zustand", slug: null },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Go 1.25", slug: "go" },
          { name: "chi", slug: null },
          { name: "gorilla/websocket", slug: null },
          { name: "client-go", slug: "kubernetes" },
        ],
      },
      {
        group: "Runtime + data",
        items: [
          { name: "Docker SDK", slug: "docker" },
          { name: "PostgreSQL", slug: "postgresql" },
          { name: "SQLite", slug: "sqlite" },
          { name: "Redis", slug: "redis" },
        ],
      },
    ],
  },
  {
    id: "liftlog",
    no: "04",
    name: "LiftLog",
    category: "Health · Strength training logger",
    year: "2026",
    device: "phone",
    logo: "/media/work/logo-liftlog.webp",
    tagline: "Log a set in two taps. Beat last week.",
    desc: "Pick a lift, log the set, move on. Last session sits right there to beat, a body map shows what you are working, and none of it needs signal in the gym.",
    pillars: ["Two-tap logging", "Beat last session", "Works offline", "Body map", "Rest timer", "150 exercises"],
    shots: [
      { src: "/media/work/liftlog-home.webp", label: "Home", cap: "Start where you left off." },
      { src: "/media/work/liftlog-log.webp", label: "Log", cap: "Weight, reps, done. Last session is right there." },
      { src: "/media/work/liftlog-library.webp", label: "Library", cap: "150 lifts, filtered by muscle." },
      { src: "/media/work/liftlog-exercise.webp", label: "Exercise", cap: "See what every lift actually hits." },
      { src: "/media/work/liftlog-profile.webp", label: "Profile", cap: "PRs, streaks and volume, climbing." },
    ],
    stack: [
      {
        group: "iOS app",
        items: [
          { name: "Swift", slug: "swift" },
          { name: "SwiftUI", slug: null },
          { name: "SQLite", slug: "sqlite" },
          { name: "Swift Charts", slug: null },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Go", slug: "go" },
          { name: "chi", slug: null },
          { name: "PostgreSQL", slug: "postgresql" },
          { name: "Redis", slug: "redis" },
        ],
      },
      {
        group: "Auth + sync",
        items: [
          { name: "HMAC tokens", slug: null },
          { name: "Keychain", slug: null },
          { name: "Sync outbox", slug: null },
        ],
      },
      {
        group: "Production",
        items: [
          { name: "k3s", slug: "k3s" },
          { name: "Flux", slug: "flux" },
          { name: "Traefik", slug: "traefikproxy" },
        ],
      },
    ],
  },
  {
    id: "berg",
    no: "05",
    name: "Bêrg",
    category: "Commerce · Kurdish traditional clothing",
    year: "2026",
    device: "phone",
    logo: null,
    tagline: "Kurdish traditional dress, every region, one shop.",
    desc: "Kurdish dress is sold in scattered bazaar stalls and DM threads. Bêrg puts women's, men's, wedding and children's pieces in one storefront, each tagged with the region it comes from. It runs in Kurdish, Arabic and English, right to left included, with a real cart, wishlist and order history behind it.",
    pillars: ["Shop by category", "Tagged by region", "Kurdish · Arabic · English", "Wishlist and cart", "Orders and reviews"],
    shots: [
      { src: "/media/work/berg-home.webp", label: "Home", cap: "A seasonal edit up top, categories under it, new arrivals below." },
      { src: "/media/work/berg-browse.webp", label: "Browse", cap: "Filter by category, search by region or piece." },
      { src: "/media/work/berg-product.webp", label: "Product", cap: "Region, size, quantity and the total, in front of you." },
    ],
    stack: [
      {
        group: "Mobile app",
        items: [
          { name: "Flutter", slug: "flutter" },
          { name: "Dart", slug: "dart" },
          { name: "Material 3", slug: "materialdesign" },
          { name: "intl · RTL", slug: null },
        ],
      },
      {
        group: "API",
        items: [
          { name: "NestJS", slug: "nestjs" },
          { name: "TypeScript", slug: "typescript" },
          { name: "Prisma", slug: "prisma" },
          { name: "Swagger", slug: "swagger" },
        ],
      },
      {
        group: "Data + storage",
        items: [
          { name: "PostgreSQL 16", slug: "postgresql" },
          { name: "MinIO (S3)", slug: "minio" },
          { name: "Docker", slug: "docker" },
        ],
      },
      {
        group: "Auth",
        items: [
          { name: "Passport JWT", slug: null },
          { name: "bcrypt", slug: null },
          { name: "Throttler", slug: null },
          { name: "Helmet", slug: null },
        ],
      },
    ],
  },
  {
    id: "marketly",
    no: "06",
    name: "Marketly Vendors",
    category: "Commerce · Vendor operations dashboard",
    year: "2026",
    device: "desktop",
    logo: null,
    tagline: "One dashboard where a vendor runs the whole shop.",
    desc: "Selling on a marketplace usually means a spreadsheet, a phone and a lot of guessing. Marketly Vendors gives every vendor one screen for products, orders, inventory, pricing, delivery, campaigns and settlements, in Arabic and English, with the numbers updating as they trade.",
    pillars: ["Products and inventory", "Orders and warranty", "Delivery per province", "Discounts and campaigns", "Settlements", "Arabic · English"],
    shots: [
      { src: "/media/work/marketly-dashboard.webp", label: "Dashboard", cap: "Orders, sales, pending work and net sales, live." },
      { src: "/media/work/marketly-products.webp", label: "Products", cap: "Price, cost, stock, codes and publishing status." },
      { src: "/media/work/marketly-delivery.webp", label: "Delivery prices", cap: "A shipping fee per province, small and large." },
      { src: "/media/work/marketly-add.webp", label: "Add product", cap: "Pick the path, then fill in only what changes." },
    ],
    stack: [
      {
        group: "Frontend",
        items: [
          { name: "Next.js 16", slug: "nextdotjs" },
          { name: "React 19", slug: "react" },
          { name: "TypeScript", slug: "typescript" },
          { name: "Tailwind v4", slug: "tailwindcss" },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Node.js", slug: "nodedotjs" },
          { name: "Express", slug: "express" },
          { name: "Prisma", slug: "prisma" },
          { name: "Zod", slug: "zod" },
        ],
      },
      {
        group: "Data + deploy",
        items: [
          { name: "PostgreSQL 16", slug: "postgresql" },
          { name: "Docker Compose", slug: "docker" },
        ],
      },
      {
        group: "Auth + security",
        items: [
          { name: "JWT cookies", slug: null },
          { name: "bcrypt", slug: null },
          { name: "Helmet", slug: null },
          { name: "Rate limiting", slug: null },
        ],
      },
    ],
  },
];

export const contact = {
  heading: "Tell us what you're building.",
  sub: "An app, a site, a system — or just an idea. We reply within a day.",
  success: "Got it. We'll be in touch within a day.",
};
