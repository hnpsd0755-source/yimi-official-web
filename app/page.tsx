'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, ShieldCheck, Factory, Cpu, Phone, Mail, MapPin, CheckCircle2,
  Boxes, ClipboardCheck, Globe, CalendarDays,
  BadgeCheck, Stethoscope, Search, Filter, ChevronRight,
  Sparkles, Menu, X,
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
// 2. UI 组件库 (原生 Tailwind 还原，去除 any 隐患)
// =====================================================================
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-[28px] border border-slate-200 bg-white text-slate-950 shadow-sm transition-shadow hover:shadow-md ${className || ''}`} {...props} />
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
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  };
  const sizes = { 
    default: "h-11 px-6 rounded-2xl", 
    sm: "h-9 rounded-xl px-3", 
    lg: "h-12 rounded-2xl px-8",
    icon: "h-11 w-11 rounded-2xl"
  };
  return <button ref={ref} className={`inline-flex items-center justify-center text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none active:scale-95 ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors ${className || ''}`} {...props} />
));
Badge.displayName = 'Badge';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={`flex h-12 w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className || ''}`} ref={ref} {...props} />
));
Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={`flex min-h-[120px] w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className || ''}`} ref={ref} {...props} />
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
  <div className="space-y-2 text-sm text-slate-700">
    {features.map((feature) => (
      <div key={feature} className="flex items-start gap-2">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" />
        <span>{feature}</span>
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
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="mb-6 bg-white border-slate-200 shadow-sm px-4 py-1.5 text-sm">ISO 13485 Certified Manufacturer</Badge>
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
            <img src="https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp" alt="Yimi Life Products" className="relative z-10 w-full max-w-md drop-shadow-2xl rounded-3xl object-cover aspect-square" loading="eager" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <Badge className="px-4 py-1.5 text-xs tracking-wide bg-slate-100 border-none text-slate-800">Product Categories</Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900">Core Manufacturing Lines</h2>
            <p className="text-base leading-7 text-slate-600 md:text-lg">Browse our well-structured product families designed for distributors, private-label buyers, and retail channels.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="bg-slate-50 border-0 shadow-none hover:bg-slate-100 cursor-pointer" onClick={onGoProducts}>
                  <CardContent className="space-y-4">
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
            <div className="max-w-3xl space-y-3">
              <Badge className="px-4 py-1.5 text-xs tracking-wide bg-slate-800 text-slate-300 border-none">Featured Models</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">Ready for Private Label</h2>
              <p className="text-base leading-7 text-slate-400 md:text-lg">High-volume, proven reliability medical electronics available for immediate OEM customization.</p>
            </div>
            <Button variant="outline" className="bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white" onClick={onGoProducts}>View Full Catalog</Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productCatalog.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={() => onViewProduct(item)}>
                <div className="aspect-[4/3] bg-slate-800 rounded-3xl overflow-hidden mb-6 relative">
                  <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 mix-blend-screen" />
                </div>
                <Badge className="bg-slate-800 text-slate-300 border-none mb-3">{item.tag}</Badge>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.shortDesc}</p>
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
      <div className="space-y-6">
        <Badge className="bg-slate-900 text-white border-none px-4 py-1.5">Product Catalog</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-slate-900">Discover Our Solutions</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">Explore our complete range of high-precision medical devices available for global distribution and OEM/ODM manufacturing.</p>
      </div>
      
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] mb-8">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700"><Filter className="h-4 w-4" /><span>Filter products</span></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                value={keyword} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} 
                placeholder="Search models or keywords" 
                className="pl-11" 
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button 
                  key={category.key} 
                  onClick={() => setSelectedCategory(category.key)} 
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${selectedCategory === category.key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
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
          <Card key={product.id} className="cursor-pointer group" onClick={() => onViewProduct(product)}>
            <div className="aspect-square bg-slate-50 relative overflow-hidden rounded-t-[28px]">
              <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover mix-blend-multiply p-6 transition-transform duration-500 group-hover:scale-105" />
            </div>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Badge>{product.tag}</Badge>
                <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{product.shortDesc}</p>
              </div>
              <FeatureList features={product.features.slice(0, 3)} />
              <div className="pt-4 border-t border-slate-100">
                <Button variant="outline" className="w-full">View Specifications</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductDetailPage({ product, onBack, onContact }: any) {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={onBack} className="hover:text-slate-900 transition-colors font-medium">Catalog</button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-900 font-semibold">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <div className="rounded-[40px] overflow-hidden border border-slate-100 bg-slate-50 sticky top-32 p-8 lg:p-12">
          <img src={product.image} alt={product.name} loading="eager" className="w-full aspect-square object-cover mix-blend-multiply" />
        </div>
        
        <div className="space-y-10">
          <div>
            <Badge className="mb-4">{product.tag}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">{product.name}</h1>
            <p className="text-xl leading-relaxed text-slate-600">{product.shortDesc}</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl text-slate-900">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.features.map((f: string) => (
                <div key={f} className="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="h-5 w-5 text-slate-900 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl text-slate-900">Technical Specifications</h3>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              {product.specs.map(([k, v]: [string, string], i: number) => (
                <div key={k} className={`flex justify-between p-5 text-sm ${i !== product.specs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <span className="text-slate-500">{k}</span>
                  <span className="font-bold text-slate-900">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4">
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
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24 animate-in fade-in duration-500">
      <div className="text-sm text-slate-500">Contact Us</div>
      
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-10">
          <div className="space-y-6">
            <Badge className="bg-slate-900 text-white px-4 py-1.5 border-none">Get in Touch</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">Start Your OEM Project.</h1>
            <p className="text-lg leading-8 text-slate-600 max-w-md">Our specialists in Shenzhen will help you with sample requests, branding details, and certification support.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><Mail size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email Inquiry</div><div className="text-lg font-bold text-slate-900">linda@yimilife.com</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><Phone size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Direct Call</div><div className="text-lg font-bold text-slate-900">+86 0755 89369909</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-slate-900"><MapPin size={24}/></div>
              <div><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Factory Location</div><div className="text-sm font-semibold leading-relaxed text-slate-900">Pingshan District, Shenzhen, China</div></div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-2xl shadow-slate-200/50 rounded-[40px] bg-slate-900 text-white">
          <CardContent className="p-8 md:p-10 space-y-8">
            <h3 className="text-3xl font-bold">Send an Inquiry</h3>
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Your Name</label><Input className="bg-white/5 border-white/10 text-white" placeholder="John Doe" /></div>
              <div className="space-y-2"><label className="text-sm font-medium text-slate-300">Company Email</label><Input type="email" className="bg-white/5 border-white/10 text-white" placeholder="john@company.com" /></div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-300">Interested Product / Service</label>
                <div className="relative">
                  <select className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300 outline-none transition-all focus:border-blue-500 appearance-none">
                    <option value="" className="text-slate-900">Select an option...</option>
                    <option value="pulse-oximeter" className="text-slate-900">Pulse Oximeters (OEM/Wholesale)</option>
                    <option value="bp-monitor" className="text-slate-900">Blood Pressure Monitors</option>
                    <option value="handheld" className="text-slate-900">Handheld Models</option>
                    <option value="other" className="text-slate-900">Other Customization Request</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-300">Message Details</label>
                <Textarea className="bg-white/5 border-white/10 text-white min-h-[140px]" placeholder="Tell us about your target market, estimated quantity, and specific requirements..." />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-lg bg-white text-slate-900 hover:bg-slate-100 sm:col-span-2">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SimplePageWrapper({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24 animate-in fade-in duration-500 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">{title}</h1>
      <div className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed bg-slate-50 p-8 rounded-3xl border border-slate-100">
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
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button className="flex items-center gap-3 text-left group" onClick={() => goToPage("home")}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white transition-transform group-hover:scale-105 shadow-sm">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">Yimi Life</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Medical Technology</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${page === item.page ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden md:inline-flex shadow-sm" onClick={() => goToPage("contact")}>Get a Quote</Button>
            <button className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden transition-all duration-300 origin-top ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent shadow-none"}`}>
          <div className="p-4 flex flex-col gap-2">
             {navItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => goToPage(item.page)} 
                className={`w-full text-left rounded-2xl px-5 py-4 text-base font-bold transition-colors ${page === item.page ? "bg-slate-50 text-slate-900" : "text-slate-600 active:bg-slate-50"}`}
              >
                {item.label}
              </button>
            ))}
            <Button className="w-full h-14 mt-2" onClick={() => goToPage("contact")}>Get a Quote</Button>
          </div>
        </div>
      </header>

      {/* 主体内容区 */}
      <main className="min-h-[75vh]">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* 底部 Footer */}
      <footer className="border-t border-slate-100 bg-slate-50 pt-20 pb-10 mt-auto">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-center gap-3 text-slate-900">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-black">Yimi Life</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                ISO 13485 Certified Medical Device Manufacturer. Providing professional OEM/ODM solutions for Pulse Oximeters and Digital Blood Pressure Monitors since 2017.
              </p>
              <div className="pt-4 space-y-3 text-sm text-slate-600 font-medium">
                <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-slate-400"/> +86 0755 89369909</div>
                <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-slate-400"/> linda@yimilife.com</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => goToPage("home")} className="hover:text-blue-600 transition-colors">Home</button></li>
                <li><button onClick={() => goToPage("products")} className="hover:text-blue-600 transition-colors">Products</button></li>
                <li><button onClick={() => goToPage("oem")} className="hover:text-blue-600 transition-colors">OEM/ODM</button></li>
                <li><button onClick={() => goToPage("contact")} className="hover:text-blue-600 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product Lines</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li><button onClick={() => goToPage("products", "fingertip")} className="hover:text-blue-600 transition-colors">Fingertip Oximeters</button></li>
                <li><button onClick={() => goToPage("products", "blood-pressure")} className="hover:text-blue-600 transition-colors">Blood Pressure Monitors</button></li>
                <li><button onClick={() => goToPage("products", "handheld")} className="hover:text-blue-600 transition-colors">Handheld Oximeters</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <p>© {new Date().getFullYear()} Yimi Life Medical Technology (Shenzhen) Co., Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-slate-900 transition-colors">Privacy Policy</button>
              <button className="hover:text-slate-900 transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
