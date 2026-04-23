// 路径: app/certifications/page.tsx
import { Building2, BadgeCheck, ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { Badge, Card, CardContent } from "../components";

export const metadata = {
  title: 'Certifications & Compliance | Yimi Life',
  description: 'Yimi Life adheres to ISO 13485, FDA 510(k), and CE MDR global medical standards.',
};

export default function CertificationsPage() {
  const certs = [
    { title: "ISO 13485:2016", desc: "Medical Device Quality Management System Certification.", icon: Building2, img: "[https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600)" },
    { title: "CE (MDR)", desc: "Compliant with the new European Medical Device Regulation.", icon: BadgeCheck, img: "[https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600)" },
    { title: "FDA 510(k)", desc: "Cleared for distribution and retail in the United States market.", icon: ShieldCheck, img: "[https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600)" },
    { title: "40+ Patents", desc: "Nearly 40 patented technologies and software copyrights obtained.", icon: Award, img: "[https://images.unsplash.com/photo-1505664173691-075197825b4b?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1505664173691-075197825b4b?auto=format&fit=crop&q=80&w=600)" },
    { title: "IP22 Degree", desc: "Protection against hazards of liquid and solid objects.", icon: ShieldCheck, img: "[https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600)" },
    { title: "RoHS / REACH", desc: "Strict adherence to hazardous substances regulations.", icon: CheckCircle2, img: "[https://images.unsplash.com/photo-1611273426858-450d8ce80b1e?auto=format&fit=crop&q=80&w=600](https://images.unsplash.com/photo-1611273426858-450d8ce80b1e?auto=format&fit=crop&q=80&w=600)" }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-20">
          <Badge className="bg-blue-50 text-blue-700 border-none">Quality Assurance</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">World-Class Compliance</h1>
          <p className="text-xl text-slate-600 font-medium">Experienced quality inspectors conduct strict inspections on every device. Our facility is IP22 rated and adheres strictly to global medical standards.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {certs.map((cert, i) => (
             <Card key={i} className="bg-white text-left hover:-translate-y-2 hover:shadow-xl hover:border-blue-300 transition-all duration-500 border-2 overflow-hidden flex flex-col group">
               <div className="bg-slate-100 p-8 flex justify-center items-center border-b border-slate-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 mix-blend-multiply" style={{ backgroundImage: `url(${cert.img})` }}></div>
                 <div className="bg-white p-2 shadow-xl border border-slate-200 aspect-[3/4] w-40 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105">
                      <img src={cert.img} alt={cert.title} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
                         <cert.icon className="w-12 h-12 text-blue-700 drop-shadow-md" />
                      </div>
                 </div>
               </div>
               <CardContent className="p-8 flex-grow">
                 <h3 className="text-2xl font-black text-slate-900 mb-3">{cert.title}</h3>
                 <p className="text-slate-500 font-medium">{cert.desc}</p>
               </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
}
