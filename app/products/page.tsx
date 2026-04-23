import React from "react";
import { ChevronRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

// ============================================================================
// ⚠️ 依赖组件与数据占位 (用于当前预览环境正常渲染)
// 在复制到真实项目的 GitHub 中时，请将这段代码替换为原有的真实 import：
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { Badge, Button } from "../../components";
// import { productCatalog } from "../../data";
// ============================================================================
const Link = ({ href, children, className }: any) => <a href={href} className={className}>{children}</a>;
const notFound = () => <div className="p-20 text-center text-2xl font-bold">404 - Product Not Found</div>;

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-blue-700 backdrop-blur-sm transition-colors ${className || ''}`} {...props} />
));
Badge.displayName = 'Badge';

const Button = React.forwardRef<HTMLButtonElement, any>(({ className, variant = "default", ...props }, ref) => {
  const variants: any = {
    default: "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/20 border border-blue-600",
    outline: "border-2 border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 hover:bg-blue-50/50",
  };
  return <button ref={ref} className={`inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] ${variants[variant] || variants.default} h-12 px-6 rounded-2xl ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

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
// ============================================================================

// 动态生成 SEO Title
export function generateMetadata({ params }: { params: { id: string } }) {
  const product = productCatalog.find(p => p.id === params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Yimi Life Manufacturer`,
    description: product.shortDesc,
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // 注意：如果是真实环境，这里的 params.id 在本地测试时通常需要提供具体的有效ID，
  // 我们在这个展示环境中默认使用第一个产品作为预览演示。
  const productId = params?.id || "ym-f02"; 
  const product = productCatalog.find(p => p.id === productId);
  
  if (!product) {
    return notFound(); // 如果产品不存在，自动返回 404 页面
  }

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 lg:px-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium tracking-wide">
        <Link href="/products" className="hover:text-blue-600 transition-colors">Catalog</Link>
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
              {/* 这里通过修改推断类型，解决了 TypeScript 的编译错误 */}
              {product.specs.map(([k, v]: any, i: number) => (
                <div key={k} className={`flex justify-between p-6 text-sm hover:bg-slate-50/80 transition-colors ${i !== product.specs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <span className="font-medium text-slate-500 uppercase tracking-wider text-xs">{k}</span>
                  <span className="font-bold text-slate-900 text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-100">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-10 text-base shadow-xl shadow-blue-500/20">Request OEM Quote</Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full px-10 text-base">Get Sample</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
