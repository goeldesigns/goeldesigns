/**
 * All site copy lives here so it can be edited without touching layout.
 * Voice (Tabla design system): plain, short, specific. Sentence case.
 * No emoji. Join short facts with a middle dot ( · ).
 */

export const site = {
  name: "Goel Designs",
  descriptor: "Design & development studio",
  url: "https://www.goeldesigns.com",
  email: "info@goeldesigns.com",
  phone: { display: "+91 9368207505", href: "tel:+919368207505", whatsapp: "919368207505" },
  hours: "Mon–Fri, 10 AM – 6 PM IST",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
] as const;

export const hero = {
  pill: { tag: "Studio", text: "Design · Development · Branding — built in India" },
  title: "Design, build and launch",
  accent: "from one studio.",
  madeFor: ["cafés & restaurants", "tuition & edtech", "SaaS products", "D2C brands", "early-stage startups", "local businesses"],
  lead: "UI/UX, development, branding, hosting and video under one roof. One team takes your idea from the first call to a live product — and stays on after launch.",
  checks: ["UI/UX, web & app development", "Logos, branding & collateral", "Hosting & custom APIs", "Content & video shoots"],
};

export type Accent = "brand" | "saffron" | "mint" | "turmeric" | "blush" | "ocean";

export type Project = {
  id: string;
  name: string;
  short: string;
  initials: string;
  accent: Accent;
  category: string;
  url: string;
  domain: string;
  linkLabel: string;
  /** The client brand as we designed it: palette + type pairing (shown in the hero studio canvas) */
  palette: string[];
  fonts: string;
  summary: string;
  highlights: string[];
  stats: { value: string; label: string }[];
  deliverables: string[];
  shots: {
    desktop: { src: string; alt: string };
    mobile: { src: string; alt: string };
    detail: { label: string; src: string; alt: string; w: number; h: number };
  };
};

export const projects: Project[] = [
  {
    id: "tabla",
    name: "Tabla",
    short: "Tabla",
    initials: "T",
    accent: "brand",
    category: "SaaS product · Restaurant POS",
    url: "https://frontendpos-gold.vercel.app/",
    domain: "frontendpos-gold.vercel.app",
    linkLabel: "Visit Tabla",
    palette: ["#5040d0", "#16152a", "#1baf7a", "#f7f7fa"],
    fonts: "Inter · Instrument Serif",
    summary:
      "A restaurant point of sale built for India: billing, the kitchen board, tables, stock, staff and GST-ready reports — plus the marketing site and design system behind it.",
    highlights: [
      "UPI QR, card and split payments with GST-ready receipts",
      "Live kitchen board with KOTs sent to the right station",
      "Recipe-based stock deduction and 13 ready-made reports",
      "Seven staff roles with per-person permissions and an audit trail",
    ],
    stats: [
      { value: "16", label: "modules" },
      { value: "13", label: "reports" },
      { value: "7", label: "staff roles" },
    ],
    deliverables: ["Product design", "Design system", "Web app", "Marketing site", "Product tour"],
    shots: {
      desktop: {
        src: "/work/tabla-desktop.webp",
        alt: "Tabla landing page: “Run the whole restaurant from one screen” with the POS in a browser and phone frame",
      },
      mobile: { src: "/work/tabla-mobile.webp", alt: "Tabla landing page on a phone" },
      detail: {
        label: "The POS",
        src: "/work/tabla-pos.webp",
        alt: "Tabla POS screen: menu grid with photos and a running dine-in order with GST and service charge",
        w: 1466,
        h: 866,
      },
    },
  },
  {
    id: "velvet-brew",
    name: "Velvet Brew",
    short: "Velvet Brew",
    initials: "VB",
    accent: "turmeric",
    category: "Café · Website & online ordering",
    url: "https://velvetbrew.in/",
    domain: "velvetbrew.in",
    linkLabel: "Visit velvetbrew.in",
    palette: ["#241611", "#c79a56", "#f3e7d3", "#8c5a34"],
    fonts: "Jost · Outfit",
    summary:
      "A warm, dark storefront for a café in Budaun: the full menu with search and categories, a welcome offer, cart and order tracking, and a live open-now status.",
    highlights: [
      "53 dishes and drinks across 5 categories, searchable, with photos",
      "Order online with cart, sign-in and order tracking",
      "Welcome offer for first orders, shown right on the menu",
      "Live open / closed status with hours and the café’s address",
    ],
    stats: [
      { value: "53", label: "menu items" },
      { value: "5", label: "categories" },
      { value: "4.6", label: "avg. rating" },
    ],
    deliverables: ["UI/UX design", "Web development", "Online ordering", "Menu system"],
    shots: {
      desktop: {
        src: "/work/velvetbrew-desktop.webp",
        alt: "Velvet Brew home page: “Experience the finest brew” on a dark coffee-brown ground",
      },
      mobile: { src: "/work/velvetbrew-mobile.webp", alt: "Velvet Brew home page on a phone" },
      detail: {
        label: "Menu",
        src: "/work/velvetbrew-menu.webp",
        alt: "Velvet Brew menu: search, category filters and drink cards with prices",
        w: 1440,
        h: 900,
      },
    },
  },
  {
    id: "the-only-teacher",
    name: "The Only Teacher",
    short: "TOT",
    initials: "TOT",
    accent: "saffron",
    category: "EdTech · One-to-one tuition",
    url: "https://theonlyteacher.com/",
    domain: "theonlyteacher.com",
    linkLabel: "Visit theonlyteacher.com",
    palette: ["#152442", "#ff9b25", "#478a58", "#eef2f9"],
    fonts: "Baloo 2 · Nunito",
    summary:
      "A friendly, parent-first site for one-to-one online tuition: courses by grade, a global teacher pool across 18 countries, and a free-class booking at every step.",
    highlights: [
      "Free-class booking reachable from every section of the page",
      "Courses grouped by grade band: Elementary, Intermediate, Advanced",
      "Interactive map of teaching regions across 18 countries",
      "Parent FAQ, blog and a full course catalogue",
    ],
    stats: [
      { value: "18", label: "countries" },
      { value: "3", label: "grade bands" },
      { value: "1:1", label: "live lessons" },
    ],
    deliverables: ["UI/UX design", "Web development", "Course catalogue", "Booking flow"],
    shots: {
      desktop: { src: "/work/tot-desktop.webp", alt: "The Only Teacher home page: “Find your only teacher” with a family learning online" },
      mobile: { src: "/work/tot-mobile.webp", alt: "The Only Teacher home page on a phone" },
      detail: {
        label: "Courses",
        src: "/work/tot-courses.webp",
        alt: "The Only Teacher courses: Wonder Lab, Maths Quest and Word World by grade band",
        w: 1440,
        h: 900,
      },
    },
  },
];

