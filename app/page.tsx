'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, ShieldCheck, Factory, Cpu, Phone, Mail, MapPin, CheckCircle2,
  Boxes, ClipboardCheck, Globe, CalendarDays,
  BadgeCheck, Stethoscope, Search, Filter, ChevronRight,
  Sparkles, Menu, X, ArrowRight, FileText,
} from "lucide-react";

// =====================================================================
// 1. 动画与类型兼容层 (防报错 + 严格类型)
// =====================================================================
const motion = {
  div: React.forwardRef<HTMLDivElement, any>(({ initial, animate, exit, transition, ...props }, ref) => <div ref={ref} {...props} />),
};
motion.div.displayName = 'motion.div';
const AnimatePresence = ({ children }: { children: React.ReactNode; mode?: string }) => <>{children}</>;

// =====================================================================
// 2. UI 组件库 (高级质感 Tailwind 还原)
// =====================================================================
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-[32px] border border-slate-100 bg-white text-slate-950 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 ${className || ''}`} {...props} />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 md:p-8 ${className || ''}`} {...props} />
));
CardContent.displayName = 'CardContent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    // 升级为更有医疗科技感的蓝色渐变按钮
    default: "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/20 border border-blue-600",
    // 边框按钮加粗，悬浮时变蓝
    outline: "border-2 border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 hover:bg-blue-50/50",
    ghost: "hover:bg-slate-100 text-slate-600",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 border border-slate-800"
  };
  const sizes = { 
    default: "h-12 px-6 rounded-2xl", 
    sm: "h-10 rounded-xl px-4 text-xs", 
    lg: "h-14 rounded-2xl px-8 text-base",
    icon: "h-12 w-12 rounded-2xl"
  };
  return <button ref={ref} className={`inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-blue-700 backdrop-blur-sm transition-colors ${className || ''}`} {...props} />
));
Badge.displayName = 'Badge';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={`flex h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className || ''}`} ref={ref} {...props} />
));
Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={`flex min-h-[140px] w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className || ''}`} ref={ref} {...props} />
));
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
  { key: "fingertip", title: "Fingertip Pulse Oximeters", desc: "OLED, TFT, LED series for retail and private-label projects.", icon: Activity },
  { key: "blood-pressure", title: "Blood Pressure Monitors", desc: "Upper-arm home-use designs with clear buyer-facing presentation.", icon: Stethoscope },
  { key: "handheld", title: "Handheld Oximeters", desc: "Portable display-oriented models for clinical and home use.", icon: ClipboardCheck },
  { key: "oem", title: "OEM / ODM Solutions", desc: "Branding, shell color, packaging, and feature-level adaptation.", icon: Sparkles },
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
    tag: "Cost-effective",
    image: "https://c108.hongcdn.com/uploads/2207/fda-oximeter-8-%21j.webp",
    shortDesc: "A compact fingertip model for high-volume retail and entry private-label projects.",
    features: ["Compact design", "Fast-read display", "Private-label ready", "Household use"],
    specs: [["Display", "LED"], ["Power", "AAA batteries"], ["Use Case", "Retail / E-commerce"]]
  },
  {
    id: "ym-f02",
    name: "Professional Fingertip Pulse Oximeter",
    category: "fingertip",
    tag: "Mainstream retail",
    image: "https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp",
    shortDesc: "A cleaner-looking mainstream model suitable for stronger shelf presentation.",
    features: ["Waveform display", "Color screen", "Retail-friendly", "High accuracy"],
    specs: [["Display", "Color OLED / TFT"], ["Form", "Fingertip clip"], ["Positioning", "Mainstream retail"]]
  },
  {
    id: "ym-h01",
    name: "TFT Display Handheld Pulse Oximeter",
    category: "handheld",
    tag: "Advanced interface",
    image: "https://c108.hongcdn.com/uploads/2507/04-%21j.webp",
    shortDesc: "A handheld oximeter layout with larger display emphasis and professional visual.",
    features: ["Larger display", "Portable format", "Mid/high-tier", "Continuous monitoring"],
    specs: [["Display", "TFT display"], ["Format", "Handheld"], ["Positioning", "Clinical & Home"]]
  },
  {
    id: "ym-b01",
    name: "Arm Blood Pressure Monitor",
    category: "blood-pressure",
    tag: "Home-use BPM",
    image: "https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp",
    shortDesc: "A home-use upper-arm blood pressure monitor category entry.",
    features: ["Upper-arm cuff", "Color display", "Home-use positioning", "OEM packaging"],
    specs: [["Type", "Upper-arm BPM"], ["Display", "LCD / color screen"], ["Use Case", "Household use"]]
  }
];

