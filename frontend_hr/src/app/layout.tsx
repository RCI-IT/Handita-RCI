import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "PT Reka Cipta Inovasi",
  description: `Welcome to PT. Reka Cipta Inovasi - blending construction and innovation. Since 2019, we excel in road, bridge, and port projects. From drilling to equipment rental, we're your quality, safe, and sustainable choice.`,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "constructor, construction, service, company, services-company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex bg-gray-100 min-h-screen relative ${inter.className}`}
      >
        <Toaster />
        <Header />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
