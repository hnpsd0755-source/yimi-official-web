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
// 1. 动画兼容层 (内置防报错机制)
// =====================================================================
const motion = {
  div: React.forwardRef(({ initial, animate, exit, transition, whileHover, whileTap, layout, ...props }: any, ref) => <div ref={ref as any} {...props} />),
  h1: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref) => <h1 ref={ref as any} {...props} />),
  p: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref) => <p ref={ref as any} {...props} />),
  span: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref) => <span ref={ref as any} {...props} />),
  button: React.forwardRef(({ initial, animate, exit, transition, whileHover, whileTap, ...props }: any, ref) => <button ref={ref as any} {...props} />),
  section: React.forwardRef(({ initial, animate, exit, transition, ...props }: any, ref) => <section ref={ref as any} {...props} />),
};
motion.div.displayName = 'motion.div';
motion.h1.displayName = 'motion.h1';
motion.p.displayName = 'motion.p';
motion.span.displayName = 'motion.span';
motion.button.displayName = 'motion.button';
motion.section.displayName = 'motion.section';

const AnimatePresence = ({ children, mode }: any) => <>{children}</>;

// =====================================================================
// 2. UI 组件库兼容层 (原生 Tailwind 还原)
// =====================================================================
const Card = React.forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref as any} className={`rounded-[28px] border border-slate-200 bg-white text-slate-950 shadow-sm ${className || ''}`} {...props} />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef(({ className, ...props }: any, ref) => (
  <div ref={ref as any} className={`p-6 ${className || ''}`} {...props} />
));
CardContent.displayName = 'CardContent';

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }: any, ref) => {
  const variants: any = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  };
  const sizes: any = { 
    default: "h-11 px-6 rounded-2xl", 
    sm: "h-9 rounded-xl px-3", 
    lg: "h-12 rounded-2xl px-8",
    icon: "h-11 w-11 rounded-2xl"
  };
  return <button ref={ref as any} className={`inline-flex items-center justify-center text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95 ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

const Badge = React.forwardRef(({ className, variant = "default", ...props }: any, ref) => {
  return <div ref={ref as any} className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors ${className || ''}`} {...props} />
});
Badge.displayName = 'Badge';

const Input = React.forwardRef(({ className, type, ...props }: any, ref) => {
  return <input type={type} className={`flex h-11 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`} ref={ref as any} {...props} />
});
Input.displayName = 'Input';

const Textarea = React.forwardRef(({ className, ...props }: any, ref) => {
  return <textarea className={`flex min-h-[120px] w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`} ref={ref as any} {...props} />
});
Textarea.displayName = 'Textarea';

// =====================================================================
// 3. 一米生命核心业务数据
// =====================================================================

const companyName = "Yimi Life";

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
    id: "ym-b01",
    name: "Arm Blood Pressure Monitor",
    category: "blood-pressure",
    tag: "Home-use BPM",
    image: "https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp",
    shortDesc: "A home-use upper-arm blood pressure monitor category entry for your second core line.",
    features: ["Upper-arm cuff", "Readable color display", "Home-use positioning", "OEM packaging support"],
    specs: [["Type", "Upper-arm BPM"], ["Display", "LCD / color screen direction"], ["Use Case", "Household use"], ["Customization", "Logo / box / language"]],
  }
];

