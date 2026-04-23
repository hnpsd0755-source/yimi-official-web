// 路径: app/oem-odm/page.tsx
import Link from "next/link";
import { Globe, Boxes, Cpu } from "lucide-react";
import { Badge, Card, CardContent, Button } from "../components";

export const metadata = {
  title: 'OEM / ODM Medical Device Services | Yimi Life',
  description: 'Complete technology support and fast customization workflow for your brand. ISO certified OEM/ODM services.',
};

export default function OemPage() {
  return (
    <div className="animate-in fade-in duration-500 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Badge className="bg-blue-100 text-blue-700 border-none">OEM & ODM Services</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">Complete <span className="text-blue-600">Technology Support</span></h1>
          <p className="text-xl text-slate-600 font-medium">With over 15 years of industry experience, our engineers specialize in understanding market demands and producing best-in-class pulse oximeters and health monitors for clients' brands.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Globe, title: "In-depth Market Report", desc: "We have ample knowledge to successfully conduct a promotion study in your target market and provide suggestions on procurement.", img: "[https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600)" },
            { icon: Boxes, title: "OEM Support", desc: "For OEM orders, we have rich experience and the most popular solutions in the market to recommend to you.", img: "[https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600)" },
            { icon: Cpu, title: "ODM Customization", desc: "For ODM orders, our technical team can make custom services according to your function, structure, and material requirements.", img: "[https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600)" }
          ].map((item, i) => (
            <Card key={i} className="bg-white hover:-translate-y-2 transition-all duration-500 border-2 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                 <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center flex-grow">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center -mt-16 mb-4 relative z-10 border-4 border-white shadow-sm"><item.icon className="w-7 h-7 text-blue-600" /></div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
           <h2 className="text-3xl font-black mb-12 relative z-10">Fast Customization Workflow</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "01", title: "Requirement", desc: "Live chat with N-to-1 service team to confirm logo & patterns." },
                { step: "02", title: "Prototyping", desc: "Customized samples will be delivered in 2-5 days." },
                { step: "03", title: "Verification", desc: "Strict quality inspections on each device by experts." },
                { step: "04", title: "Mass Production", desc: "One-stop sourcing production to save your money and time." }
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="text-5xl font-black text-slate-700/50 mb-4">{s.step}</div>
                  <h4 className="text-xl font-bold mb-2 text-blue-400">{s.title}</h4>
                  <p className="text-sm text-slate-400 font-medium">{s.desc}</p>
                  {i !== 3 && <div className="hidden md:block absolute top-6 -right-4 w-8 h-px bg-slate-700"></div>}
                </div>
              ))}
           </div>
           <div className="mt-16 relative z-10">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl">Inquire for Free Sample</Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
