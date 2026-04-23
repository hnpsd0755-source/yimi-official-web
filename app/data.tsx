import { 
  Boxes, Activity, Stethoscope, ClipboardCheck, Sparkles, 
  Building2, BadgeCheck, ShieldCheck, Award, CheckCircle2 
} from "lucide-react";

export const companyData = {
  name: "Yimi Life",
  established: "Oct 10, 2017",
  email: "sales@yimilife.com",
  phone: "+86 0755 89369909",
  whatsapp: "+86 18X XXXX XXXX",
  address: "Pingshan District, Shenzhen, China",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "OEM/ODM", href: "/oem-odm" },
  { label: "About Us", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const categories = [
  { key: "all", title: "All Products", desc: "Browse the full catalog.", icon: Boxes },
  { key: "fingertip", title: "Fingertip Pulse Oximeters", desc: "OLED, TFT, LED series for retail and private-label projects.", icon: Activity },
  { key: "blood-pressure", title: "Blood Pressure Monitors", desc: "Upper-arm home-use designs with clear buyer-facing presentation.", icon: Stethoscope },
  { key: "handheld", title: "Handheld Oximeters", desc: "Portable display-oriented models for clinical and home use.", icon: ClipboardCheck },
  { key: "oem", title: "OEM / ODM Solutions", desc: "Branding, shell color, packaging, and feature-level adaptation.", icon: Sparkles },
];

export const productCatalog = [
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
