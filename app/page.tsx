'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity, ShieldCheck, Factory, Cpu, Phone, Mail, MapPin, CheckCircle2,
  ArrowRight, Boxes, ClipboardCheck, Globe, Package, CalendarDays,
  Building2, BadgeCheck, Stethoscope, Search, Filter, ChevronRight,
  FileText, Sparkles, Users, Briefcase, BookOpen, Layers3, Menu, X,
  Award, Clock3, MessageSquareMore,
} from "lucide-react";

// --- 基础组件 ---
const motion = {
  div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
};
const AnimatePresence = ({ children }: any) => <>{children}</>;

const Card = ({ className, ...props }: any) => (
  <div className={`rounded-3xl border border-slate-200 bg-white text-slate-950 shadow-sm transition-all ${className || ''}`} {...props} />
);
const CardContent = ({ className, ...props }: any) => (
  <div className={`p-6 ${className || ''}`} {...props} />
);
const Button = ({ className, variant = "default", size = "default", ...props }: any) => {
  const variants: any = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-700",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
  };
  const sizes: any = { default: "h-11 px-6", sm: "h-9 px-3", lg: "h-12 px-8", icon: "h-11 w-11" };
  return <button className={`inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all active:scale-95 ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className || ''}`} {...props} />;
};
const Badge = ({ className, ...props }: any) => (
  <div className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ${className || ''}`} {...props} />
);
const Input = ({ className, ...props }: any) => (
  <input className={`flex h-11 w-full rounded-2xl border border-slate-200 bg-transparent px-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 ${className || ''}`} {...props} />
);
const Textarea = ({ className, ...props }: any) => (
  <textarea className={`flex min-h-[120px] w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 ${className || ''}`} {...props} />
);

// --- 业务数据 ---
const companyName = "Yimi Life";
type Page = "home" | "products" | "product-detail" | "about" | "oem" | "certifications" | "news" | "contact";
type Product = { id: string; name: string; category: string; tag: string; image: string; shortDesc: string; features: string[]; specs: [string, string][]; };

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" }, { label: "Products", page: "products" }, { label: "About", page: "about" },
  { label: "OEM/ODM", page: "oem" }, { label: "Certifications", page: "certifications" }, { label: "News", page: "news" }, { label: "Contact", page: "contact" },
];

const strengths = [
  { icon: Cpu, title: "In-house R&D", desc: "Home medical electronics focus covering SpO2, blood pressure." },
  { icon: Factory, title: "Integrated Manufacturing", desc: "R&D, production, and sales are positioned inside one company structure." },
  { icon: ShieldCheck, title: "Quality & Compliance", desc: "Focusing on FDA, CE MDR, and ISO 13485 compliance." },
  { icon: Globe, title: "Global Business Readiness", desc: "Aimed at overseas distributors, private-label buyers, and channel customers." },
];

const productCatalog: Product[] = [
  {
    id: "ym-f01", name: "Economy Fingertip Pulse Oximeter", category: "fingertip", tag: "Cost-effective line",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400", shortDesc: "A compact fingertip model for high-volume retail and entry private-label projects.",
    features: ["Compact fingertip design", "Fast-read display", "Private-label ready"], specs: [["Display", "LED"], ["Power", "AAA batteries"]]
  },
  {
    id: "ym-b01", name: "Arm Blood Pressure Monitor", category: "blood-pressure", tag: "Home-use BPM",
    image: "https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?auto=format&fit=crop&q=80&w=400", shortDesc: "A home-use upper-arm blood pressure monitor category entry for your second core line.",
    features: ["Upper-arm cuff", "Readable color display", "Home-use positioning"], specs: [["Type", "Upper-arm BPM"], ["Display", "LCD / color screen"]]
  },
  {
    id: "ym-h01", name: "TFT Display Handheld Pulse Oximeter", category: "handheld", tag: "Advanced interface",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400", shortDesc: "A handheld oximeter layout with larger display emphasis and professional visual category impression.",
    features: ["Larger display area", "Portable handheld format", "Differentiated catalog item"], specs: [["Display", "TFT display"], ["Format", "Handheld"]]
  },
];

function Breadcrumbs({ items }: any) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
      {items.map((item: any, i: number) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={14} />}
          <span className={item.onClick ? "cursor-pointer hover:text-slate-900" : ""}>{item.label}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function YimiMedicalHomepage() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const goToPage = (target: Page) => { setPage(target); window.scrollTo(0, 0); };
  const handleViewProduct = (product: Product) => { setSelectedProduct(product); setPage("product-detail"); window.scrollTo(0, 0); };

  const renderContent = () => {
    switch (page) {
      case "products":
        return (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-8 text-slate-900">Product Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCatalog.map(p => (
                <Card key={p.id} className="cursor-pointer" onClick={() => handleViewProduct(p)}>
                  <div className="aspect-square bg-slate-100 overflow-hidden rounded-t-[22px]"><img src={p.image} className="w-full h-full object-cover" alt={p.name} /></div>
                  <CardContent className="pt-6"><Badge className="mb-2">{p.tag}</Badge><h3 className="text-xl font-bold mb-2">{p.name}</h3><p className="text-slate-500 text-sm mb-4">{p.shortDesc}</p><Button variant="outline" className="w-full">View Details</Button></CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case "product-detail":
        if (!selectedProduct) return null;
        return (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <Breadcrumbs items={[{ label: "Products", onClick: () => goToPage("products") }, { label: selectedProduct.name }]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <img src={selectedProduct.image} className="rounded-3xl border border-slate-100 w-full" alt={selectedProduct.name} />
              <div>
                <h1 className="text-4xl font-bold mb-4">{selectedProduct.name}</h1>
                <p className="text-xl text-slate-500 mb-8">{selectedProduct.shortDesc}</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Specifications</h3>
                    <div className="bg-slate-50 rounded-2xl p-6">
                      {selectedProduct.specs.map((s, i) => (<div key={i} className="flex justify-between py-2 border-b border-slate-200 last:border-0"><span className="text-slate-500">{s[0]}</span><span className="font-semibold">{s[1]}</span></div>))}
                    </div>
                  </div>
                  <Button size="lg" className="w-full" onClick={() => goToPage("contact")}>Request a Quote</Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">Ready to build your private-label brand? Our B2B specialists will get back to you within 24 hours.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-700"><Mail /> <span>linda@yimilife.com</span></div>
                  <div className="flex items-center gap-4 text-slate-700"><Phone /> <span>+86 0755 89369909</span></div>
                  <div className="flex items-center gap-4 text-slate-700 leading-relaxed"><MapPin className="shrink-0" /> <span>Shenzhen, Guangdong, China</span></div>
                </div>
              </div>
              <Card className="bg-slate-900 text-white border-0 p-8">
                <div className="space-y-4">
                  <Input placeholder="Full Name" className="bg-white/10 border-white/10 text-white placeholder:text-slate-400" />
                  <Input placeholder="Company Email" className="bg-white/10 border-white/10 text-white placeholder:text-slate-400" />
                  <Textarea placeholder="How can we help? (OEM, Wholesale, Sample request...)" className="bg-white/10 border-white/10 text-white placeholder:text-slate-400" />
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">Send Inquiry</Button>
                </div>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <>
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
              <Badge className="mb-6">Global Medical Device Manufacturer</Badge>
              <h1 className="text-6xl font-bold tracking-tight mb-6">Precision Health Monitoring <br/><span className="text-slate-500">for Professional Brands</span></h1>
              <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10">ISO 13485 certified pulse oximeters and blood pressure monitors. Full-stack OEM/ODM support.</p>
              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => goToPage("products")}>Explore Catalog</Button>
                <Button size="lg" variant="outline" onClick={() => goToPage("oem")}>OEM Solutions</Button>
              </div>
            </section>
            <section className="bg-slate-50 py-20">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {strengths.slice(0, 3).map((s, i) => (
                  <div key={i}><div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-slate-900"><s.icon /></div><h3 className="text-xl font-bold mb-2">{s.title}</h3><p className="text-slate-500 leading-relaxed">{s.desc}</p></div>
                ))}
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => goToPage("home")}><div className="bg-slate-900 text-white p-2 rounded-xl"><Activity size={20} /></div><span className="font-bold text-xl tracking-tight">Yimi Life</span></div>
          <nav className="hidden md:flex items-center gap-6">{navItems.map(item => (<button key={item.label} onClick={() => goToPage(item.page)} className={`text-sm font-semibold transition-colors ${page === item.page ? "text-slate-900" : "text-slate-400 hover:text-slate-900"}`}>{item.label}</button>))}<Button onClick={() => goToPage("contact")}>Get a Quote</Button></nav>
        </div>
      </header>
      <main>{renderContent()}</main>
      <footer className="border-t border-slate-100 py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6"><Activity className="text-slate-900" /> <span className="font-bold">Yimi Life</span></div>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">© 2026 Yimi Life Medical Technology (Shenzhen) Co., Ltd. <br/> ISO 13485 Certified Manufacturer.</p>
        </div>
      </footer>
    </div>
  );
}
