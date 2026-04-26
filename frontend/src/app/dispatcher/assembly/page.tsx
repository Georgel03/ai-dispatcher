'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useAuth } from '@clerk/nextjs';
import Sidebar from '../../../components/dispatcher/Sidebar';
import FleetAssemblyBoard from '../../../components/dispatcher/FleetAssemblyBoard';
import EditFleetModal from '../../../components/dispatcher/EditFleetModal';
import { Icon } from '@iconify/react';

export default function FleetAssemblyPage() {
    const { getToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const [activeFleets, setActiveFleets] = useState([]);
    const [fleetToEdit, setFleetToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [resources, setResources] = useState({
        drivers: [],
        trucks: [],
        trailers: [],
    });

    const fetchActiveFleets = useCallback(async () => {
        try {
            const token = await getToken({ template: 'session_token' });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/active-fleets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setActiveFleets(data);
            }
        } catch (error) {
            console.error('Error fetching active fleets:', error);
        }
    }, [getToken]);



    const fetchAvailableResources = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = await getToken({ template: 'session_token' });
            console.log("TOKEN-UL MEU:", token);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/available-resources`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setResources(data);
            }
        } catch (error) {
            console.error('Error fetching available resources:', error);
        } finally {
            setIsLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchAvailableResources();
        fetchActiveFleets();
    }, [fetchAvailableResources, fetchActiveFleets]);

    const handleAssemble = async (assemblyData: { driverId: number; truckId: number; trailerId: number }) => {
        try {
            const token = await getToken({ template : "session_token" });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/assemble-fleet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(assemblyData),
            });

            if (res.ok) {
                alert('Fleet assembled successfully!');
                fetchAvailableResources(); // Refresh available resources after assembly
                fetchActiveFleets(); // Refresh active fleets after assembly
            } else {
                const errorData = await res.json();
                alert(`Failed to assemble fleet: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error assembling fleet:', error);
            alert("Eroare de rețea!");
        }
    }

    const handleDisassemble = async (driverId: number) => {
      if (!window.confirm("Ești sigur că vrei să dezechipezi acest echipaj?")) return;

      try {
        const token = await getToken({ template: 'session_token' });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/disassemble-fleet/${driverId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (res.ok) {
          alert('Echipaj dezechipat cu succes!');
          fetchAvailableResources();
          fetchActiveFleets();
        } else {
          const errorData = await res.json();
          alert(`Eroare la dezechipare: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error disassembling fleet:', error);
        alert("Eroare de rețea!");
      }
    };


    const query = searchQuery.toLocaleLowerCase();

    const filteredDrivers = resources.drivers.filter((d: any) => d.name.toLocaleLowerCase().includes(query))

    const filteredTrucks = resources.trucks.filter((t: any) => t.model.toLocaleLowerCase().includes(query) || t.plate_number.toLocaleLowerCase().includes(query))

    const filteredTrailers = resources.trailers.filter((t: any) => t.plate_number.toLowerCase().includes(query) || (t.type && t.type.toLowerCase().includes(query)))

   return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased font-sans">
      {/* Sidebar-ul rămâne la locul lui */}
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Am șters Header-ul de aici */}

        {/* Adăugăm un padding-top puțin mai mare ca să compenseze lipsa header-ului */}
        <div className="flex-1 overflow-y-auto p-8 pt-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-slate-400 gap-2">
              <Icon icon="lucide:loader" className="animate-spin w-6 h-6" /> Se încarcă flota disponibilă...
            </div>
          ) : (
            <>
              {/* 1. Componenta de Asamblare */}
              <FleetAssemblyBoard 
                availableDrivers={filteredDrivers} 
                availableTrucks={filteredTrucks} 
                availableTrailers={filteredTrailers} 
                onAssemble={handleAssemble}
                onSearch={setSearchQuery} 
              />

              {/* 2. Secțiunea Echipaje Active (Tabelul) */}
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Icon icon="lucide:users" className="text-indigo-500" />
                  Echipaje Active pe Traseu
                </h2>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Șofer</th>
                        <th className="px-6 py-4">Cap Tractor</th>
                        <th className="px-6 py-4">Remorcă</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeFleets?.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                            Niciun echipaj activ. Formează unul mai sus!
                          </td>
                        </tr>
                      ) : (
                        activeFleets?.map((fleet: any) => (
                          <tr key={fleet.driver_id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                {fleet.driver_name.charAt(0)}
                              </div>
                              {fleet.driver_name}
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-700">{fleet.truck_plate}</td>
                            <td className="px-6 py-4 text-slate-500">{fleet.trailer_plate}</td>
                            <td className="px-6 py-4">
                              <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-medium border border-emerald-100">
                                {fleet.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-4">
                              <button 
                                onClick={() => { setFleetToEdit(fleet); setIsEditModalOpen(true); }}
                                className="text-indigo-600 hover:text-indigo-800 font-medium text-xs flex items-center gap-1 transition-colors"
                              >
                                <Icon icon="lucide:edit-3" className="w-4 h-4" /> Modifica
                              </button>
                              
                              <button 
                                onClick={() => handleDisassemble(fleet.driver_id)}
                                className="text-rose-500 hover:text-rose-700 font-medium text-xs flex items-center gap-1 transition-colors"
                              >
                                <Icon icon="lucide:trash-2" className="w-4 h-4" /> Desfiinteaza
                              </button>
                            </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Modalul pentru Editare (ascuns implicit) */}
              <EditFleetModal 
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setFleetToEdit(null); }}
                fleet={fleetToEdit}
                availableResources={resources}
                onSuccess={() => {
                   fetchAvailableResources();
                   fetchActiveFleets();
                }}
              />
            </>
          )}
          
        </div>
      </main>
    </div>
  );
}