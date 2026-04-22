/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, ShieldCheck, Factory, Cpu, Phone, Mail, MapPin, CheckCircle2,
  ArrowRight, Boxes, ClipboardCheck, Globe, Package, CalendarDays,
  Building2, BadgeCheck, Stethoscope, Search, Filter, ChevronRight,
  FileText, Sparkles, Users, Briefcase, BookOpen, Layers3, Menu, X,
  Award, Clock3, MessageSquareMore,
} from "lucide-react";

// =====================================================================
// 1. Framer Motion 兼容层 (防止在线环境找不到包而报错，增加严格类型标注)
// =====================================================================
const motion = {
  div: React.forwardRef(({ initial, animate, exit, transition, whileHover, whileTap, layout, ...props }: any, ref: any) => <div ref={ref} {...props} />),
  h1: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref: any) => <h1 ref={ref} {...props} />),
  p: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref: any) => <p ref={ref} {...props} />),
  span: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref: any) => <span ref={ref} {...props} />),
  button: React.forwardRef(({ initial, animate, exit, transition, whileHover, whileTap, ...props }: any, ref: any) => <button ref={ref} {...props} />),
  section: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref: any) => <section ref={ref} {...props} />),
};
motion.div.displayName = "motion.div";
motion.h1.displayName = "motion.h1";
motion.p.displayName = "motion.p";
motion.span.displayName = "motion.span";
motion.button.displayName = "motion.button";
motion.section.displayName = "motion.section";

const AnimatePresence = ({ children, mode }: any) => <>{children}</>;

// =====================================================================
// 2. shadcn/ui 兼容层 (模拟 @/components/ui/...)
// =====================================================================
const Card = React.forwardRef(({ className, ...props }: any, ref: any) => (
  <div ref={ref} className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className || ''}`} {...props} />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }: any, ref: any) => (
  <div ref={ref} className={`p-6 ${className || ''}`} {...props} />
));
CardContent.displayName = "CardContent";

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }: any, ref: any) => {
  const variants: any = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  };
  const sizes: any = { 
    default: "h-10 px-4 py-2", 
    sm: "h-9 rounded-md px-3", 
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
  };
  return <button ref={ref} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className || ''}`} {...props} />;
});
Button.displayName = "Button";

