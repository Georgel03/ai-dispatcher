'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const { getToken } = useAuth(); // <--- The Magic: Gets the secure token
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // The function that calls your new Backend API
  const handleRoleSelection = async (role: 'driver' | 'dispatcher') => {
    setIsLoading(true);
    try {
      // 1. Get the JWT token from Clerk
      const token = await getToken();

      // 2. Send it to YOUR Backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // <--- The "Stamp" we verified in Phase 1
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // 3. Success! Redirect to Dashboard
      // (Optional: You could force a reload to update user metadata if needed)
      router.push('/');
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-2xl w-full">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome, {user?.firstName}!</h1>
          <p className="text-slate-500">To get started, please select your primary role.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 1: Dispatcher */}
          <button 
            disabled={isLoading}
            onClick={() => handleRoleSelection('dispatcher')}
            className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#5465FF]/30 transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {/* Map Icon */}
              <svg className="w-6 h-6 text-[#5465FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">I am a Dispatcher</h3>
            <p className="text-sm text-slate-500">I manage the fleet, assign loads, and optimize routes.</p>
          </button>

          {/* Option 2: Driver */}
          <button 
            disabled={isLoading}
            onClick={() => handleRoleSelection('driver')}
            className="group relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all text-left"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {/* Truck Icon */}
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">I am a Driver</h3>
            <p className="text-sm text-slate-500">I drive the trucks, complete deliveries, and update status.</p>
          </button>
        </div>

      </div>
    </div>
  );
}