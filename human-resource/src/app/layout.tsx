import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const inter = Poppins({
//   subsets: ["latin"],
//   weight: "400",
// });

export const metadata: Metadata = {
  title: "PT Reka Cipta Inovasi",
  description: `PT. Reka Cipta Inovasi - Your Choice for Quality, Safe, and Sustainable Road, Bridge, and Port Projects since 2019. Explore our innovative construction solutions today!`,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: "constructor, construction, service, company, services-company",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://www.rekaciptainovasi.com/",
    title: "PT Reka Cipta Inovasi",
    description:
      "PT. Reka Cipta Inovasi - Your Choice for Quality, Safe, and Sustainable Road, Bridge, and Port Projects since 2019. Explore our innovative construction solutions today!",
    siteName: "PT Reka Cipta Inovasi",
    images: [
      {
        url: "https://www.rekaciptainovasi.com/_next/image?url=%2Fassets%2FLogo.png&w=1080&q=75",
      },
    ],
  },

  // verification: {
  //   google: "yxvc9xNcCRBrvFNc6FtrPNMKfeQEVFCdLwbtlQJXaL0",
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-w-screen bg-gray-100 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar />
        <div className="flex-1 py-5 px-5">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
