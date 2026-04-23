// 路径: app/contact/page.tsx
'use client';

import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Badge, Card, CardContent, Input, Textarea, Button } from "../components";
import { companyData } from "../data";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 lg:px-8 lg:py-24 animate-in fade-in duration-500">
      <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Contact Us</div>
      
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-12">
          <div className="space-y-6 max-w-md">
            <Badge className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 shadow-sm">N-to-1 Service Mode</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">Start Your OEM Project.</h1>
            <p className="text-lg leading-relaxed text-slate-500 font-medium">Enjoy our N-to-1 service mode. Live chat or add our WhatsApp/Skype to get a quick response for customized samples and mass production.</p>
          </div>
          
          <img src="[https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=800)" alt="Yimi Life Global Support Team" className="w-full h-56 object-cover rounded-[32px] shadow-sm" />

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><Mail size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">Email Inquiry</div><div className="text-xl font-bold text-slate-900">{companyData.email}</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><MessageCircle size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">WhatsApp / Skype</div><div className="text-xl font-bold text-slate-900">{companyData.whatsapp}</div></div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[20px] flex items-center justify-center text-blue-600"><MapPin size={28} strokeWidth={2}/></div>
              <div><div className="text-xs text-slate-400 uppercase font-black tracking-wider mb-1">Factory Location</div><div className="text-sm font-semibold leading-relaxed text-slate-700">{companyData.address}</div></div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-[40px] bg-slate-900 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <CardContent className="p-8 md:p-12 space-y-10 relative z-10">
            <div>
              <h3 className="text-3xl font-black mb-3">Request a Free Sample</h3>
              <p className="text-slate-400 font-medium">Fill out the form below. Customized samples are typically delivered in 2-5 days.</p>
            </div>
            
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3"><label className="text-sm font-bold text-slate-300 tracking-wide">Your Name</label><Input className="bg-slate-800/50 border-slate-700/50 text-white focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="John Doe" /></div>
              <div className="space-y-3"><label className="text-sm font-bold text-slate-300 tracking-wide">Company Email</label><Input type="email" className="bg-slate-800/50 border-slate-700/50 text-white focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="john@company.com" /></div>
              <div className="space-y-3 sm:col-span-2">
                <label className="text-sm font-bold text-slate-300 tracking-wide">Interested Product</label>
                <div className="relative">
                  <select className="flex h-14 w-full rounded-2xl border-2 border-slate-700/50 bg-slate-800/50 px-5 text-sm text-slate-300 outline-none transition-all focus:border-blue-500 focus:bg-slate-800 appearance-none font-medium cursor-pointer">
                    <option value="" className="text-slate-900">Select an option...</option>
                    <option value="pulse-oximeter" className="text-slate-900">Fingertip Pulse Oximeters</option>
                    <option value="bp-monitor" className="text-slate-900">Blood Pressure Monitors</option>
                    <option value="thermometer" className="text-slate-900">Forehead Thermometers</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3 sm:col-span-2">
                <label className="text-sm font-bold text-slate-300 tracking-wide">Message & Branding Details</label>
                <Textarea className="bg-slate-800/50 border-slate-700/50 text-white min-h-[160px] focus-visible:border-blue-500 focus-visible:bg-slate-800" placeholder="Please specify if you need custom logo, patterns, packaging, or specific software configurations..." />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-base font-black uppercase tracking-wider bg-white text-slate-900 hover:bg-slate-100 sm:col-span-2 border-none">Submit Inquiry</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