const Badge = React.forwardRef(({ className, variant = "default", ...props }: any, ref: any) => {
  return <div ref={ref} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className || ''}`} {...props} />
});
Badge.displayName = "Badge";

const Input = React.forwardRef(({ className, type, ...props }: any, ref: any) => {
  return <input type={type} className={`flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`} ref={ref} {...props} />
});
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }: any, ref: any) => {
  return <textarea className={`flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`} ref={ref} {...props} />
});
Textarea.displayName = "Textarea";

// =====================================================================
// 3. 您的业务代码 (1:1 原样载入)
// =====================================================================

const companyName = "Yimi Life";
const baseUrl = "https://www.yimilife.com";

type Page = "home" | "products" | "product-detail" | "about" | "oem" | "certifications" | "news" | "contact";

type Product = {
  id: string;
  name: string;
  category: string;
  tag: string;
  image: string;
  shortDesc: string;
  features: string[];
  specs: [string, string][];
};

const categories = [
  { key: "all", title: "All Products", desc: "Browse the full sample catalog structure.", icon: Boxes },
  { key: "fingertip", title: "Fingertip Pulse Oximeters", desc: "OLED, TFT, LED, Bluetooth, and child-focused series for retail, pharmacy, and private-label projects.", icon: Activity },
  { key: "blood-pressure", title: "Blood Pressure Monitors", desc: "Upper-arm home-use designs with clearer product separation and better buyer-facing presentation.", icon: Stethoscope },
  { key: "handheld", title: "Handheld Oximeters", desc: "Portable display-oriented models for differentiated catalog offerings and distributor sales support.", icon: ClipboardCheck },
  { key: "oem", title: "OEM / ODM Solutions", desc: "Branding, shell color, packaging, manual language, accessories, and feature-level adaptation.", icon: Sparkles },
] as const;

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "About", page: "about" },
  { label: "OEM/ODM", page: "oem" },
  { label: "Certifications", page: "certifications" },
  { label: "News", page: "news" },
  { label: "Contact", page: "contact" },
];

const stats = [
  { value: "2017", label: "Founded" },
  { value: "12,000㎡", label: "Workshop Scale" },
  { value: "15+", label: "Years of Industry Experience" },
  { value: "40+", label: "Patents & Software Copyrights" },
  { value: "ISO 13485", label: "Quality System" },
  { value: "OEM / ODM", label: "Cooperation Model" },
];

const strengths = [
  { icon: Cpu, title: "In-house R&D", desc: "Home medical electronics focus covering SpO2, blood pressure, and related household medical device directions." },
  { icon: Factory, title: "Integrated Manufacturing", desc: "R&D, production, and sales are positioned inside one company structure for smoother execution on B2B projects." },
  { icon: ShieldCheck, title: "Quality & Compliance", desc: "The current site already shows a certification-oriented export posture that can be presented more clearly on the new website." },
  { icon: Globe, title: "Global Business Readiness", desc: "The new structure is aimed at overseas distributors, private-label buyers, Amazon sellers, and channel customers." },
];

const buyerTypes = [
  { icon: Briefcase, title: "Distributors & Importers", desc: "Need a clearer catalog, cleaner trust presentation, and faster product navigation." },
  { icon: Sparkles, title: "Private-label Buyers", desc: "Care about packaging, logo, shell color, manuals, and cooperation responsiveness." },
  { icon: Users, title: "Retail & Pharmacy Channels", desc: "Need easier model differentiation and more commercially readable product pages." },
  { icon: Globe, title: "Cross-border Sellers", desc: "Need images, product hierarchy, and cleaner site structure that looks more credible." },
];

const productCatalog: Product[] = [
  {
    id: "ym-f01",
    name: "Economy Fingertip Pulse Oximeter",
    category: "fingertip",
    tag: "Cost-effective line",
    image: "https://c108.hongcdn.com/uploads/2207/fda-oximeter-8-%21j.webp",
    shortDesc: "A compact fingertip model for high-volume retail and entry private-label projects.",
    features: ["Compact fingertip design", "Fast-read display", "Private-label ready", "Household health monitoring"],
    specs: [["Display", "LED / entry display direction"], ["Power", "AAA batteries"], ["Use Case", "Retail / pharmacy / e-commerce"], ["Customization", "Logo / package / manual"]],
  },
  {
    id: "ym-f02",
    name: "Professional Fingertip Pulse Oximeter",
    category: "fingertip",
    tag: "Mainstream retail",
    image: "https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp",
    shortDesc: "A cleaner-looking mainstream model suitable for stronger shelf presentation and export sales materials.",
    features: ["Waveform display", "Color screen", "Retail-friendly look", "Better product presentation"],
    specs: [["Display", "Color OLED / TFT direction"], ["Form", "Fingertip clip"], ["Positioning", "Mainstream retail"], ["Customization", "Logo / shell / packaging"]],
  },
  {
    id: "ym-f03",
    name: "Child-Friendly Pulse Oximeter",
    category: "fingertip",
    tag: "Pediatric style",
    image: "https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp",
    shortDesc: "A product card slot reserved for the child-oriented fingertip line you may want to promote separately.",
    features: ["Kid-friendly styling", "Clear visual presentation", "Retail differentiation", "Suitable for line expansion"],
    specs: [["Target User", "Child / family use"], ["Display", "Color display direction"], ["Positioning", "Differentiated channel product"], ["Customization", "Color / packaging / graphics"]],
  },
  {
    id: "ym-f04",
    name: "Bluetooth Pulse Oximeter",
    category: "fingertip",
    tag: "App-ready direction",
    image: "https://c108.hongcdn.com/uploads/2207/fda-oximeter-8-%21j.webp",
    shortDesc: "A product-detail placeholder for a connected oximeter line if you want to emphasize app-linked differentiation later.",
    features: ["Bluetooth direction", "Connected product concept", "Private-label support", "Catalog upgrade option"],
    specs: [["Connectivity", "Bluetooth option"], ["Use Case", "Home-use connected line"], ["Positioning", "Premium variation"], ["Customization", "App / packaging / manual"]],
  },
  {
    id: "ym-h01",
    name: "TFT Display Handheld Pulse Oximeter",
    category: "handheld",
    tag: "Advanced interface",
    image: "https://c108.hongcdn.com/uploads/2507/04-%21j.webp",
    shortDesc: "A handheld oximeter layout with larger display emphasis and a more professional visual category impression.",
    features: ["Larger display area", "Portable handheld format", "Differentiated catalog item", "Mid/high-tier presentation"],
    specs: [["Display", "TFT display"], ["Format", "Handheld"], ["Positioning", "Advanced catalog item"], ["Customization", "Brand / package / accessories"]],
  },
  {
    id: "ym-h02",
    name: "Portable Handheld Oximeter",
    category: "handheld",
    tag: "Portable monitoring",
    image: "https://c108.hongcdn.com/uploads/2507/04-%21j.webp",
    shortDesc: "A second handheld product slot that helps make the catalog page feel like a real family rather than a single-item page.",
    features: ["Portable body", "Clear screen area", "Professional-looking line extension", "OEM package support"],
    specs: [["Display", "TFT / LCD direction"], ["Format", "Portable handheld"], ["Use Case", "Distributor catalog support"], ["Customization", "Logo / package / manual"]],
  },
  {
    id: "ym-b01",
    name: "Arm Blood Pressure Monitor",
    category: "blood-pressure",
    tag: "Home-use BPM",
    image: "https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp",
    shortDesc: "A home-use upper-arm blood pressure monitor category entry for your second core line.",
    features: ["Upper-arm cuff", "Readable color display", "Home-use positioning", "OEM packaging support"],
    specs: [["Type", "Upper-arm BPM"], ["Display", "LCD / color screen direction"], ["Use Case", "Household use"], ["Customization", "Logo / box / language"]],
  },
  {
    id: "ym-b02",
    name: "Large Display Blood Pressure Monitor",
    category: "blood-pressure",
    tag: "Retail-friendly BPM",
    image: "https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp",
    shortDesc: "A second BPM card used to make the blood pressure line look like a deliberate catalog series on the new site.",
    features: ["Large display direction", "Retail-ready category", "Clear buyer segmentation", "OEM support"],
    specs: [["Type", "Home-use BPM"], ["Display", "Large LCD direction"], ["Positioning", "Retail / private label"], ["Customization", "Brand / package / manual"]],
  },
];

const certificates = [
  { title: "FDA 510(k)", note: "Pulse oximeter related certificate display", image: "https://c108.hongcdn.com/uploads/2205/07110522994-%21j.webp" },
  { title: "TÜV CE Certificate", note: "Quality/compliance proof point for overseas buyers", image: "https://c108.hongcdn.com/uploads/2205/07110546301-%21j.webp" },
  { title: "ISO 13485 Certificate", note: "Medical device quality system positioning", image: "https://c108.hongcdn.com/uploads/2205/07110610472-%21j.webp" },
  { title: "RoHS Report", note: "Material compliance support display", image: "https://c108.hongcdn.com/uploads/2205/07110630831-%21j.webp" },
];

const certificateGroups = [
  { icon: ShieldCheck, title: "Quality System", desc: "Use system-level certificates to support supplier credibility and quality-process positioning." },
  { icon: BadgeCheck, title: "Product Compliance", desc: "Map product-related certificates and reports to the right product family instead of leaving them generic." },
  { icon: BookOpen, title: "IP & Software Assets", desc: "Use patents and software copyrights as supporting proof for product development and brand strength." },
];

const activities = [
  { title: "Medical Fair Thailand 2025", date: "21 Jul 2025", desc: "A reusable exhibition/news block pulled into the cleaner homepage structure.", image: "https://c108.hongcdn.com/uploads/2507/25071504394625769-%21p.webp" },
  { title: "2025 CMEF Shanghai Medical Products Exhibition", date: "16 Jul 2025", desc: "An activity card that helps the site feel active and more trustworthy for B2B visitors.", image: "https://c108.hongcdn.com/uploads/2507/25072111185792435-%21j.webp" },
  { title: "CMEF Team Activity", date: "19 May 2023", desc: "Older but still useful social-proof material that can support the company activity section.", image: "https://c108.hongcdn.com/uploads/2305/19113137351-%21j.webp" },
];

const newsTopics = [
  "Exhibition invitations and post-show summaries",
  "New product launch notes",
  "Factory upgrade and quality-system updates",
  "How to choose pulse oximeter or BPM suppliers",
];

const factoryGallery = [
  { title: "Factory Exterior", image: "https://c108.hongcdn.com/uploads/2602/01-%21p.webp" },
  { title: "Front Desk / Reception", image: "https://c108.hongcdn.com/uploads/2602/02-%21p.webp" },
  { title: "Production Workshop", image: "https://c108.hongcdn.com/uploads/2602/04-%21p.webp" },
];

const oemSteps = [
  "Tell us your target market, product category, and quantity direction.",
  "Pick a standard model platform or confirm a customization route.",
  "Align logo, packaging, language, accessories, and function requirements.",
  "Move through sample approval, production, inspection, and shipment.",
];

const faq = [
  { q: "Do you support OEM and private label projects?", a: "Yes. The current website already presents OEM/ODM support, and this prototype turns that into a clearer conversion structure." },
  { q: "Can you provide samples?", a: "The new layout keeps sample inquiry as a natural part of the contact flow rather than burying it inside generic messaging." },
  { q: "Which product lines should be prioritized on the new site?", a: "Pulse oximeters and blood pressure monitors should remain the two homepage anchors, with handheld oximeters as a supporting higher-tier line." },
  { q: "Why add SEO elements directly into the code?", a: "Because a sales-facing website should carry title, description, canonical tags, social-preview tags, and structured data from the beginning." },
];

function getUseCases(product: Product) {
  if (product.category === "fingertip") return ["Pharmacy retail", "Amazon/private-label catalog", "Family home-use line", "Distributor product bundle"];
  if (product.category === "blood-pressure") return ["Household monitoring", "Retail medical shelf", "Private-label health products", "Channel distribution projects"];
  return ["Advanced product catalog slot", "Distributor upsell line", "Professional-looking display model", "Export product differentiation"];
}

function getOemOptions(product: Product) {
  if (product.category === "blood-pressure") return ["Box artwork", "Manual language", "Brand mark", "Accessory kit"];
  if (product.category === "handheld") return ["Brand mark", "Accessories", "Outer packaging", "Display/manual adaptation"];
  return ["Logo printing", "Packaging design", "Shell color", "Manual language"];
}

function buildHash(page: Page, product?: Product | null, category?: string) {
  if (page === "home") return "#/";
  if (page === "products") return category && category !== "all" ? `#/products?category=${encodeURIComponent(category)}` : "#/products";
  if (page === "about") return "#/about";
  if (page === "oem") return "#/oem-odm";
  if (page === "certifications") return "#/certifications";
  if (page === "news") return "#/news";
  if (page === "contact") return "#/contact";
  if (page === "product-detail" && product) return `#/products/${product.id}`;
  return "#/products";
}

