'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function OnboardingPage() {
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // State pentru pași și date
  const [step, setStep] = useState<"role_selection" | "driver_details">("role_selection");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: ""
  });

  const handleRoleSelect = (selectedRole: "driver" | "dispatcher") => {
    if (selectedRole === "driver") {
      setStep("driver_details");
    } else {
      // Pentru dispatcher, trimitem direct fără alte date
      submitOnboarding("dispatcher", null, null);
    }
  };

  const submitOnboarding = async (role: string, name: string | null, phone: string | null) => {
    setIsLoading(true);
    try {
      const token = await getToken( { template: "session_token" } );

      // Payload-ul respectă DTO-ul "OnboardingRequest" de pe backend
      const payload = {
        role: role,
        full_name: name,
        phone: phone
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/onboard`, {
        method: 'POST', // Folosim POST pentru creare atomică
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to onboard');
      }

      // Succes! Redirecționăm către dashboard-ul principal
      window.location.href = "/";
      
    } catch (error: any) {
      alert(`Eroare: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!clerkUser) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-black">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Bun venit, {clerkUser.firstName}!</h1>
          <p className="text-slate-500">Alege rolul tău în platformă.</p>
        </div>

        {step === "role_selection" && (
          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelect("driver")}
              className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition flex items-center justify-between group"
            >
              <div className="text-left text-black">
                <span className="block font-bold group-hover:text-blue-700">Șofer de Tir</span>
                <span className="text-sm text-slate-500">Transport marfă și gestionare vehicul.</span>
              </div>
              <span className="text-3xl">🚛</span>
            </button>

            <button
              onClick={() => handleRoleSelect("dispatcher")}
              className="w-full p-4 border-2 border-slate-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition flex items-center justify-between group"
            >
              <div className="text-left text-black">
                <span className="block font-bold group-hover:text-purple-700">Dispecer</span>
                <span className="text-sm text-slate-500">Asignare curse și management flotă.</span>
              </div>
              <span className="text-3xl">🖥️</span>
            </button>
          </div>
        )}

        {step === "driver_details" && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-center text-slate-900">Detalii Șofer</h2>
            
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Nume Complet</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-slate-300 rounded-md outline-none text-black font-semibold"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1">Telefon</label>
              <input 
                type="tel" 
                className="w-full p-3 border-2 border-slate-300 rounded-md outline-none text-black font-semibold"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button onClick={() => setStep("role_selection")} className="flex-1 font-semibold text-slate-600">Înapoi</button>
              <button 
                onClick={() => submitOnboarding("driver", formData.fullName, formData.phone)}
                disabled={isLoading || !formData.fullName || !formData.phone}
                className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Se salvează..." : "Finalizează"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}