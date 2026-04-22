import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 使用经典、兼容性 100% 的 Inter 字体
const inter = Inter({ subsets: ["latin"] });

// 这里是属于您的一米生命专属 Google SEO 标签！
export const metadata: Metadata = {
  title: "Yimi Life | Pulse Oximeter & BP Monitor Manufacturer",
  description: "Shenzhen-based ISO 13485 medical device manufacturer. Professional OEM/ODM solutions for pulse oximeters and digital blood pressure monitors.",
  keywords: "pulse oximeter manufacturer, blood pressure monitor manufacturer, OEM pulse oximeter, ODM medical device, CE MDR oximeter factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