function parseHash(hash: string): { page: Page; product?: Product; category?: string } {
  const clean = (hash || "#/").replace(/^#/, "") || "/";
  const [path, queryString] = clean.split("?");
  const params = new URLSearchParams(queryString || "");
  const category = params.get("category") || undefined;

  if (path === "/" || path === "") return { page: "home" };
  if (path === "/products") return { page: "products", category };
  if (path.startsWith("/products/")) {
    const id = path.replace("/products/", "");
    const product = productCatalog.find((item) => item.id === id);
    if (product) return { page: "product-detail", product, category: product.category };
    return { page: "products", category };
  }
  if (path === "/about") return { page: "about" };
  if (path === "/oem-odm") return { page: "oem" };
  if (path === "/certifications") return { page: "certifications" };
  if (path === "/news") return { page: "news" };
  if (path === "/contact") return { page: "contact" };
  return { page: "home" };
}

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  if (typeof document === "undefined") return;
  let meta = document.head.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === "undefined") return;
  let link = document.head.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object) {
  if (typeof document === "undefined") return;
  let script = document.head.querySelector(`script[data-seo-id='${id}']`) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-id", id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function getSeo(page: Page, product?: Product | null) {
  const base = {
    title: "Pulse Oximeter & Blood Pressure Monitor Manufacturer | Yimi Life",
    description: "Yimi Life is a Shenzhen-based home medical device manufacturer focused on pulse oximeters, blood pressure monitors, OEM/ODM support, certifications, and global B2B cooperation.",
    canonical: `${baseUrl}/`,
    keywords: "pulse oximeter manufacturer, blood pressure monitor manufacturer, OEM pulse oximeter, ODM blood pressure monitor, home medical device supplier, Shenzhen Yimi Life",
    ogImage: "https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp",
  };

  if (page === "products") return { ...base, title: "Product Catalog | Pulse Oximeters & Blood Pressure Monitors | Yimi Life", description: "Browse fingertip pulse oximeters, handheld oximeters, and blood pressure monitor product structures designed for distributors, private-label buyers, and OEM/ODM projects.", canonical: `${baseUrl}/products`, ogImage: productCatalog[0].image };
  if (page === "product-detail" && product) return { ...base, title: `${product.name} | ${companyName}`, description: `${product.name} from Yimi Life. ${product.shortDesc}`, canonical: `${baseUrl}/products/${product.id}`, ogImage: product.image };
  if (page === "about") return { ...base, title: `About ${companyName} | Home Medical Device Manufacturer`, description: "Learn about Yimi Life’s manufacturing base, R&D positioning, quality-system direction, and global B2B cooperation structure.", canonical: `${baseUrl}/about` };
  if (page === "oem") return { ...base, title: `OEM / ODM Medical Device Solutions | ${companyName}`, description: "Explore OEM and ODM cooperation options for pulse oximeters and blood pressure monitors, including branding, packaging, accessories, and feature adaptation.", canonical: `${baseUrl}/oem-odm` };
  if (page === "certifications") return { ...base, title: `Certifications | ${companyName}`, description: "Review system certificates, product-related compliance materials, and supporting quality credentials presented in a clearer B2B structure.", canonical: `${baseUrl}/certifications`, ogImage: certificates[0].image };
  if (page === "news") return { ...base, title: `News & Activities | ${companyName}`, description: "See exhibition activities, company updates, and reusable news content presented in a cleaner SEO-friendly format.", canonical: `${baseUrl}/news`, ogImage: activities[0].image };
  if (page === "contact") return { ...base, title: `Contact ${companyName} | OEM & Product Inquiry`, description: "Contact Yimi Life for product catalogs, OEM/ODM requests, sample inquiries, and B2B cooperation on pulse oximeters and blood pressure monitors.", canonical: `${baseUrl}/contact` };
  return base;
}

