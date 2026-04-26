'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import Sidebar from '../../../components/dispatcher/Sidebar';
import { Icon } from '@iconify/react';

// Încărcăm Harta dinamic, oprim Server-Side Rendering (SSR)
const TrackingMap = dynamic(() => import('../../../components/dispatcher/LiveMapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400">Se încarcă harta...</div>
});

export default function LiveTrackingPage() {
  const { getToken } = useAuth();
  const [fleets, setFleets] = useState<any[]>([]);
  const [selectedFleetId, setSelectedFleetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State-uri pentru simulare
  const [isSimulating, setIsSimulating] = useState(false);
  const [simSpeed, setSimSpeed] = useState(5);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Funcția care aduce datele reale de la Backend
  const fetchMapData = useCallback(async () => {
    try {
      const token = await getToken({ template: 'session_token' });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/live-map`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFleets(data);
        
        // Dacă nu avem nimic selectat, selectăm automat primul camion din listă
        if (!selectedFleetId && data.length > 0) {
            setSelectedFleetId(data[0].fleet_id);
        }
      }
    } catch (error) {
      console.error("Eroare la aducerea datelor pentru hartă:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, selectedFleetId]);

  const tickSimulation = useCallback(async () => {
    try {
      const token = await getToken({ template: 'session_token' });
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/simulate-tick?speed=${simSpeed}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }); 
      fetchMapData();
    } catch (error) {
        console.error("Simulation error", error);
    }
  }, [getToken, simSpeed, fetchMapData]);

  // 2. Efectul de REAL-TIME (Polling la fiecare 15 secunde)
  useEffect(() => {
    fetchMapData(); // Aducem datele imediat la încărcare

    const intervalTime = isSimulating ? 800 : 15000;
    
    const intervalId = setInterval(() => {
        if (isSimulating) {
            tickSimulation();
        } else {
            fetchMapData();
        }
    }, intervalTime);

    return () => clearInterval(intervalId); // Curățăm intervalul când plecăm de pe pagină
  }, [fetchMapData, isSimulating, tickSimulation]);

  // Găsim datele camionului pe care am dat click pentru panoul din stânga
  const selectedFleet = fleets.find(f => f.fleet_id === selectedFleetId);

  const toggleSimulation = () => setIsSimulating(!isSimulating);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 relative flex">
          
          {/* HARTA DIN SPATE */}
          <div className="absolute inset-0 z-0">
             <TrackingMap 
                activeFleets={fleets} 
                selectedFleetId={selectedFleetId} 
                onMarkerClick={(id: string) => setSelectedFleetId(id)} 
             />
          </div>

          {/* WIDGET SIMULATOR (CENTRAT MAI SUS) */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
              
              {/* Badge-ul de status deasupra panoului */}
              {isSimulating && (
                  <div className="mb-3 px-4 py-1.5 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      SIMULARE ACTIVĂ
                  </div>
              )}

              {/* Panoul principal */}
              <div className="bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl shadow-indigo-900/20 border border-slate-700/50 flex items-center gap-2">
                  
                  {/* Titlul / Icon */}
                  <div className="px-4 py-2 flex items-center gap-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                     <Icon icon="solar:history-bold-duotone" className="text-indigo-400 text-xl" />
                     <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Engine</span>
                  </div>

                  <div className="w-px h-8 bg-slate-700/50 mx-2"></div>
                  {/* Butoane Viteză */}
                  <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
                      <button 
                        onClick={() => {setSimSpeed(20); setIsSimulating(true)}} // Mărit la 20
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                            isSimulating && simSpeed === 20 
                            ? 'bg-indigo-500 text-white shadow-md' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                          1x
                      </button>
                      <button 
                        onClick={() => {setSimSpeed(100); setIsSimulating(true)}} // Mărit la 100
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                            isSimulating && simSpeed === 100 
                            ? 'bg-indigo-500 text-white shadow-md' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                          5x
                      </button>
                  </div>

                  <div className="w-px h-8 bg-slate-700/50 mx-2"></div>
                  
                  {/* Butonul de Play/Pause principal */}
                  <button 
                    onClick={toggleSimulation}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                        isSimulating 
                        ? 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/40' 
                        : 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40'
                    }`}
                  >
                      <Icon icon={isSimulating ? "solar:stop-bold" : "solar:play-bold"} width="24" />
                  </button>
              </div>
          </div>

          {/* PANOUL LATERAL STÂNGA (Dinamic acum!) */}
          <div className="relative z-10 w-[420px] h-[calc(100%-2rem)] bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl m-4 border border-slate-100 flex flex-col overflow-hidden">
            
            {isLoading && fleets.length === 0 ? (
                <div className="p-10 text-center text-slate-500">Se încarcă datele live...</div>
            ) : selectedFleet ? (
                <>
                    {/* Secțiunea Profil Șofer & Camion */}
                    <div className="p-6 border-b border-slate-100 bg-white shadow-sm z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3 items-center">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg border border-indigo-200 shadow-inner">
                                    {selectedFleet.driver ? selectedFleet.driver.name.charAt(0) : <Icon icon="solar:user-bold" />}
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-900 leading-tight">
                                        {selectedFleet.driver ? selectedFleet.driver.name : "Fără șofer"}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5 uppercase tracking-wide">
                                        {selectedFleet.driver ? `ID: DRV-${selectedFleet.driver.id}` : "Neasignat"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicul Curent</p>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                                    selectedFleet.truck.status === 'AVAILABLE' 
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                        : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                                }`}>
                                    {selectedFleet.truck.status}
                                </span>
                            </div>
                            <p className="font-bold text-slate-800 text-lg">{selectedFleet.truck.plate}</p>
                            <p className="text-xs text-slate-500 mt-1 font-medium">{selectedFleet.truck.model}</p>
                            
                            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                                    <Icon icon="solar:box-minimalistic-bold" className="text-slate-400" />
                                    {selectedFleet.trailer ? selectedFleet.trailer.plate : 'Fără remorcă'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Secțiunea Tabs */}
                    <div className="flex border-b border-slate-100 px-6 pt-2 bg-white">
                        <button className="pb-3 border-b-2 border-indigo-600 text-indigo-600 font-bold text-sm mr-6">Cursa Activă</button>
                    </div>

                    {/* Secțiunea Detalii Cursă / Comandă */}
                    <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50 no-scrollbar">
                        {selectedFleet.active_order ? (
                            <div className="space-y-6">
                                <div className="bg-white border border-indigo-100 p-4 rounded-xl shadow-sm ring-1 ring-indigo-50">
                                    <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Detalii Comandă</h3>
                                    <p className="font-semibold text-slate-800 text-sm leading-relaxed">
                                        {selectedFleet.active_order.description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                                    <Icon icon="solar:cup-star-bold-duotone" width="32" className="text-slate-400" />
                                </div>
                                <h3 className="font-bold text-slate-700">În Așteptare</h3>
                                <p className="text-sm text-slate-500 mt-1">Acest echipaj nu are o comandă activă în acest moment. Se află în repaus sau așteaptă dispecerizarea.</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="p-10 text-center text-slate-500">Selectează un vehicul de pe hartă.</div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}