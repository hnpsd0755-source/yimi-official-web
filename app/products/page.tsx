'use client';

import React, { useState, useMemo } from "react";
import { Search, Filter, CheckCircle2 } from "lucide-react";

// ==========================================
// ⚠️ 注意：以下 Component 和 Data 是为了在当前预览环境中正常显示而临时整合的。
// 在您复制到 GitHub 时，请将两个分割线中间的代码删除，并替换为真实的 import：
// import Link from "next/link";
// import { Badge, Card, CardContent, Input, Button } from "../components";
// import { categories, productCatalog } from "../data";
// ==========================================
const Link = ({ href, children, className }: any) => <a href={href} className={className}>{children}</a>;

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-[32px] border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 ${className || ''}`} {...props} />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 md:p-8 ${className || ''}`} {...props} />
));
CardContent.displayName = 'CardContent';

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-blue-700 backdrop-blur-sm transition-colors ${className || ''}`} {...props} />
));
Badge.displayName = 'Badge';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={`flex h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ${className || ''}`} ref={ref} {...props} />
));
Input.displayName = 'Input';

const Button = React.forwardRef<HTMLButtonElement, any>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants: any = {
    default: "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/20 border border-blue-600",
    outline: "border-2 border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 hover:bg-blue-50/50",
  };
  return <button ref={ref} className={`inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] ${variants[variant] || variants.default} h-12 px-6 rounded-2xl ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

const categories = [
  { key: "all", title: "All Products" },
  { key: "fingertip", title: "Fingertip Pulse Oximeters" },
  { key: "blood-pressure", title: "Blood Pressure Monitors" },
  { key: "handheld", title: "Handheld Oximeters" },
  { key: "oem", title: "OEM / ODM Solutions" },
];

const productCatalog = [
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
// ==========================================
// ⬆️ 临时合并的依赖代码结束
// ==========================================

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
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
          <Link key={product.id} href={`/products/${product.id}`} className="block h-full">
            <Card className="cursor-pointer group flex flex-col h-full bg-white border-slate-100 hover:border-blue-300">
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
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {product.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-blue-50 p-1"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600" /></div>
                      <span className="text-sm font-medium text-slate-600 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="px-6 pb-6 pt-2">
                 <Button variant="outline" className="w-full bg-slate-50/50 border-slate-200">View Specifications</Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