export const capabilities = {
  rowA: [
    { label: "Websites", icon: "Globe", accent: "ocean" },
    { label: "Web apps", icon: "AppWindow", accent: "brand" },
    { label: "Landing pages", icon: "LayoutTemplate", accent: "saffron" },
    { label: "Dashboards", icon: "LayoutDashboard", accent: "mint" },
    { label: "Design systems", icon: "Component", accent: "brand" },
    { label: "Wireframes", icon: "Frame", accent: "blush" },
    { label: "Prototypes", icon: "MousePointerClick", accent: "turmeric" },
    { label: "Mobile-first UI", icon: "Smartphone", accent: "ocean" },
    { label: "Online ordering", icon: "ShoppingBag", accent: "saffron" },
    { label: "Booking flows", icon: "CalendarCheck", accent: "mint" },
    { label: "POS & billing", icon: "Receipt", accent: "brand" },
  ],
  rowB: [
    { label: "Logo design", icon: "PenTool", accent: "blush" },
    { label: "Brand identity", icon: "Palette", accent: "saffron" },
    { label: "Brand books", icon: "BookOpen", accent: "brand" },
    { label: "Menus & brochures", icon: "Newspaper", accent: "turmeric" },
    { label: "Social creatives", icon: "Image", accent: "blush" },
    { label: "Copywriting", icon: "PenLine", accent: "mint" },
    { label: "Domains & SSL", icon: "ShieldCheck", accent: "ocean" },
    { label: "Hosting", icon: "Server", accent: "brand" },
    { label: "API integrations", icon: "Webhook", accent: "saffron" },
    { label: "UPI & payments", icon: "CreditCard", accent: "mint" },
    { label: "Product shoots", icon: "Camera", accent: "turmeric" },
    { label: "Brand films & reels", icon: "Clapperboard", accent: "blush" },
  ],
} as const;

export type ServiceId = "uiux" | "development" | "logo" | "content" | "branding" | "collateral" | "hosting" | "apis" | "video";

export const services: { id: ServiceId; title: string; short: string; body: string; accent: Accent }[] = [
  {
    id: "uiux",
    title: "UI/UX design",
    short: "UI/UX design",
    body: "Flows, wireframes and interfaces for websites and apps — designed for the phones and laptops your customers actually use.",
    accent: "brand",
  },
  {
    id: "logo",
    title: "Graphic & logo design",
    short: "Logo design",
    body: "Logos, icons and visuals that hold up everywhere, from a shop sign to a favicon.",
    accent: "blush",
  },
  {
    id: "development",
    title: "Development",
    short: "Development",
    body: "Fast, responsive websites and web apps — from a one-page site to a full product like a POS.",
    accent: "ocean",
  },
  {
    id: "apis",
    title: "Functional APIs",
    short: "APIs",
    body: "Custom APIs and integrations for orders, bookings and payments, so your tools talk to each other.",
    accent: "saffron",
  },
  {
    id: "hosting",
    title: "Hosting",
    short: "Hosting",
    body: "Domains, SSL and hosting set up and looked after, so your site stays fast and online.",
    accent: "mint",
  },
  {
    id: "branding",
    title: "Branding",
    short: "Branding",
    body: "Colour, type and voice, written down in a brand book your whole team can follow.",
    accent: "saffron",
  },
  {
    id: "content",
    title: "Content creation",
    short: "Content",
    body: "Headlines, product copy and social posts written in your customers’ language.",
    accent: "turmeric",
  },
  {
    id: "collateral",
    title: "Collateral design",
    short: "Collateral",
    body: "Menus, brochures, business cards and packaging — print-ready, on brand.",
    accent: "mint",
  },
  {
    id: "video",
    title: "Video shoot",
    short: "Video",
    body: "Product films, reels and walkthroughs, shot and edited for the platform they’ll run on.",
    accent: "blush",
  },
];