function SeoHead({ page, product }: { page: Page; product?: Product | null }) {
  useEffect(() => {
    const seo = getSeo(page, product);
    document.title = seo.title;
    upsertMeta("description", seo.description);
    upsertMeta("keywords", seo.keywords);
    upsertMeta("robots", "index,follow,max-image-preview:large");
    upsertMeta("og:title", seo.title, "property");
    upsertMeta("og:description", seo.description, "property");
    upsertMeta("og:type", page === "product-detail" ? "product" : "website", "property");
    upsertMeta("og:url", seo.canonical, "property");
    upsertMeta("og:image", seo.ogImage, "property");
    upsertMeta("og:site_name", companyName, "property");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", seo.title);
    upsertMeta("twitter:description", seo.description);
    upsertMeta("twitter:image", seo.ogImage);
    upsertLink("canonical", seo.canonical);

    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Shenzhen Yimi Life Technology Co., Ltd.",
      alternateName: companyName,
      url: `${baseUrl}/`,
      email: "linda@yimilife.com",
      telephone: "+86 0755 89369909",
      logo: seo.ogImage,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shenzhen",
        addressRegion: "Guangdong",
        addressCountry: "CN",
        streetAddress: "Building C, Youlitong Technology Industrial Factory, No. 56, Qingsong Road, Laokeng Community, Longtian Street, Pingshan District",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "linda@yimilife.com",
        telephone: "+86 0755 89369909",
        availableLanguage: ["English", "Chinese"],
      },
    });

    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: companyName,
      url: `${baseUrl}/`,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/products?keyword={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });

    upsertJsonLd("page", {
      "@context": "https://schema.org",
      "@type": page === "product-detail" ? "Product" : page === "contact" ? "ContactPage" : "WebPage",
      name: seo.title,
      description: seo.description,
      url: seo.canonical,
      image: seo.ogImage,
      ...(page === "product-detail" && product
        ? {
            brand: companyName,
            category: product.category,
            additionalProperty: product.specs.map(([label, value]) => ({ "@type": "PropertyValue", name: label, value })),
          }
        : {}),
    });

    if (page === "home") {
      upsertJsonLd("faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      });
    }

    if (page === "products") {
      upsertJsonLd("itemlist", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: productCatalog.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, url: `${baseUrl}/products/${item.id}` })),
      });
    }

    if (page === "product-detail" && product) {
      upsertJsonLd("breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/products` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${baseUrl}/products/${product.id}` },
        ],
      });
    }
  }, [page, product]);

  return null;
}

function PageTransition({ pageKey, children }: { pageKey: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs tracking-wide">{eyebrow}</Badge>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      <p className="text-sm leading-7 text-slate-600 md:text-base">{desc}</p>
    </div>
  );
}

function PageHero({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="space-y-4">
      <Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">{eyebrow}</Badge>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{desc}</p>
    </div>
  );
}

