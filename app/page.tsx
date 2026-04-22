'use client';

import React, { useEffect, useState } from "react";
import {
  Activity, ShieldCheck, Factory, Cpu, Phone, Mail, MapPin, CheckCircle2,
  ArrowRight, Boxes, ClipboardCheck, Globe, BadgeCheck, Stethoscope, 
  Search, Filter, ChevronRight, FileText, Sparkles, Layers3, Menu, X,
  Award, Clock3, MessageSquareMore,
} from "lucide-react";

// 模拟动画组件
const motion = { div: ({ children, ...props }: any) => <div {...props}>{children}</div> };
const AnimatePresence = ({ children }: any) => <>{children}</>;

// 基础 UI 组件
const Card = ({ className, ...props }: any) => (
  <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm transition-all ${className || ''}`} {...props} />
);
const CardContent = ({ className, ...props }: any) => (
  <div className={`p-6 ${className || ''}`} {...props} />
);
const Button = ({ className, variant = "default", size = "default", ...props }: any) => {
  const variants: any = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
  };
  const sizes: any = { default: "h-11 px-6", lg: "h-12 px-8" };
  return <button className={`inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all active:scale-95 ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props} />;
};
const Badge = ({ className, ...props }: any) => (
  <div className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ${className || ''}`} {...props} />
);

// 核心业务数据
const companyName = "Yimi Life";
const productCatalog = [
  { id: "ym-f01", name: "Economy Fingertip Pulse Oximeter", tag: "Best Seller", image: "https://c108.hongcdn.com/uploads/2207/fda-oximeter-8-%21j.webp", desc: "Cost-effective model for high-volume retail projects." },
  { id: "ym-b01", name: "Arm Blood Pressure Monitor", tag: "Home Use", image: "https://c108.hongcdn.com/uploads/2205/09115040123-%21j.webp", desc: "Accurate upper-arm monitoring with large display." },
  { id: "ym-h01", name: "Handheld Pulse Oximeter", tag: "Professional", image: "https://c108.hongcdn.com/uploads/2507/04-%21j.webp", desc: "Portable monitoring for clinical and home use." },
];

export default function App() {
  const [page, setPage] = useState("home");

  const renderContent = () => {
    if (page === "products") {
      return (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">Our Product Catalog</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCatalog.map(p => (
              <Card key={p.id}>
                <img src={p.image} className="w-full aspect-square object-cover rounded-t-[22px]" alt={p.name} />
                <CardContent>
                  <Badge className="mb-2">{p.tag}</Badge>
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                  <Button variant="outline" className="w-full" onClick={() => setPage("contact")}>Inquiry Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <Badge className="mb-6">ISO 13485 Certified Manufacturer</Badge>
        <h1 className="text-6xl font-bold tracking-tight mb-6">Yimi Life Medical<br/><span className="text-slate-500">Precision Health Monitoring</span></h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-10">Dedicated to R&D and manufacturing of high-quality Pulse Oximeters and Blood Pressure Monitors in Shenzhen since 2017.</p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => setPage("products")}>View Products</Button>
          <Button size="lg" variant="outline" onClick={() => setPage("contact")}>Contact Us</Button>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage("home")}>
            <div className="bg-slate-900 text-white p-2 rounded-xl"><Activity size={20} /></div>
            <span className="font-bold text-xl uppercase tracking-tighter">{companyName}</span>
          </div>
          <nav className="flex items-center gap-6">
            <button onClick={() => setPage("home")} className="text-sm font-semibold">Home</button>
            <button onClick={() => setPage("products")} className="text-sm font-semibold">Products</button>
            <Button onClick={() => setPage("contact")}>Get Quote</Button>
          </nav>
        </div>
      </header>
      <main>{renderContent()}</main>
      <footer className="py-20 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 Yimi Life Medical Technology (Shenzhen) Co., Ltd.</p>
      </footer>
    </div>
  );
}
