// 路径: app/products/page.tsx
'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, CheckCircle2 } from "lucide-react";
import { Badge, Card, CardContent, Input, Button } from "../components";
import { categories, productCatalog } from "../data";

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
                onChange={(e) => setKeyword(e.target.value)} 
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
                 <Button variant="outline" className="w-full h-12 bg-slate-50/50 border-slate-200">View Specifications</Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
