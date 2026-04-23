'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu, X, Phone, Mail } from "lucide-react";
import { navItems, companyData } from "./data";

// UI Components
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-[32px] border border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-slate-200 ${className || ''}`} {...props} />
));
Card.displayName = 'Card';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 md:p-8 ${className || ''}`} {...props} />
));
CardContent.displayName = 'CardContent';

export const Button = React.forwardRef<HTMLButtonElement, any>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants: any = {
    default: "bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/20 border border-blue-600",
    outline: "border-2 border-slate-200 bg-white hover:border-blue-500 hover:text-blue-600 text-slate-700 hover:bg-blue-50/50",
  };
  const sizes: any = { default: "h-12 px-6 rounded-2xl", lg: "h-14 rounded-2xl px-8 text-base" };
  return <button ref={ref} className={`inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 disabled:opacity-50 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className || ''}`} {...props} />;
});
Button.displayName = 'Button';

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={`inline-flex items-center rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-blue-700 backdrop-blur-sm ${className || ''}`} {...props} />
));
Badge.displayName = 'Badge';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input type={type} className={`flex h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 text-sm focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white transition-all ${className || ''}`} ref={ref} {...props} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea className={`flex min-h-[140px] w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-5 py-4 text-sm focus-visible:outline-none focus-visible:border-blue-500 focus-visible:bg-white transition-all ${className || ''}`} ref={ref} {...props} />
));
Textarea.displayName = 'Textarea';

// Global Header
export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-900 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-600">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-900">{companyData.name}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Medical Tech</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/products') && item.href === '/products');
            return (
              <Link key={item.label} href={item.href} className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact"><Button className="hidden md:inline-flex shadow-lg shadow-blue-500/20">Get a Quote</Button></Link>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-2xl p-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="w-full text-left rounded-2xl px-5 py-4 text-base font-black text-slate-600 hover:bg-slate-50">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

// Global Footer
export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 pt-24 pb-12 mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm"><Activity className="h-5 w-5" /></div>
              <span className="text-2xl font-black tracking-tight">{companyData.name}</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-500 font-medium">
              ISO 13485 Certified Medical Device Manufacturer. Providing professional OEM/ODM solutions for Pulse Oximeters, Digital Blood Pressure Monitors, Thermometers and Nebulizers globally.
            </p>
            <div className="pt-2 space-y-4 text-sm text-slate-600 font-bold">
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-slate-400"/> {companyData.phone}</div>
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-slate-400"/> {companyData.email}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              {navItems.slice(0, 4).map(item => (
                <li key={item.label}><Link href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200/60 pt-8 flex items-center justify-between text-xs font-bold text-slate-400">
          <p>© {new Date().getFullYear()} {companyData.name} Medical Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