function CtaBanner({ title, desc, primaryLabel, onPrimary, secondaryLabel, onSecondary }: { title: string; desc: string; primaryLabel: string; onPrimary: () => void; secondaryLabel?: string; onSecondary?: () => void }) {
  return (
    <Card className="rounded-[32px] border-0 bg-slate-900 text-white shadow-none">
      <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="space-y-2">
          <div className="text-3xl font-semibold tracking-tight">{title}</div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">{desc}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={onPrimary}>{primaryLabel}</Button>
          {secondaryLabel && onSecondary && <Button variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10" onClick={onSecondary}>{secondaryLabel}</Button>}
        </div>
      </CardContent>
    </Card>
  );
}

function Breadcrumbs({ items }: { items: Array<{ label: string; onClick?: () => void }> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.onClick ? <button onClick={item.onClick} className="transition hover:text-slate-900">{item.label}</button> : <span>{item.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ProductCard({ product, onView }: { product: Product; onView: (product: Product) => void }) {
  return (
    <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-none transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[1/1] overflow-hidden bg-slate-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" /></div>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">{product.tag}</Badge>
          <h3 className="text-xl font-semibold leading-8">{product.name}</h3>
          <p className="text-sm leading-7 text-slate-600">{product.shortDesc}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          {product.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span>{feature}</span></div>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          <Button className="rounded-2xl flex-1" onClick={() => onView(product)}>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickInquiryDock({ onCatalog, onContact }: { onCatalog: () => void; onContact: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-20 hidden md:block">
      <Card className="rounded-[26px] border-slate-200 bg-white/95 shadow-xl backdrop-blur">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-900"><MessageSquareMore className="h-4 w-4" /><span>Quick Actions</span></div>
          <div className="flex flex-col gap-2">
            <Button className="rounded-2xl" onClick={onContact}>Request Quote</Button>
            <Button variant="outline" className="rounded-2xl" onClick={onCatalog}>Browse Catalog</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MobileBottomBar({ onCatalog, onContact }: { onCatalog: () => void; onContact: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-7xl gap-3">
        <Button variant="outline" className="flex-1 rounded-2xl" onClick={onCatalog}>Catalog</Button>
        <Button className="flex-1 rounded-2xl" onClick={onContact}>Request Quote</Button>
      </div>
    </div>
  );
}

function HomePage({ onGoProducts, onGoProductsByCategory, onViewProduct, onGoContact, onGoOem, onGoAbout, onGoCertifications, onGoNews }: { onGoProducts: () => void; onGoProductsByCategory: (category: string) => void; onViewProduct: (product: Product) => void; onGoContact: () => void; onGoOem: () => void; onGoAbout: () => void; onGoCertifications: () => void; onGoNews: () => void }) {
  const featuredProducts = productCatalog.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_35%),radial-gradient(circle_at_left,_rgba(59,130,246,0.08),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">OEM / ODM • Pulse Oximeter • Blood Pressure Monitor</Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">A cleaner medical-device website with stronger B2B structure and clearer product navigation.</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">This prototype now behaves like a small website, not just a homepage. It includes a catalog page, product detail template, separate About, Certifications, News, OEM/ODM, and Contact pages, plus dynamic SEO metadata.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl" onClick={onGoProducts}>Browse Products</Button>
              <Button size="lg" variant="outline" className="rounded-2xl" onClick={onGoOem}>Talk to OEM Team</Button>
            </div>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {["Product list + detail flow", "Stronger trust presentation", "Page-level SEO structure"].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span>{item}</span></div></div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="grid gap-4">
            <Card className="overflow-hidden rounded-[28px] border-slate-200 shadow-xl shadow-slate-200/50">
              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div><div className="text-sm text-slate-500">Prototype focus</div><div className="mt-1 text-2xl font-semibold">Home + Catalog + Detail + Brand Pages</div></div>
                  <div className="rounded-2xl bg-slate-100 p-3"><Layers3 className="h-6 w-6" /></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-2xl bg-slate-100"><img src="https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp" alt="Professional fingertip pulse oximeter" className="h-40 w-full object-cover" /></div>
                  <div className="overflow-hidden rounded-2xl bg-slate-100"><img src="https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp" alt="Arm blood pressure monitor" className="h-40 w-full object-cover" /></div>
                  <div className="overflow-hidden rounded-2xl bg-slate-100 sm:col-span-2"><img src="https://c108.hongcdn.com/uploads/2507/25072111185792435-%21j.webp" alt="CMEF exhibition invitation visual" className="h-44 w-full object-cover" /></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[["Primary CTA", "Browse Products"], ["Secondary CTA", "Request OEM Quote"], ["Pages", "Home / Products / About / Contact"], ["SEO", "Title, OG, canonical, JSON-LD"]].map(([label, value]) => (
                    <div key={label} className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-wide text-slate-500">{label}</div><div className="mt-2 text-sm font-medium text-slate-800">{value}</div></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((item) => (
            <Card key={item.label} className="rounded-3xl border-slate-200 shadow-none"><CardContent className="p-5"><div className="text-3xl font-semibold tracking-tight">{item.value}</div><div className="mt-2 text-sm text-slate-500">{item.label}</div></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6 lg:px-8">
          <SectionTitle eyebrow="Core Product Structure" title="Present your main business in a clearer way." desc="Instead of letting too many categories compete equally on the homepage, this structure emphasizes pulse oximeters, blood pressure monitors, handheld oximeters, and OEM/ODM projects." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-[28px] border-0 bg-white shadow-sm">
                  <CardContent className="space-y-4 p-6 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Icon className="h-6 w-6" /></div>
                    <div className="space-y-2"><h3 className="text-xl font-semibold">{item.title}</h3><p className="text-sm leading-7 text-slate-600">{item.desc}</p></div>
                    <Button variant="ghost" className="h-auto px-0 text-sm" onClick={item.key === "oem" ? onGoOem : () => onGoProductsByCategory(item.key)}>View section <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionTitle eyebrow="Featured Models" title="Use real product imagery from the current site while the new structure is being built." desc="These product cards already reuse live visuals from the existing website, so you can later swap the images and text without changing the page framework." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((item) => (
              <Card key={item.id} className="overflow-hidden rounded-[28px] border-white/10 bg-white/5 text-white shadow-none backdrop-blur">
                <div className="aspect-[1/1] overflow-hidden bg-white/10"><img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" /></div>
                <CardContent className="space-y-5 p-6 pt-6">
                  <div className="space-y-2"><Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">{item.tag}</Badge><h3 className="text-xl font-semibold leading-8">{item.name}</h3></div>
                  <div className="space-y-3 text-sm text-slate-200">
                    {item.features.slice(0, 3).map((bullet) => <div key={bullet} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span>{bullet}</span></div>)}
                  </div>
                  <Button variant="secondary" className="rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={() => onViewProduct(item)}>View Product</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "About Us", desc: "Factory, R&D, manufacturing, and business profile in a dedicated page.", action: onGoAbout },
            { title: "Certifications", desc: "System certificates and product-related compliance materials in clearer grouping.", action: onGoCertifications },
            { title: "News & Activities", desc: "Exhibition and activity content separated from the homepage for cleaner structure.", action: onGoNews },
            { title: "Contact", desc: "A dedicated B2B inquiry page instead of only a footer-style contact box.", action: onGoContact },
          ].map((item) => (
            <Card key={item.title} className="rounded-[28px] border-slate-200 shadow-none">
              <CardContent className="space-y-4 p-6 pt-6"><h3 className="text-xl font-semibold">{item.title}</h3><p className="text-sm leading-7 text-slate-600">{item.desc}</p><Button variant="ghost" className="h-auto px-0 text-sm" onClick={item.action}>Open page <ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6 lg:px-8">
          <SectionTitle eyebrow="FAQ" title="Answer buyer questions directly on the homepage." desc="This reduces hesitation for distributors, importers, and brand customers before they reach out." />
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((item) => (
              <Card key={item.q} className="rounded-[28px] border-0 bg-white shadow-sm"><CardContent className="space-y-3 p-6 pt-6"><h3 className="text-lg font-semibold">{item.q}</h3><p className="text-sm leading-7 text-slate-600">{item.a}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <CtaBanner title="Ready to move from homepage to real inquiry flow?" desc="This homepage now hands visitors naturally into the catalog, OEM/ODM section, and contact page instead of leaving them at a dead end." primaryLabel="Open Catalog" onPrimary={onGoProducts} secondaryLabel="Contact Us" onSecondary={onGoContact} />
      </section>
    </>
  );
}

function ProductsPage({ selectedCategory, setSelectedCategory, onViewProduct }: { selectedCategory: string; setSelectedCategory: (value: string) => void; onViewProduct: (product: Product) => void }) {
  const [keyword, setKeyword] = useState("");
  const selectedCategoryLabel = categories.find((item) => item.key === selectedCategory)?.title || "All Products";

  const filteredProducts = useMemo(() => {
    return productCatalog.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const kw = keyword.trim().toLowerCase();
      const matchKeyword = !kw || item.name.toLowerCase().includes(kw) || item.shortDesc.toLowerCase().includes(kw) || item.tag.toLowerCase().includes(kw);
      return matchCategory && matchKeyword;
    });
  }, [keyword, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <PageHero eyebrow="Product Catalog" title="A clearer product list page for buyers and SEO." desc="This catalog page is designed to feel like a real B2B product center: category filtering, keyword search, cleaner product naming, and direct access to product detail pages." />
      <div className="flex flex-wrap items-center gap-3"><Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">Current view: {selectedCategoryLabel}</Badge>{selectedCategory !== "all" && <Button variant="ghost" className="h-auto rounded-full px-3 text-sm" onClick={() => setSelectedCategory("all")}>Clear category</Button>}</div>

      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <Card className="rounded-[28px] border-slate-200 shadow-none">
          <CardContent className="space-y-5 p-6 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Filter className="h-4 w-4" /><span>Filter products</span></div>
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search models or keywords" className="h-11 rounded-2xl pl-10" /></div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category.key} onClick={() => setSelectedCategory(category.key)} className={`rounded-full border px-4 py-2 text-sm transition ${selectedCategory === category.key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>{category.title}</button>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">Suggested next step: later you can split this into separate index pages such as /pulse-oximeters, /blood-pressure-monitors, and /handheld-oximeters.</div>
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border-0 bg-slate-50 shadow-none">
          <CardContent className="grid gap-4 p-6 pt-6 sm:grid-cols-3">
            {[["Models shown", String(filteredProducts.length)], ["Main SEO benefit", "Catalog depth"], ["Buyer benefit", "Faster navigation"]].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-5"><div className="text-xs uppercase tracking-wide text-slate-500">{label}</div><div className="mt-2 text-lg font-semibold text-slate-900">{value}</div></div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onView={onViewProduct} />)}</div>
    </div>
  );
}

function ProductDetailPage({ product, onBack, onContact, onViewProduct }: { product: Product; onBack: () => void; onContact: () => void; onViewProduct: (product: Product) => void }) {
  const relatedProducts = productCatalog.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const useCases = getUseCases(product);
  const oemOptions = getOemOptions(product);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "Products", onClick: onBack }, { label: product.name }]} />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden rounded-[30px] border-slate-200 shadow-none"><div className="aspect-[1/1] overflow-hidden bg-slate-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></div></Card>
        <div className="space-y-6">
          <div className="space-y-3"><Badge className="rounded-full bg-slate-900 px-3 py-1 text-white hover:bg-slate-900">{product.tag}</Badge><h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1><p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{product.shortDesc}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{product.features.map((feature) => <div key={feature} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700"><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span>{feature}</span></div></div>)}</div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[[Award, "Positioning", product.tag], [Clock3, "Lead Type", "Sample / OEM inquiry"], [Globe, "Market Fit", "Retail / distributor / private label"]].map(([Icon, label, value], idx) => {
              const Cmp = Icon as any;
              return <div key={idx} className="rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500"><Cmp className="h-4 w-4" /><span>{label}</span></div><div className="mt-2 text-sm font-medium text-slate-900">{value as string}</div></div>;
            })}
          </div>
          <div className="flex flex-wrap gap-3"><Button className="rounded-2xl" onClick={onContact}>Request Quote</Button><Button variant="outline" className="rounded-2xl" onClick={onContact}>Ask for Catalog</Button></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="rounded-[30px] border-slate-200 shadow-none">
          <CardContent className="space-y-5 p-6 md:p-8 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><FileText className="h-4 w-4" /><span>Product overview</span></div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {product.specs.map(([label, value], index) => <div key={label} className={`grid grid-cols-[140px_1fr] gap-4 px-4 py-4 text-sm ${index !== product.specs.length - 1 ? "border-b border-slate-200" : ""}`}><div className="font-medium text-slate-900">{label}</div><div className="text-slate-600">{value}</div></div>)}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[30px] border-slate-200 shadow-none"><CardContent className="space-y-4 p-6 md:p-8 pt-6"><div className="text-xl font-semibold">Typical use cases</div><div className="grid gap-3 sm:grid-cols-2">{useCases.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>)}</div></CardContent></Card>
          <Card className="rounded-[30px] border-slate-200 shadow-none"><CardContent className="space-y-4 p-6 md:p-8 pt-6"><div className="text-xl font-semibold">OEM / ODM options</div><div className="grid gap-3 sm:grid-cols-2">{oemOptions.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>)}</div></CardContent></Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[30px] border-slate-200 shadow-none">
          <CardContent className="space-y-4 p-6 md:p-8 pt-6">
            <div className="text-xl font-semibold">Certificate support direction</div>
            <p className="text-sm leading-7 text-slate-600">Later you can map relevant certificates, testing reports, and market-specific support notes to each product family instead of showing certificates only as a generic gallery.</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {certificateGroups.map((item) => {
                const Icon = item.icon;
                return <div key={item.title} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-center gap-2 text-sm font-medium text-slate-900"><Icon className="h-4 w-4" /><span>{item.title}</span></div><p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p></div>;
              })}
            </div>
            <Button variant="outline" className="rounded-2xl" onClick={onContact}>Ask About Compliance Support</Button>
          </CardContent>
        </Card>

        <Card className="rounded-[30px] border-0 bg-slate-900 text-white shadow-none">
          <CardContent className="space-y-4 p-6 md:p-8 pt-6">
            <div className="text-xl font-semibold">Inquiry shortcut</div>
            <p className="text-sm leading-7 text-slate-300">This block can later be upgraded into a sticky inquiry widget with target market, quantity, branding request, and document request fields.</p>
            <div className="grid gap-3 sm:grid-cols-2">{["Target market", "Estimated quantity", "Branding request", "Sample need"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm text-slate-100">{item}</div>)}</div>
            <Button className="rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={onContact}>Start Inquiry</Button>
          </CardContent>
        </Card>
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <SectionTitle eyebrow="Related Models" title="Keep buyers inside the same product family." desc="This related-products block helps the detail page feel more like a real catalog and reduces dead ends for visitors." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} onView={onViewProduct} />)}</div>
        </div>
      )}
    </div>
  );
}

function AboutPage({ onGoProducts, onGoContact }: { onGoProducts: () => void; onGoContact: () => void }) {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageHero eyebrow="About Us" title="A proper company page that feels more like a manufacturer profile." desc="This page restructures your current company information into a clearer B2B narrative: who you are, what you make, why buyers should trust you, and how they should move to the next step." />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">{stats.map((item) => <Card key={item.label} className="rounded-3xl border-slate-200 shadow-none"><CardContent className="p-5 pt-5"><div className="text-3xl font-semibold tracking-tight">{item.value}</div><div className="mt-2 text-sm text-slate-500">{item.label}</div></CardContent></Card>)}</div>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionTitle eyebrow="Why Buyers Should Trust You" title="Turn scattered company information into a stronger manufacturer story." desc="The existing site already contains the right trust signals: founded in 2017, a 12,000㎡ workshop, 15+ years of team experience, 40+ patents/software items, and a certification-oriented export posture." />
        <div className="grid gap-4 sm:grid-cols-2">{strengths.map((item) => { const Icon = item.icon; return <Card key={item.title} className="rounded-[28px] border-slate-200 shadow-none"><CardContent className="space-y-4 p-6 pt-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Icon className="h-6 w-6" /></div><div className="space-y-2"><h3 className="text-lg font-semibold">{item.title}</h3><p className="text-sm leading-7 text-slate-600">{item.desc}</p></div></CardContent></Card>; })}</div>
      </div>
      <section className="space-y-6">
        <SectionTitle eyebrow="Factory & Business Profile" title="Place real company visuals inside a stronger business story." desc="Instead of scattering factory photos, this block turns them into a structured brand page with facility, front-office, and workshop meaning." />
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="overflow-hidden rounded-[28px] border-0 bg-white shadow-sm md:col-span-2"><div className="aspect-[16/8] overflow-hidden"><img src={factoryGallery[0].image} alt={factoryGallery[0].title} className="h-full w-full object-cover" loading="lazy" /></div><CardContent className="p-5 pt-5"><div className="font-medium">{factoryGallery[0].title}</div></CardContent></Card>
            {factoryGallery.slice(1).map((item) => <Card key={item.title} className="overflow-hidden rounded-[28px] border-0 bg-white shadow-sm"><div className="aspect-[4/3] overflow-hidden"><img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" /></div><CardContent className="p-5 pt-5"><div className="font-medium">{item.title}</div></CardContent></Card>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">{buyerTypes.map((item) => { const Icon = item.icon; return <Card key={item.title} className="rounded-[28px] border-slate-200 shadow-none"><CardContent className="space-y-4 p-6 pt-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Icon className="h-6 w-6" /></div><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p></div></CardContent></Card>; })}</div>
        </div>
      </section>
      <CtaBanner title="Ready to move from company profile to products or inquiry?" desc="A stronger About page should not be a dead end. It should pass visitors into the catalog or into inquiry." primaryLabel="Browse Products" onPrimary={onGoProducts} secondaryLabel="Contact Us" onSecondary={onGoContact} />
    </div>
  );
}

function OemPage({ onContact }: { onContact: () => void }) {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "OEM / ODM" }]} />
      <PageHero eyebrow="OEM / ODM Solutions" title="A real OEM / ODM page, not just a short support paragraph." desc="This section is designed to explain what can be customized, how the project moves forward, and why an overseas buyer should contact you." />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[30px] border-slate-200 shadow-none"><CardContent className="space-y-6 p-6 md:p-8 pt-6"><div className="text-2xl font-semibold">What can be customized</div><div className="grid gap-4 sm:grid-cols-2">{["Logo printing", "Packaging design", "Shell color adaptation", "Manual / language update", "Accessory combinations", "Feature-level customization"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">{item}</div>)}</div></CardContent></Card>
        <Card className="rounded-[30px] border-0 bg-slate-900 text-white shadow-none"><CardContent className="space-y-5 p-6 md:p-8 pt-6"><h3 className="text-2xl font-semibold">Typical cooperation flow</h3><div className="space-y-4 text-sm text-slate-200">{oemSteps.map((step, index) => <div key={step} className="flex gap-4"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-900">{index + 1}</div><p className="leading-7">{step}</p></div>)}</div><Button className="rounded-2xl bg-white text-slate-900 hover:bg-white/90" onClick={onContact}>Start OEM Inquiry</Button></CardContent></Card>
      </div>
    </div>
  );
}

function CertificationsPage({ onContact }: { onContact: () => void }) {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "Certifications" }]} />
      <PageHero eyebrow="Certifications" title="A clearer certificate page for B2B credibility." desc="Instead of only a loose image gallery, this page groups certificates into a more useful structure for overseas buyers evaluating supplier reliability." />
      <div className="grid gap-4 md:grid-cols-3">{certificateGroups.map((item) => { const Icon = item.icon; return <Card key={item.title} className="rounded-[28px] border-slate-200 shadow-none"><CardContent className="space-y-4 p-6 pt-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100"><Icon className="h-6 w-6" /></div><div><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{item.desc}</p></div></CardContent></Card>; })}</div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{certificates.map((item) => <Card key={item.title} className="overflow-hidden rounded-[28px] border-slate-200 shadow-none"><div className="aspect-[4/5] overflow-hidden bg-slate-100"><img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" /></div><CardContent className="space-y-2 p-5 pt-5"><div className="flex items-center gap-2 text-sm text-slate-500"><BadgeCheck className="h-4 w-4" /><span>Certificate display</span></div><h3 className="text-lg font-semibold">{item.title}</h3><p className="text-sm leading-7 text-slate-600">{item.note}</p></CardContent></Card>)}</div>
      <CtaBanner title="Need product-specific compliance support?" desc="Later you can connect this page to product-detail pages so each family shows the right supporting certificate logic." primaryLabel="Contact for Documents" onPrimary={onContact} />
    </div>
  );
}

function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "News & Activities" }]} />
      <PageHero eyebrow="News & Activities" title="A cleaner activity page that also helps with SEO freshness." desc="This page pulls exhibition and activity materials out of the homepage and gives them a more useful structure for trust, recency, and future content expansion." />
      <div className="grid gap-5 lg:grid-cols-3">{activities.map((item) => <Card key={item.title} className="overflow-hidden rounded-[28px] border-slate-200 shadow-none"><div className="aspect-[16/10] overflow-hidden bg-slate-100"><img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" /></div><CardContent className="space-y-3 p-6 pt-6"><div className="flex items-center gap-2 text-sm text-slate-500"><CalendarDays className="h-4 w-4" /><span>{item.date}</span></div><h3 className="text-xl font-semibold leading-8">{item.title}</h3><p className="text-sm leading-7 text-slate-600">{item.desc}</p><Button variant="ghost" className="h-auto px-0 text-sm">Read more <ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent></Card>)}</div>
      <Card className="rounded-[30px] border-slate-200 shadow-none"><CardContent className="space-y-5 p-6 md:p-8 pt-6"><div className="text-2xl font-semibold">Recommended future content topics</div><div className="grid gap-4 sm:grid-cols-2">{newsTopics.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>)}</div></CardContent></Card>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-6 lg:px-8 lg:py-16">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHero eyebrow="Contact" title="A more B2B-friendly inquiry page." desc="Instead of a basic contact box, this page is structured to help your sales team identify product type, market, OEM/ODM need, and expected order direction faster." />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[30px] border-slate-200 shadow-none"><CardContent className="space-y-6 p-6 md:p-8 pt-6"><div className="text-2xl font-semibold">Company information</div><div className="space-y-4 text-sm text-slate-600"><div className="flex items-start gap-3"><Phone className="mt-1 h-4 w-4" /><span>+86 0755 89369909</span></div><div className="flex items-start gap-3"><Mail className="mt-1 h-4 w-4" /><span>linda@yimilife.com</span></div><div className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4" /><span>Building C, Youlitong Technology Industrial Factory, No. 56, Qingsong Road, Laokeng Community, Longtian Street, Pingshan District, Shenzhen, Guangdong, China</span></div></div><div className="grid gap-4 sm:grid-cols-2">{[["Primary inquiry", "OEM / Product Quote"], ["Suggested attachment", "Catalog / spec sheet"], ["Best lead data", "Quantity + market + model"], ["Ideal CTA", "Request Quote"]].map(([label, value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><div className="text-xs uppercase tracking-wide text-slate-500">{label}</div><div className="mt-2 text-sm font-medium text-slate-800">{value}</div></div>)}</div></CardContent></Card>
        <Card className="rounded-[30px] border-0 bg-slate-900 text-white shadow-sm"><CardContent className="space-y-5 p-6 md:p-8 pt-6"><div><h3 className="text-2xl font-semibold">Request a quote</h3><p className="mt-2 text-sm leading-7 text-slate-300">This form structure is intentionally more useful for B2B qualification than a simple message box.</p></div><div className="grid gap-4 sm:grid-cols-2"><Input placeholder="Your name" className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400" /><Input placeholder="Company" className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400" /><Input placeholder="Email" className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400" /><input placeholder="Target market" className="h-11 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none placeholder:text-slate-400" /><select className="h-11 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"><option className="text-slate-900">Interested product type</option><option className="text-slate-900">Pulse Oximeter</option><option className="text-slate-900">Blood Pressure Monitor</option><option className="text-slate-900">Handheld Oximeter</option><option className="text-slate-900">OEM / ODM Project</option></select><select className="h-11 rounded-2xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"><option className="text-slate-900">Business type</option><option className="text-slate-900">Distributor / Importer</option><option className="text-slate-900">Private Label Brand</option><option className="text-slate-900">Retail / Pharmacy</option><option className="text-slate-900">Amazon / E-commerce</option></select><Input placeholder="Estimated quantity" className="h-11 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400 sm:col-span-2" /></div><Textarea placeholder="Tell us whether you need OEM/ODM, packaging customization, Bluetooth/App support, target certifications, sample request, or lead time information." className="min-h-[140px] rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400" /><div className="rounded-2xl bg-white/10 p-4 text-sm leading-7 text-slate-200">Suggested improvement for the live site later: connect this form to email, CRM, or WhatsApp/Sales inbox with auto-tagging by product type and market.</div><Button className="w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90">Send Inquiry</Button></CardContent></Card>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(productCatalog[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromHash = () => {
      const result = parseHash(window.location.hash || "#/");
      setPage(result.page);
      if (result.product) {
        setSelectedProduct(result.product);
        setSelectedCategory(result.product.category);
      } else if (result.category) {
        setSelectedCategory(result.category);
      } else if (result.page === "products") {
        setSelectedCategory("all");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, selectedProduct?.id]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedCategory(product.category);
    setPage("product-detail");
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") window.location.hash = buildHash("product-detail", product);
  };

  const goToPage = (target: Page, category?: string) => {
    setPage(target);
    if (target === "products") setSelectedCategory(category || "all");
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") window.location.hash = buildHash(target, selectedProduct, category);
  };

  const renderPage = () => {
    if (page === "products") return <ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onViewProduct={handleViewProduct} />;
    if (page === "product-detail" && selectedProduct) return <ProductDetailPage product={selectedProduct} onBack={() => goToPage("products")} onContact={() => goToPage("contact")} onViewProduct={handleViewProduct} />;
    if (page === "about") return <AboutPage onGoProducts={() => goToPage("products")} onGoContact={() => goToPage("contact")} />;
    if (page === "oem") return <OemPage onContact={() => goToPage("contact")} />;
    if (page === "certifications") return <CertificationsPage onContact={() => goToPage("contact")} />;
    if (page === "news") return <NewsPage />;
    if (page === "contact") return <ContactPage />;
    return <HomePage onGoProducts={() => goToPage("products")} onGoProductsByCategory={(category) => goToPage("products", category)} onViewProduct={handleViewProduct} onGoContact={() => goToPage("contact")} onGoOem={() => goToPage("oem")} onGoAbout={() => goToPage("about")} onGoCertifications={() => goToPage("certifications")} onGoNews={() => goToPage("news")} />;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SeoHead page={page} product={selectedProduct} />

      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <button className="flex items-center gap-3 text-left" onClick={() => goToPage("home")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white"><Activity className="h-5 w-5" /></div>
            <div><div className="text-sm font-semibold">Yimi Life</div><div className="text-xs text-slate-500">Pulse Oximeter & Blood Pressure Monitor Manufacturer</div></div>
          </button>

          <nav className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => <button key={item.label} onClick={() => goToPage(item.page)} className={`rounded-full px-4 py-2 text-sm transition ${page === item.page ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>{item.label}</button>)}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden rounded-2xl md:inline-flex" onClick={() => goToPage("products")}>Get Catalog</Button>
            <Button className="hidden rounded-2xl md:inline-flex" onClick={() => goToPage("contact")}>Request Quote</Button>
            <Button variant="outline" size="icon" className="rounded-2xl md:hidden" onClick={() => setMobileMenuOpen((v) => !v)}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => <button key={item.label} onClick={() => goToPage(item.page)} className={`rounded-2xl px-4 py-3 text-left text-sm transition ${page === item.page ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700"}`}>{item.label}</button>)}
              <Button className="mt-2 rounded-2xl" onClick={() => goToPage("contact")}>Request Quote</Button>
            </div>
          </div>
        )}
      </header>

      <main className="pb-20 md:pb-0">
        <PageTransition pageKey={`${page}-${selectedProduct?.id ?? "none"}`}>{renderPage()}</PageTransition>
      </main>

      <QuickInquiryDock onCatalog={() => goToPage("products")} onContact={() => goToPage("contact")} />
      <MobileBottomBar onCatalog={() => goToPage("products")} onContact={() => goToPage("contact")} />

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6 lg:px-8">
          <div className="space-y-3 md:col-span-2">
            <div className="text-lg font-semibold">Yimi Life</div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">This prototype now includes a homepage, product catalog page, product detail template, about page, certifications page, news page, OEM/ODM page, and contact page inside one editable React file.</p>
            <div className="space-y-2 text-sm text-slate-600"><div>Tel: +86 0755 89369909</div><div>Email: linda@yimilife.com</div><div>Shenzhen, Guangdong, China</div></div>
          </div>
          <div>
            <div className="text-sm font-semibold">Navigation</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600">{navItems.map((item) => <button key={item.label} onClick={() => goToPage(item.page)} className="block text-left transition hover:text-slate-900">{item.label}</button>)}</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Core Lines</div>
            <div className="mt-3 space-y-2 text-sm text-slate-600"><div>Pulse Oximeters</div><div>Blood Pressure Monitors</div><div>Handheld Oximeters</div><div>OEM / ODM Projects</div></div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} {companyName}. Prototype website structure for catalog, OEM/ODM, and B2B inquiry flow.</div>
      </footer>
    </div>
  );
}
