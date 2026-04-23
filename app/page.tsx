// 路径: app/page.tsx
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button, Badge, Card, CardContent } from "./components";
import { categories, productCatalog } from "./data";

export default function HomePage() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
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
              <Link href="/products">
                <Button size="lg" className="h-14 px-10 text-base">Explore Catalog <ArrowRight className="ml-2 h-5 w-5" /></Button>
              </Link>
              <Link href="/oem-odm">
                <Button size="lg" variant="outline" className="h-14 px-10 text-base shadow-sm">OEM Solutions</Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-2xl opacity-60"></div>
            <img src="[https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp](https://c108.hongcdn.com/uploads/2205/professional-pulse-oximeter-facotry-4-%21j.webp)" alt="Yimi Life Products" className="relative z-10 w-full max-w-md drop-shadow-2xl rounded-[40px] object-cover aspect-square border-8 border-white/50" loading="eager" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
                <Link key={item.title} href={`/products?category=${item.key}`}>
                  <Card className="bg-slate-50/50 hover:bg-white h-full group">
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
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-3xl space-y-4">
              <Badge className="px-4 py-1.5 text-xs bg-slate-800 text-blue-300 border-slate-700 shadow-sm font-bold">Featured Models</Badge>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl text-white">Ready for Private Label</h2>
              <p className="text-lg leading-relaxed text-slate-400 font-medium">High-volume, proven reliability medical electronics available for immediate OEM customization.</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white">View Full Catalog</Button>
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productCatalog.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="group flex flex-col">
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
