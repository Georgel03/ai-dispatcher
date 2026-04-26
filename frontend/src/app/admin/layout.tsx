'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = await getToken({ template: "session_token" });
        if (!token) return router.push("/");

        console.log("🔑 TOKEN PENTRU SWAGGER: ", token);

        // Verificăm rolul din backend-ul tău
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.role === "admin") {
            setIsAuthorized(true);
          } else {
            router.push("/"); // Nu e admin, înapoi la pagina principală
          }
        }
      } catch (error) {
        router.push("/");
      }
    };

    if (isLoaded) checkRole();
  }, [isLoaded, router, getToken]);

  // Arătăm un ecran gol sau spinner până se verifică rolul
  if (!isAuthorized) return <div className="min-h-screen bg-slate-50"></div>;

  return (
    <div className="bg-slate-50 h-screen w-full flex text-slate-800 antialiased selection:bg-[#5465FF] selection:text-white overflow-hidden text-sm">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header />
        {children} 
      </main>
    </div>
  );
}