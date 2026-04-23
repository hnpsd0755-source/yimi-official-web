// 路径: app/news/page.tsx
import { CalendarDays, ArrowRight } from "lucide-react";
import { Badge, Card, CardContent } from "../components";

export const metadata = {
  title: 'Global News & Exhibitions | Yimi Life',
  description: 'Read the latest updates and meet us at global medical exhibitions like MEDICA and CMEF.',
};

export default function NewsPage() {
  const newsList = [
    { type: "New Release", date: "Recent Update", title: "Findmy Oximeter OLED Certified: Dual Color Display Series", desc: "Our new 0.96\" OLED Oximeter supports SpO2 & PR detection, rotatable multi-direction display, and customized software options including alarm settings.", image: "[https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=800)" },
    { type: "Product Innovation", date: "Recent Update", title: "Expanding Core Lines: Forehead Thermometers & Nebulizers", desc: "To provide a complete homecare solution, Yimi Life has successfully expanded its R&D scope to include professional compressor nebulizers and fast-read thermometers.", image: "[https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800)" },
    { type: "Exhibition", date: "Upcoming", title: "Yimi Life Global Exhibition Roadmap", desc: "We continually participate in global medical exhibitions to showcase our latest HD display Color TFT, LED, and Bluetooth smart oximeters.", image: "[https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800)" }
  ];

  return (
    <div className="animate-in fade-in duration-500 bg-slate-50/50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge className="bg-blue-100 text-blue-700 border-none">Latest Updates</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Global News & Innovations</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, i) => (
             <Card key={i} className="flex flex-col overflow-hidden bg-white hover:-translate-y-2 transition-all duration-500 cursor-pointer border-2">
               <div className="h-56 overflow-hidden relative">
                 <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                 <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-md shadow-sm border-none">{news.type}</Badge>
                 </div>
               </div>
               <CardContent className="p-8 flex flex-col flex-grow">
                 <div className="flex items-center gap-2 text-sm text-blue-600 font-bold mb-4">
                   <CalendarDays className="w-4 h-4" /> {news.date}
                 </div>
                 <h3 className="text-xl font-black text-slate-900 mb-3 leading-snug hover:text-blue-600 transition-colors">{news.title}</h3>
                 <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-grow text-sm">{news.desc}</p>
                 <div className="flex items-center text-sm font-bold text-slate-900 mt-auto uppercase tracking-wider hover:text-blue-600 transition-colors">
                   Read Article <ArrowRight className="w-4 h-4 ml-2" />
                 </div>
               </CardContent>
             </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
