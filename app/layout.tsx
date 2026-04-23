// 路径: app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader, SiteFooter } from './components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Yimi Life | Pulse Oximeter & BP Monitor Manufacturer',
  description: 'ISO 13485 Certified Medical Device Manufacturer in Shenzhen. OEM/ODM solutions for global brands.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900`}>
        <SiteHeader />
        <main className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
