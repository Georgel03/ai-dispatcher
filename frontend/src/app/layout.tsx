import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Navbar from '../components/Navbar'; // Import the new component
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import RoleGuard from "../components/role-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "AI Dispatcher",
  description: "Smart Fleet Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. Wrap the entire HTML structure in ClerkProvider
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased bg-white text-slate-900">
          {/* Navbar sits at the top of every page */}
          <Navbar />
          {/* Main Content */}
          <main>
            <RoleGuard>
              {children}
            </RoleGuard>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