// =====================================================================
// 路由与 SEO 状态管理
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
  const exactMatch = navItems.find(item => path === `/${item.page}` || path === `/${item.page}-odm`);
  if (exactMatch) return { page: exactMatch.page };
  return { page: "home" };
}

// 提取的通用 Feature List 组件
const FeatureList = ({ features }: { features: string[] }) => (
  <div className="space-y-3 pt-2 border-t border-slate-100">
    {features.map((feature) => (
      <div key={feature} className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-blue-50 p-1">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 leading-snug">{feature}</span>
      </div>
    ))}
  </div>
);

// =====================================================================
// 独立页面模块
// =====================================================================

function HomePage({ onGoProducts, onGoOem, onViewProduct }: any) {
  return (
    <div className="animate-in fade-in duration-500">
      {/* 升级版 Hero Section：增加光影和网格背景 */}
      <section className="relative overflow-hidden bg-slate-50/50 border-b border-slate-100 pt-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 rounded-full blur-3xl opacity-50 -z-10"></div>
        
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 items-center z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/60 px-4 py-2 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wide text-blue-800">ISO 13485 Certified Manufacturer</span>
            </div>
            
            <h1 className="max-w-3xl text-[3.5rem] leading-[1.05] font-black tracking-tight md:text-6xl lg:text-[4.5rem] text-slate-900 drop-shadow-sm">
              Precision Health <br />Monitoring <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">for Global Brands.</span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl leading-relaxed text-slate-500 font-medium">
              Specializing in the R&D and manufacturing of high-quality pulse oximeters and blood pressure monitors in Shenzhen. Full OEM/ODM support for your supply chain.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-10 text-base" onClick={onGoProducts}>Explore Catalog <ArrowRight className="ml-2 h-5 w-5" /></Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-base shadow-sm" onClick={onGoOem}>OEM Solutions</Button>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            {/* 产品图装饰底座 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-2xl opacity-60"></div>
            <img 
              src="https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp" 
              alt="Yimi Life Products" 
              className="relative z-10 w-full max-w-md drop-shadow-2xl rounded-[40px] object-cover aspect-square border-8 border-white/50" 
              loading="eager" 
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-32 relative">
        <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge className="bg-slate-100 text-slate-600 border-none px-4 py-1.5 text-xs font-bold">Product Categories</Badge>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl text-slate-900">Core Manufacturing Lines</h2>
            <p className="text-lg leading-relaxed text-slate-500 font-medium">Browse our well-structured product families designed for distributors, private-label buyers, and retail channels.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-slate-50/50 hover:bg-white cursor-pointer group" onClick={onGoProducts}>
                  <CardContent className="space-y-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white text-blue-600 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-3xl space-y-4">
              <Badge className="px-4 py-1.5 text-xs bg-slate-800 text-blue-300 border-slate-700 shadow-sm font-bold">Featured Models</Badge>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl text-white">Ready for Private Label</h2>
              <p className="text-lg leading-relaxed text-slate-400 font-medium">High-volume, proven reliability medical electronics available for immediate OEM customization.</p>
            </div>
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white" onClick={onGoProducts}>View Full Catalog</Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productCatalog.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col" onClick={() => onViewProduct(item)}>
                <div className="aspect-[4/3] bg-slate-800 rounded-[32px] overflow-hidden mb-6 relative border border-slate-800 shadow-xl">
                  <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-screen" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 shadow-sm px-3 py-1 text-xs">{item.tag}</Badge>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors leading-tight">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">{item.shortDesc}</p>
                <div className="mt-auto flex items-center text-sm font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  View Details <ChevronRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsPage({ selectedCategory, setSelectedCategory, onViewProduct }: any) {
  const [keyword, setKeyword] = useState("");

  const filteredProducts = useMemo(() => {
    return productCatalog.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const kw = keyword.trim().toLowerCase();
      const matchKeyword = !kw || item.name.toLowerCase().includes(kw) || item.shortDesc.toLowerCase().includes(kw) || item.tag.toLowerCase().includes(kw);
      return matchCategory && matchKeyword;
    });
  }, [keyword, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24 animate-in fade-in duration-500">
      <div className="space-y-6 max-w-3xl">
        <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 font-bold shadow-sm">Product Catalog</Badge>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl text-slate-900 leading-[1.1]">Discover Our Solutions</h1>
        <p className="text-lg md:text-xl leading-relaxed text-slate-500 font-medium">Explore our complete range of high-precision medical devices available for global distribution and OEM/ODM manufacturing.</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] mb-12">
        <Card className="bg-slate-50/50 border-slate-100 shadow-sm">
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider"><Filter className="h-4 w-4" /><span>Filter Library</span></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input 
                value={keyword} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} 
                placeholder="Search models or keywords..." 
                className="pl-12 bg-white" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button 
                  key={category.key} 
                  onClick={() => setSelectedCategory(category.key)} 
                  className={`rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 ${selectedCategory === category.key ? "border-slate-900 bg-slate-900 text-white shadow-md" : "border-slate-100 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="cursor-pointer group flex flex-col h-full bg-white border-slate-100" onClick={() => onViewProduct(product)}>
            <div className="aspect-square bg-slate-50/80 relative overflow-hidden rounded-t-[32px] border-b border-slate-100">
              <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover mix-blend-multiply p-8 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-5 left-5">
                <Badge className="bg-white/90 shadow-sm px-3 py-1 border-white">{product.tag}</Badge>
              </div>
            </div>
            <CardContent className="space-y-5 flex-grow flex flex-col">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">{product.category}</div>
                <h3 className="text-xl font-bold leading-snug text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 font-medium mb-2 flex-grow">{product.shortDesc}</p>
              <FeatureList features={product.features.slice(0, 3)} />
            </CardContent>
            <div className="px-6 pb-6 pt-2">
               <Button variant="outline" className="w-full h-12 bg-slate-50/50 border-slate-200">View Specifications</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductDetailPage({ product, onBack, onContact }: any) {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium tracking-wide">
        <button onClick={onBack} className="hover:text-blue-600 transition-colors">Catalog</button>
        <ChevronRight className="h-4 w-4 text-slate-300" />
        <span className="text-slate-900 font-bold">{product.name}</span>
      </div>

      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-start">
        <div className="rounded-[40px] overflow-hidden border-2 border-slate-100 bg-slate-50/80 sticky top-32 p-8 lg:p-16 shadow-sm">
          <img src={product.image} alt={product.name} loading="eager" className="w-full aspect-square object-cover mix-blend-multiply transition-transform hover:scale-105 duration-700" />
        </div>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <Badge className="bg-blue-50 text-blue-700 px-4 py-1.5 shadow-sm border-none">{product.tag}</Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">{product.name}</h1>
            <p className="text-xl leading-relaxed text-slate-500 font-medium">{product.shortDesc}</p>
          </div>

          <div className="space-y-5">
            <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
               <Sparkles className="w-5 h-5 text-blue-500" /> Key Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.features.map((f: string) => (
                <div key={f} className="flex items-start gap-4 bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
                  <div className="mt-0.5 rounded-full bg-blue-50 p-1.5 group-hover:bg-blue-600 transition-colors duration-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
               <FileText className="w-5 h-5 text-blue-500" /> Technical Specifications
            </h3>
            <div className="bg-white border-2 border-slate-100 rounded-[28px] overflow-hidden shadow-sm">
              {product.specs.map(([k, v]: [string, string], i: number) => (
                <div key={k} className={`flex justify-between p-6 text-sm hover:bg-slate-50/80 transition-colors ${i !== product.specs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <span className="font-medium text-slate-500 uppercase tracking-wider text-xs">{k}</span>
                  <span className="font-bold text-slate-900 text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-100">
            <Button size="lg" className="w-full sm:w-auto px-10 text-base shadow-xl shadow-blue-500/20" onClick={onContact}>Request OEM Quote</Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 text-base" onClick={onContact}>Get Sample</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24 animate-in fade-in duration-500">
      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Contact Us</div>
      
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-12">
          <div className="space-y-6 max-w-md">
            <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 shadow-sm">Get in Touch</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">Start Your OEM Project.</h1>
            <p className="text-lg leading-relaxed text-slate-500 font-medium">Our specialists in Shenzhen will help you with sample requests, branding details, and certification support.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><Mail size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">Email Inquiry</div><div className="text-xl font-bold text-slate-900">linda@yimilife.com</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><Phone size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">Direct Call</div><div className="text-xl font-bold text-slate-900">+86 0755 89369909</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><MapPin size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">Factory Location</div><div className="text-sm font-semibold leading-relaxed text-slate-700">Pingshan District, Shenzhen, China</div></div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
           {/* 装饰光影 */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <CardContent className="p-8 md:p-12 space-y-10 relative z-10">
            <div>
              <h3 className="text-3xl font-black mb-3">Send an Inquiry</h3>
              <p className="text-slate-400 font-medium">Fill out the form below and we'll respond within 24 hours.</p>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3"><label className="text-sm font-bold text-slate-300 tracking-wide">Your Name</label><Input className="bg-slate-800/50 border-slate-700/50 text-white focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="John Doe" /></div>
              <div className="space-y-3"><label className="text-sm font-bold text-slate-300 tracking-wide">Company Email</label><Input type="email" className="bg-slate-800/50 border-slate-700/50 text-white focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="john@company.com" /></div>
              <div className="space-y-3 sm:col-span-2">
                <label className="text-sm font-bold text-slate-300 tracking-wide">Interested Product / Service</label>
                <div className="relative">
                  <select className="flex h-14 w-full rounded-2xl border-2 border-slate-700/50 bg-slate-800/50 px-5 text-sm text-slate-300 outline-none transition-all focus:border-blue-500 focus:bg-slate-800 appearance-none font-medium cursor-pointer">
                    <option value="" className="text-slate-900">Select an option...</option>
                    <option value="pulse-oximeter" className="text-slate-900">Pulse Oximeters (OEM/Wholesale)</option>
                    <option value="bp-monitor" className="text-slate-900">Blood Pressure Monitors</option>
                    <option value="handheld" className="text-slate-900">Handheld Models</option>
                    <option value="other" className="text-slate-900">Other Customization Request</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3 sm:col-span-2">
                <label className="text-sm font-bold text-slate-300 tracking-wide">Message Details</label>
                <Textarea className="bg-slate-800/50 border-slate-700/50 text-white min-h-[160px] focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="Tell us about your target market, estimated quantity, and specific requirements..." />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-base font-black uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-100 sm:col-span-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border-none">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SimplePageWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32 animate-in fade-in duration-500 text-center">
      <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-8">{title}</h1>
      <div className="max-w-2xl mx-auto text-lg text-slate-600 font-medium leading-relaxed bg-slate-50/80 p-12 rounded-[40px] border border-slate-100 shadow-sm">
        {children}
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

  // 1. 模拟客户端路由同步
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

  // 2. 动态 SEO 标题更新机制 (核心优化点)
  useEffect(() => {
    const baseTitle = "Yimi Life";
    const titleMap: Record<string, string> = {
      home: `${baseTitle} | Pulse Oximeter & BP Monitor Manufacturer`,
      products: `Product Catalog | ${baseTitle}`,
      "product-detail": selectedProduct ? `${selectedProduct.name} | ${baseTitle}` : `Product Details | ${baseTitle}`,
      about: `About Us | ${baseTitle}`,
      oem: `OEM / ODM Solutions | ${baseTitle}`,
      certifications: `Certifications | ${baseTitle}`,
      news: `News & Events | ${baseTitle}`,
      contact: `Contact Us | ${baseTitle}`
    };
    document.title = titleMap[page] || titleMap.home;
  }, [page, selectedProduct]);

  // 页面导航处理
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
      case "product-detail": return selectedProduct ? <ProductDetailPage product={selectedProduct} onBack={() => goToPage("products")} onContact={() => goToPage("contact")} /> : <ProductsPage selectedCategory="all" setSelectedCategory={setSelectedCategory} onViewProduct={handleViewProduct} />;
      case "contact": return <ContactPage />;
      case "about": return <SimplePageWrapper title="About Yimi Life">Yimi Life is an ISO 13485 certified manufacturer based in Shenzhen, providing professional medical devices globally since 2017.</SimplePageWrapper>;
      case "oem": return <SimplePageWrapper title="OEM / ODM Solutions">We offer full-stack customization including logo printing, packaging design, algorithm adjustments, and Bluetooth integration.</SimplePageWrapper>;
      case "certifications": return <SimplePageWrapper title="Certifications">Our facility and products comply with ISO 13485, CE MDR, FDA 510(k), and RoHS standards.</SimplePageWrapper>;
      case "news": return <SimplePageWrapper title="News & Events">Stay updated with our latest medical exhibitions like CMEF and MEDICA, and new product launches.</SimplePageWrapper>;
      default: return <HomePage onGoProducts={() => goToPage("products")} onGoOem={() => goToPage("oem")} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button className="flex items-center gap-3 text-left group" onClick={() => goToPage("home")}>
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-900 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900">Yimi Life</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Medical Tech</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${page === item.page ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden md:inline-flex shadow-lg shadow-blue-500/20" onClick={() => goToPage("contact")}>Get a Quote</Button>
            <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-2xl overflow-hidden transition-all duration-300 origin-top ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-transparent shadow-none"}`}>
          <div className="p-6 flex flex-col gap-2">
             {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`w-full text-left rounded-2xl px-5 py-4 text-base font-black tracking-wide transition-colors ${page === item.page ? "bg-slate-50 text-blue-600" : "text-slate-600 active:bg-slate-50"}`}
              >
                {item.label}
              </button>
            ))}
            <Button className="w-full h-14 mt-4 shadow-xl shadow-blue-500/20" onClick={() => goToPage("contact")}>Get a Quote</Button>
          </div>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* 底部 Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 pt-24 pb-12 mt-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-2xl font-black tracking-tight">Yimi Life</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500 font-medium">
                ISO 13485 Certified Medical Device Manufacturer. Providing professional OEM/ODM solutions for Pulse Oximeters and Digital Blood Pressure Monitors globally.
              </p>
              <div className="pt-2 space-y-4 text-sm text-slate-600 font-bold">
                <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-slate-400"/> +86 0755 89369909</div>
                <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-slate-400"/> linda@yimilife.com</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><button onClick={() => goToPage("home")} className="hover:text-blue-600 transition-colors">Home</button></li>
                <li><button onClick={() => goToPage("products")} className="hover:text-blue-600 transition-colors">Products</button></li>
                <li><button onClick={() => goToPage("oem")} className="hover:text-blue-600 transition-colors">OEM/ODM</button></li>
                <li><button onClick={() => goToPage("contact")} className="hover:text-blue-600 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">Product Lines</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500">
                <li><button onClick={() => goToPage("products", "fingertip")} className="hover:text-blue-600 transition-colors">Fingertip Oximeters</button></li>
                <li><button onClick={() => goToPage("products", "blood-pressure")} className="hover:text-blue-600 transition-colors">Blood Pressure Monitors</button></li>
                <li><button onClick={() => goToPage("products", "handheld")} className="hover:text-blue-600 transition-colors">Handheld Oximeters</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-slate-400">
            <p>© {new Date().getFullYear()} Yimi Life Medical Technology (Shenzhen) Co., Ltd. All rights reserved.</p>
            <div className="flex gap-8">
              <button className="hover:text-slate-900 transition-colors">Privacy Policy</button>
              <button className="hover:text-slate-900 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