export const stats = [
  { value: 3, suffix: "", label: "live products featured on this page", accent: "brand" },
  { value: 9, suffix: "", label: "services under one roof", accent: "saffron" },
  { value: 15, suffix: "+", label: "designers, developers & strategists", accent: "mint" },
  { value: 4, suffix: "+", label: "happy clients and counting", accent: "ocean" },
] as const;

export const process = [
  {
    title: "Discovery call",
    body: "A short call about your business, your customers and what a good result looks like.",
    output: "Written scope",
  },
  {
    title: "Design",
    body: "Wireframes first, then full designs for mobile and desktop. You review every screen before we build.",
    output: "Clickable prototype",
  },
  {
    title: "Build",
    body: "We develop, connect payments, bookings or APIs, and test on real phones and browsers.",
    output: "Staging link",
  },
  {
    title: "Launch & care",
    body: "We set up the domain and hosting, go live, and stay on to fix and improve.",
    output: "Live site",
  },
];

export const about = {
  lead: "A team of designers, developers and strategists who take a project from the first sketch to a live product — and stay on after launch.",
  values: [
    {
      icon: "Target",
      title: "Mission-driven",
      body: "We build for results you can see: more orders, more bookings, more enquiries.",
    },
    {
      icon: "HeartHandshake",
      title: "Client-centric",
      body: "One point of contact, plain updates, and decisions made with you, not for you.",
    },
    {
      icon: "Award",
      title: "Quality first",
      body: "Every pixel, every line of code and every interaction is checked before it ships.",
    },
    {
      icon: "TrendingUp",
      title: "Growth focused",
      body: "We build things that grow with your business, not throwaway pages.",
    },
  ],
  team: [
    { role: "UI/UX designers", detail: "Research, flows, interfaces", icon: "PencilRuler", accent: "brand" },
    { role: "Developers", detail: "Web apps, APIs, hosting", icon: "CodeXml", accent: "ocean" },
    { role: "Content creators", detail: "Copy, social, video", icon: "Clapperboard", accent: "blush" },
    { role: "Brand strategists", detail: "Identity, voice, positioning", icon: "Palette", accent: "saffron" },
    { role: "Project managers", detail: "Timelines, updates, launch", icon: "CalendarCheck", accent: "mint" },
  ],
} as const;

export const brief = {
  budgets: ["Under ₹50K", "₹50K–2L", "₹2L–5L", "₹5L+", "Not sure"],
  timelines: ["As soon as possible", "1–2 months", "3+ months", "Flexible"],
  next: [
    { step: "01", text: "We read your brief and reply to set up a call." },
    { step: "02", text: "On the call: your goals, references and must-haves." },
    { step: "03", text: "You get a written scope, timeline and quote." },
  ],
};

export const faqs = [
  {
    q: "What do you need from me to get started?",
    a: "A short call about your business and what you want the project to do. Bring anything you already have — a logo, photos, a menu, a competitor you like — and we’ll take it from there.",
  },
  {
    q: "Do you only design, or do you build as well?",
    a: "Both. The same team handles UI/UX, development, hosting and APIs, so nothing gets lost between a designer and a separate developer. We can also do the logo, brand, content and video.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. A landing page is quicker than a product like a POS. After the discovery call you get a written timeline with milestones, so you know what ships when.",
  },
  {
    q: "How is pricing decided?",
    a: "Every project is quoted after the discovery call, based on the written scope. You see the quote and timeline before any work starts.",
  },
  {
    q: "Can you redesign the website I already have?",
    a: "Yes. We review what’s working today, keep your content and search presence where it matters, and rebuild the rest — often on a faster, easier-to-update setup.",
  },
  {
    q: "Will you host and look after the site after launch?",
    a: "Yes. Hosting is one of our services: we set up the domain, SSL and hosting, and stay on for fixes and improvements after the site is live.",
  },
  {
    q: "Can you shoot photos and video for the site?",
    a: "Yes. We shoot product films, reels and walkthroughs, and edit them for where they’ll run — your website, Instagram or YouTube.",
  },
];