// =====================================================================
// 路由与 Hash 处理
// =====================================================================
function buildHash(page: Page, product?: Product | null, category?: string) {
  if (page === "home") return "#/";
  if (page === "products") return category && category !== "all" ? `#/products?category=${encodeURIComponent(category)}` : "#/products";
  if (page === "product-detail" && product) return `#/products/${product.id}`;
  if (page === "about") return "#/about";
  if (page === "oem") return "#/oem-odm";
  if (page === "certifications") return "#/certifications";
  if (page === "news") return "#/news";
  if (page === "contact") return "#/contact";
  return "#/";
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

// =====================================================================
// 页面内部组件
// =====================================================================

function Breadcrumbs({ items }: { items: Array<{ label: string; onClick?: () => void }> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8">
      {items.map((item, index) => (
        <React.Fragment key={`${item.label}-${index}`}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.onClick ? <button onClick={item.onClick} className="transition hover:text-slate-900 font-medium">{item.label}</button> : <span>{item.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <Badge className="px-4 py-1.5 text-xs tracking-wide bg-slate-100 border-none text-slate-800">{eyebrow}</Badge>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900">{title}</h2>
      <p className="text-base leading-7 text-slate-600 md:text-lg">{desc}</p>
    </div>
  );
}

function PageHero({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="space-y-6">
      <Badge className="rounded-full bg-slate-900 px-4 py-1.5 text-white border-none">{eyebrow}</Badge>
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-slate-900">{title}</h1>
      <p className="max-w-3xl text-lg leading-8 text-slate-600">{desc}</p>
    </div>
  );
}

function ProductCard({ product, onView }: { product: Product; onView: (product: Product) => void }) {
  return (
    <Card className="overflow-hidden border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer" onClick={() => onView(product)}>
      <div className="aspect-square overflow-hidden bg-slate-50 relative">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply p-4" loading="lazy" />
      </div>
      <CardContent className="space-y-4 p-8">
        <div className="space-y-3">
          <Badge className="bg-slate-50 border-slate-200 text-slate-600">{product.tag}</Badge>
          <h3 className="text-xl font-bold leading-tight">{product.name}</h3>
          <p className="text-sm leading-relaxed text-slate-500">{product.shortDesc}</p>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          {product.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" /><span>{feature}</span></div>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-100">
          <Button variant="outline" className="w-full">View Specifications</Button>
        </div>
      </CardContent>
    </Card>
  );
}

// =====================================================================
// 各个独立页面模块
// =====================================================================

function HomePage({ onGoProducts, onGoOem, onGoAbout, onGoCertifications, onGoNews, onGoContact, onViewProduct }: any) {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <Badge className="mb-6 px-4 py-1.5 text-sm font-semibold bg-white border-slate-200 shadow-sm">ISO 13485 Certified Manufacturer</Badge>
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl leading-[1.1] text-slate-900">
                Precision Health Monitoring<br/><span className="text-slate-500">for Global Brands.</span>
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              Specializing in the R&D and manufacturing of high-quality pulse oximeters and blood pressure monitors in Shenzhen. Full OEM/ODM support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-base" onClick={onGoProducts}>Explore Catalog</Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white" onClick={onGoOem}>OEM Solutions</Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-200/50 rounded-full blur-3xl opacity-50"></div>
            <img src="https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp" alt="Yimi Life Products" className="relative z-10 w-full max-w-md drop-shadow-2xl rounded-3xl object-cover aspect-square" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-8">
          <SectionTitle eyebrow="Product Categories" title="Core Manufacturing Lines" desc="Browse our well-structured product families designed for distributors, private-label buyers, and retail channels." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-slate-50 border-0 shadow-none hover:bg-slate-100 transition-colors cursor-pointer" onClick={onGoProducts}>
                  <CardContent className="space-y-4 p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm"><Icon className="h-7 w-7" /></div>
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionTitle eyebrow="Featured Models" title="Ready for Private Label" desc="High-volume, proven reliability medical electronics available for immediate OEM customization." />
            <Button variant="outline" className="bg-transparent border-slate-700 text-white hover:bg-slate-800" onClick={onGoProducts}>View Full Catalog</Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productCatalog.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => onViewProduct(item)}>
                <div className="aspect-[4/3] bg-slate-800 rounded-3xl overflow-hidden mb-6 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 mix-blend-screen" />
                </div>
                <Badge className="bg-slate-800 border-0 text-slate-300 mb-3">{item.tag}</Badge>
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductsPage({ selectedCategory, setSelectedCategory, onViewProduct }: any) {
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
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24">
      <PageHero eyebrow="Product Catalog" title="Discover Our Solutions" desc="Explore our complete range of high-precision medical devices available for global distribution and OEM/ODM manufacturing." />
      
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] mb-8">
        <Card className="rounded-[28px] border-slate-200 shadow-none">
          <CardContent className="space-y-5 p-6 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Filter className="h-4 w-4" /><span>Filter products</span></div>
            {/* 修复了此处的 Type checking 报错 (e: any) */}
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={keyword} onChange={(e: any) => setKeyword(e.target.value)} placeholder="Search models or keywords" className="h-11 rounded-2xl pl-10" /></div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button key={category.key} onClick={() => setSelectedCategory(category.key)} className={`rounded-full border px-4 py-2 text-sm transition ${selectedCategory === category.key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>{category.title}</button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onView={onViewProduct} />)}
      </div>
    </div>
  );
}

function ProductDetailPage({ product, onBack, onContact, onViewProduct }: any) {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8">
      <Breadcrumbs items={[{ label: "Catalog", onClick: onBack }, { label: product.name }]} />

      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <div className="rounded-[40px] overflow-hidden border border-slate-100 bg-slate-50 sticky top-32">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover mix-blend-multiply p-8" />
        </div>
        
        <div className="space-y-8">
          <div>
            <Badge className="mb-4">{product.tag}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">{product.name}</h1>
            <p className="text-xl leading-relaxed text-slate-600">{product.shortDesc}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.features.map((f: string) => (
                <div key={f} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl">
                  <CheckCircle2 className="h-5 w-5 text-slate-900 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Technical Specifications</h3>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
              {product.specs.map(([k, v]: [string, string], i: number) => (
                <div key={k} className={`flex justify-between p-5 text-sm ${i !== product.specs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <span className="text-slate-500">{k}</span>
                  <span className="font-bold text-slate-900">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base" onClick={onContact}>Request OEM Quote</Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-base" onClick={onContact}>Get Sample</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-10">
          <PageHero eyebrow="Get in Touch" title="Start Your OEM Project." desc="Our specialists in Shenzhen will help you with sample requests, branding details, and certification support." />
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><Mail size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email Inquiry</div><div className="text-lg font-bold">linda@yimilife.com</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><Phone size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Direct Call</div><div className="text-lg font-bold">+86 0755 89369909</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><MapPin size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Factory Location</div><div className="text-sm font-semibold leading-relaxed">Pingshan District, Shenzhen, China</div></div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-2xl shadow-slate-200/50 rounded-[40px] bg-slate-900 text-white">
          <CardContent className="p-10 space-y-8">
            <h3 className="text-3xl font-bold">Send an Inquiry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Your Name</label><Input className="bg-white/5 border-white/10 text-white h-12" placeholder="John Doe" /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Company Email</label><Input className="bg-white/5 border-white/10 text-white h-12" placeholder="john@company.com" /></div>
              <div className="space-y-2 sm:col-span-2"><label className="text-sm font-medium text-slate-300">Interested Product / Service</label>
                <select className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 outline-none appearance-none">
                  <option className="text-slate-900">Pulse Oximeters (OEM/Wholesale)</option>
                  <option className="text-slate-900">Blood Pressure Monitors (OEM/Wholesale)</option>
                  <option className="text-slate-900">Handheld Models</option>
                  <option className="text-slate-900">Other Customization Request</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2"><label className="text-sm font-medium text-slate-300">Message Details</label><Textarea className="bg-white/5 border-white/10 text-white min-h-[160px]" placeholder="Please tell us about your target market, estimated order quantity, and specific requirements (like Bluetooth, App integration, or Custom Logo)..." /></div>
            </div>
            <Button size="lg" className="w-full h-14 text-lg bg-white text-slate-900 hover:bg-slate-100">Submit Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// =====================================================================
// 主 App 组件 (包含路由与状态管理)
// =====================================================================

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 模拟客户端路由同步
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
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedCategory(product.category);
    setPage("product-detail");
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") window.location.hash = buildHash("product-detail", product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPage = (target: Page, category?: string) => {
    setPage(target);
    if (target === "products" && category) setSelectedCategory(category);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") window.location.hash = buildHash(target, null, category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch(page) {
      case "products": return <ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onViewProduct={handleViewProduct} />;
      case "product-detail": return selectedProduct ? <ProductDetailPage product={selectedProduct} onBack={() => goToPage("products")} onContact={() => goToPage("contact")} onViewProduct={handleViewProduct} /> : <ProductsPage selectedCategory="all" setSelectedCategory={setSelectedCategory} onViewProduct={handleViewProduct} />;
      case "contact": return <ContactPage />;
      default: return <HomePage onGoProducts={() => goToPage("products")} onGoOem={() => goToPage("oem")} onGoAbout={() => goToPage("about")} onGoCertifications={() => goToPage("certifications")} onGoNews={() => goToPage("news")} onGoContact={() => goToPage("contact")} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button className="flex items-center gap-3 text-left group" onClick={() => goToPage("home")}>
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-900 text-white transition-transform group-hover:scale-105">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight">Yimi Life</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Medical Technology</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${page === item.page ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden md:inline-flex" onClick={() => goToPage("contact")}>Get a Quote</Button>
            <button className="md:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单下拉框 */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-2">
             {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`w-full text-left rounded-2xl px-5 py-4 text-base font-bold transition-colors ${page === item.page ? "bg-slate-50 text-slate-900" : "text-slate-600"}`}
              >
                {item.label}
              </button>
            ))}
            <Button className="w-full h-14 mt-2" onClick={() => goToPage("contact")}>Get a Quote</Button>
          </div>
        )}
      </header>

      {/* 主体内容 */}
      <main className="min-h-[80vh]">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* 底部 Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-3 text-slate-900">
                <Activity className="h-8 w-8" />
                <span className="text-2xl font-black">Yimi Life</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                ISO 13485 Certified Medical Device Manufacturer. Providing professional OEM/ODM solutions for Pulse Oximeters and Digital Blood Pressure Monitors since 2017.
              </p>
              <div className="pt-4 space-y-2 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +86 0755 89369909</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> linda@yimilife.com</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => goToPage("home")} className="hover:text-slate-900 transition-colors">Home</button></li>
                <li><button onClick={() => goToPage("products")} className="hover:text-slate-900 transition-colors">Products</button></li>
                <li><button onClick={() => goToPage("oem")} className="hover:text-slate-900 transition-colors">OEM/ODM</button></li>
                <li><button onClick={() => goToPage("contact")} className="hover:text-slate-900 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product Lines</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => goToPage("products", "fingertip")} className="hover:text-slate-900 transition-colors">Fingertip Oximeters</button></li>
                <li><button onClick={() => goToPage("products", "blood-pressure")} className="hover:text-slate-900 transition-colors">Blood Pressure Monitors</button></li>
                <li><button onClick={() => goToPage("products", "handheld")} className="hover:text-slate-900 transition-colors">Handheld Oximeters</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <p>© {new Date().getFullYear()} Yimi Life Medical Technology (Shenzhen) Co., Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
