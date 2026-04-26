'use client';

import { useUser, UserButton, SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { 
  Box, Weight, Truck, Calendar, MapPin, Search, 
  Settings, LogOut, Bell, HelpCircle, Filter, 
  Route, Banknote, Clock, Navigation
} from "lucide-react";
import { useState } from "react";

// --- 1. IMAGE POOL FOR RANDOMIZATION ---
// Colecție de imagini high-quality cu tematică logistică
const TRUCK_IMAGES = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
];

// Helper function: Assigns a consistent "random" image based on the Order ID
const getOrderImage = (orderId: string) => {
  const charSum = orderId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return TRUCK_IMAGES[charSum % TRUCK_IMAGES.length];
};

// --- 2. MOCK DATA ---
const MOCK_ORDERS = [
  {
    id: "ORD-9921",
    type: "URGENT",
    route: "Bucharest → Cluj-Napoca",
    goods: "20 pallets of mineral water",
    weight: "20,000",
    trailer: "Tarpaulin",
    date: "Tomorrow, 08:30 AM",
  },
  {
    id: "ORD-8842",
    type: "STANDARD",
    route: "Iași → Constanța",
    goods: "Packaged food products",
    weight: "12,500",
    trailer: "Refrigerated",
    date: "Oct 24, 11:00 AM",
  },
  {
    id: "ORD-7719",
    type: "STANDARD",
    route: "Timișoara → Arad",
    goods: "Automotive parts",
    weight: "8,200",
    trailer: "Standard Box",
    date: "Oct 26, 09:00 AM",
  }
];

export default function DriverDashboard() {
  const { user, isLoaded } = useUser();
  const [totalKm, setTotalKm] = useState(1240); // Test KM
  const [totalHours, setTotalHours] = useState("42h 15m");

  // Calculation Logic: 0.50 RON per KM
  const totalEarnings = (totalKm * 0.50).toFixed(2);

  // Role Protection
  if (isLoaded && user) {
    const role = user.publicMetadata.role as string;
    if (role !== 'driver' && role !== 'admin') {
      redirect("/");
    }
  }

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading workspace...</div>;

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Nav Links */}
          <nav className="p-4 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-bold border border-blue-100 cursor-pointer">
              <Box className="w-5 h-5" />
              <span>My Orders</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-semibold transition cursor-pointer">
              <Navigation className="w-5 h-5" />
              <span>Active Route</span>
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-900 font-semibold cursor-pointer transition">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>
          <SignOutButton>
            <div className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-600 font-semibold cursor-pointer transition">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </SignOutButton>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
          
          {/* Page Title & Filter */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Available Loads</h1>
              <p className="text-slate-500">Manage the transport orders assigned to your vehicle.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            
            {/* Render Orders */}
            {MOCK_ORDERS.map((order) => {
              // Get the dynamically assigned image based on ID
              const dynamicImage = getOrderImage(order.id);

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                  {/* Card Header Image */}
                  <div 
                    className="h-32 bg-slate-800 relative p-4 flex flex-col justify-between"
                    style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${dynamicImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded text-white ${order.type === 'URGENT' ? 'bg-emerald-600' : 'bg-slate-500/80 backdrop-blur-sm'}`}>
                        {order.type}
                      </span>
                    </div>
                    <div className="text-white">
                      <p className="text-[11px] font-bold text-slate-300 mb-0.5">ID: #{order.id}</p>
                      <p className="font-bold text-lg leading-tight">{order.route}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Box className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cargo</p>
                          <p className="text-sm font-semibold text-slate-700">{order.goods}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-start gap-3">
                          <Weight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weight</p>
                            <p className="text-sm font-bold text-slate-900">{order.weight} kg</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Truck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trailer Type</p>
                            <p className="text-sm font-semibold text-slate-700">{order.trailer}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pickup Date</p>
                          <p className="text-sm font-semibold text-slate-700">{order.date}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition shadow-sm active:scale-95">
                        Accept
                      </button>
                      <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition active:scale-95">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State Card */}
            <div className="bg-slate-100/50 rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Searching for new routes...</h3>
              <p className="text-sm text-slate-500 max-w-[200px]">New orders will appear here automatically when assigned.</p>
            </div>

          </div>

          {/* BOTTOM STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KM Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Route className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Distance Driven</p>
                <p className="text-2xl font-black text-slate-900">{totalKm.toLocaleString()} <span className="text-sm font-bold text-slate-500">km</span></p>
              </div>
            </div>

            {/* Earnings Card (Dynamic calculation) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <Banknote className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">This Month's Earnings</p>
                <p className="text-2xl font-black text-slate-900">{totalEarnings} <span className="text-sm font-bold text-slate-500">RON</span></p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Driving Hours</p>
                <p className="text-2xl font-black text-slate-900">{totalHours}</p>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}