// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '@clerk/nextjs';
// import { Icon } from '@iconify/react';


// const COLOR_PALETTE = [
//   { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', ring: 'ring-indigo-600' },
//   { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', ring: 'ring-rose-600' },
//   { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', ring: 'ring-amber-600' },
//   { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-600' },
//   { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', ring: 'ring-sky-600' },
//   { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', ring: 'ring-fuchsia-600' },
//   { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', ring: 'ring-orange-600' },
//   { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', ring: 'ring-teal-600' },
// ];

// const getColorForPlate = (plate: string) => {
//   if (!plate) return COLOR_PALETTE[0];
//   let hash = 0;
//   for (let i = 0; i < plate.length; i++) {
//     hash = plate.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   const index = Math.abs(hash) % COLOR_PALETTE.length;
//   return COLOR_PALETTE[index];
// };


// const getStatusAppearance = (status: string) => {
//   switch (status?.toLowerCase()) {
//     case 'available':
//       return { 
//         style: 'text-emerald-600 bg-emerald-50 border-emerald-100', 
//         label: 'AVAILABLE',
//         iconColor: 'text-emerald-600'
//       };
//     case 'in_transit':
//       return { 
//         style: 'text-indigo-600 bg-indigo-50 border-indigo-100', 
//         label: 'IN TRANSIT',
//         iconColor: 'text-indigo-600'
//       };
//     case 'maintenance':
//       return { 
//         style: 'text-amber-600 bg-amber-50 border-amber-100', 
//         label: 'MAINTENANCE',
//         iconColor: 'text-slate-400'
//       };
//     default:
//       return { 
//         style: 'text-slate-600 bg-slate-50 border-slate-100', 
//         label: status || 'UNKNOWN',
//         iconColor: 'text-slate-400'
//       };
//   }
// };

// export default function AdminDashboardPage() {
//   const { getToken } = useAuth();
//   const [trucks, setTrucks] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   const [activeFilter, setActiveFilter] = useState('All'); 
//   const filterOptions = ['All', 'Available', 'In Transit', 'Maintenance'];
  
//   const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);

//   const fetchDashboardData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = await getToken({ template: 'session_token' });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/dashboard`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setTrucks(data);
//         if (data.length > 0 && !selectedTruckId) {
//           setSelectedTruckId(data[0].id);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [getToken, selectedTruckId]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);


//   const filteredTrucks = trucks.filter(truck => {
//     const s = truck.status?.toLowerCase();
//     if (activeFilter === 'All') return true;
//     if (activeFilter === 'Available') return s === 'available';
//     if (activeFilter === 'In Transit') return s === 'in_transit';
//     if (activeFilter === 'Maintenance') return s === 'maintenance';
//     return true;
//   });

//   const selectedTruck = trucks.find(t => t.id === selectedTruckId);
//   const selectedTheme = selectedTruck ? getColorForPlate(selectedTruck.plate) : null;

//   return (
//     <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased font-sans">
//       <main className="flex-1 flex flex-col h-full overflow-hidden relative">
//         <div className="flex-1 overflow-hidden h-full w-full animate-in fade-in duration-300">
//           <div className="h-full grid grid-cols-1 lg:grid-cols-12 w-full">
            
            
//             <div className="lg:col-span-7 h-full flex flex-col border-r border-slate-200 bg-slate-50/50 overflow-hidden">
//               {/* Filtre */}
//               <div className="px-6 pt-6 pb-2 shrink-0">
//                 <div className="flex gap-2">
//                   {filterOptions.map((filter) => (
//                     <button 
//                       key={filter}
//                       onClick={() => setActiveFilter(filter)}
//                       className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-colors ${
//                         activeFilter === filter 
//                           ? 'bg-slate-900 text-white' 
//                           : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
//                       }`}
//                     >
//                       {filter}
//                     </button>
//                   ))}
//                 </div>
//               </div>

              
//               <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 pt-4 no-scrollbar">
//                 {isLoading ? (
//                   <div className="text-center text-slate-400 mt-10 flex flex-col items-center gap-2">
//                     <Icon icon="lucide:loader" className="animate-spin w-6 h-6" />
//                     Se încarcă datele...
//                   </div>
//                 ) : filteredTrucks.length === 0 ? (
//                   <div className="text-center text-slate-400 mt-10">Niciun vehicul găsit.</div>
//                 ) : (
//                   filteredTrucks.map((truck) => {
//                     const isSelected = selectedTruckId === truck.id;
//                     const theme = getColorForPlate(truck.plate);

//                     return (
//                       <div 
//                         key={truck.id}
//                         onClick={() => setSelectedTruckId(truck.id)}
//                         className={`bg-white rounded-xl p-4 border transition-all cursor-pointer flex justify-between items-center ${
//                           isSelected 
//                             ? `${theme.border} ring-1 ${theme.ring} shadow-md` 
//                             : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
//                         }`}
//                       >
//                         <div className="flex gap-4 items-center">
//                           {/* Iconiță Colorată */}
//                           <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border ${theme.bg} ${theme.text} border-white shadow-sm`}>
//                             <Icon icon="solar:delivery-bold-duotone" width="28" />
//                           </div>
                          
//                           <div>
//                             <h3 className="text-base font-bold text-slate-900">{truck.model}</h3>
//                             <div className="flex items-center gap-2 mt-1">
//                                <span className="text-[12px] font-semibold text-slate-500 tracking-wide">{truck.plate}</span>
//                                <span className="text-slate-300">•</span>
//                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border ${
//                                  truck.status?.toLowerCase() === 'maintenance' 
//                                   ? 'bg-slate-100 text-slate-500 border-slate-200' 
//                                   : `${theme.bg} ${theme.text} ${theme.border}`
//                                }`}>
//                                  {truck.status}
//                                </span>
//                             </div>
//                           </div>
//                         </div>

                       
//                         <div className="text-right flex flex-col items-end gap-1">
//                           {truck.driver ? (
//                              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
//                                <Icon icon="solar:user-bold" className="text-slate-400" />
//                                {truck.driver.name.split(' ')[0]} {/* Afișăm doar prenumele pt spațiu */}
//                              </div>
//                           ) : (
//                              <div className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">Fără șofer</div>
//                           )}

//                           {truck.trailer ? (
//                              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
//                                <Icon icon="solar:box-minimalistic-bold" className="text-slate-400" />
//                                {truck.trailer.plate}
//                              </div>
//                           ) : (
//                              <div className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">Fără remorcă</div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </div>

            
//             <div className="lg:col-span-5 h-full bg-white border-l border-slate-200 flex flex-col overflow-y-auto hidden lg:flex relative">
//               {selectedTruck && selectedTheme && (
//                 <div className="p-8">
//                   <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
//                     <div>
//                       <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Configurație Curentă</h2>
//                       <p className="text-xs text-slate-500 mt-1">{selectedTruck.plate} • {selectedTruck.model}</p>
//                     </div>
//                   </div>
                  
//                   <div className="relative pl-6 border-l-2 border-slate-100 space-y-10">
                    
//                     {/* Nodul Camion */}
//                     <div className="relative">
//                       <span className={`absolute -left-[29px] top-1 h-5 w-5 rounded-full ${selectedTheme.bg} border-[4px] border-white shadow-sm flex items-center justify-center`}>
//                         <div className={`w-2 h-2 rounded-full ${selectedTheme.bg.replace('50', '500')}`}></div>
//                       </span>
                      
//                       <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Cap Tractor</h3>
//                       <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
//                         {selectedTruck.driver ? (
//                           <div className="flex items-center gap-4">
//                             <div className={`w-10 h-10 rounded-full ${selectedTheme.bg} ${selectedTheme.text} flex items-center justify-center font-bold text-sm shadow-inner`}>
//                               {selectedTruck.driver.name.charAt(0)}
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-sm font-bold text-slate-900">{selectedTruck.driver.name}</p>
//                               <p className="text-[11px] text-slate-500 font-medium mt-0.5">ID Angajat: {selectedTruck.driver.id}</p>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
//                               <Icon icon="solar:user-linear" width="20" className="text-slate-400" />
//                             </div>
//                             <p className="text-sm font-semibold text-slate-500">Acest camion nu are șofer alocat.</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Nodul Remorcă */}
//                     <div className="relative">
//                        <span className={`absolute -left-[29px] top-1 h-5 w-5 rounded-full bg-slate-100 border-[4px] border-white shadow-sm flex items-center justify-center`}>
//                         <div className="w-2 h-2 rounded-full bg-slate-400"></div>
//                       </span>
                      
//                       <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Remorcă Atașată</h3>
//                       <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
//                         {selectedTruck.trailer ? (
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
//                               <Icon icon="solar:box-bold-duotone" width="24" className="text-slate-600" />
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-sm font-bold text-slate-900">{selectedTruck.trailer.plate}</p>
//                               <p className="text-[11px] text-slate-500 font-medium mt-0.5">Capacitate: {selectedTruck.trailer.capacity}</p>
//                             </div>
//                           </div>
//                         ) : (
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center border-dashed">
//                               <Icon icon="solar:box-linear" width="20" className="text-slate-300" />
//                             </div>
//                             <p className="text-sm font-semibold text-slate-500">Nicio remorcă atașată.</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                   </div>
                  
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Icon } from '@iconify/react';

const COLOR_PALETTE = [
  { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', ring: 'ring-indigo-600' },
  { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', ring: 'ring-rose-600' },
  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', ring: 'ring-amber-600' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-600' },
  { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', ring: 'ring-sky-600' },
  { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', ring: 'ring-fuchsia-600' },
  { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', ring: 'ring-orange-600' },
  { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', ring: 'ring-teal-600' },
];

const getColorForPlate = (plate: string) => {
  if (!plate) return COLOR_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < plate.length; i++) {
    hash = plate.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
};

const getStatusAppearance = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return { 
        style: 'text-emerald-600 bg-emerald-50 border-emerald-100', 
        label: 'AVAILABLE',
        iconColor: 'text-emerald-600'
      };
    case 'in_transit':
      return { 
        style: 'text-indigo-600 bg-indigo-50 border-indigo-100', 
        label: 'IN TRANSIT',
        iconColor: 'text-indigo-600'
      };
    case 'maintenance':
      return { 
        style: 'text-amber-600 bg-amber-50 border-amber-100', 
        label: 'MAINTENANCE',
        iconColor: 'text-slate-400'
      };
    default:
      return { 
        style: 'text-slate-600 bg-slate-50 border-slate-100', 
        label: status || 'UNKNOWN',
        iconColor: 'text-slate-400'
      };
  }
};

export default function AdminDashboardPage() {
  const { getToken } = useAuth();
  const [trucks, setTrucks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeFilter, setActiveFilter] = useState('All'); 
  const filterOptions = ['All', 'Available', 'In Transit', 'Maintenance'];
  
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: 'session_token' });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTrucks(data);
        if (data.length > 0 && !selectedTruckId) {
          setSelectedTruckId(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken, selectedTruckId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const filteredTrucks = trucks.filter(truck => {
    const s = truck.status?.toLowerCase();
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Available') return s === 'available';
    if (activeFilter === 'In Transit') return s === 'in_transit';
    if (activeFilter === 'Maintenance') return s === 'maintenance';
    return true;
  });

  const selectedTruck = trucks.find(t => t.id === selectedTruckId);
  const selectedTheme = selectedTruck ? getColorForPlate(selectedTruck.plate) : null;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased font-sans">
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-hidden h-full w-full animate-in fade-in duration-300">
          <div className="h-full grid grid-cols-1 lg:grid-cols-12 w-full">
            
            {/* LEFT PANEL: Fleet List */}
            <div className="lg:col-span-7 h-full flex flex-col border-r border-slate-200 bg-slate-50/50 overflow-hidden">
              <div className="px-6 pt-6 pb-2 shrink-0">
                <div className="flex gap-2">
                  {filterOptions.map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-colors ${
                        activeFilter === filter 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 pt-4 no-scrollbar">
                {isLoading ? (
                  <div className="text-center text-slate-400 mt-10 flex flex-col items-center gap-2">
                    <Icon icon="lucide:loader" className="animate-spin w-6 h-6" />
                    Loading data...
                  </div>
                ) : filteredTrucks.length === 0 ? (
                  <div className="text-center text-slate-400 mt-10">No vehicles found.</div>
                ) : (
                  filteredTrucks.map((truck) => {
                    const isSelected = selectedTruckId === truck.id;
                    const theme = getColorForPlate(truck.plate);

                    return (
                      <div 
                        key={truck.id}
                        onClick={() => setSelectedTruckId(truck.id)}
                        className={`bg-white rounded-xl p-4 border transition-all cursor-pointer flex justify-between items-center ${
                          isSelected 
                            ? `${theme.border} ring-1 ${theme.ring} shadow-md` 
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex gap-4 items-center">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border ${theme.bg} ${theme.text} border-white shadow-sm`}>
                            <Icon icon="solar:delivery-bold-duotone" width="28" />
                          </div>
                          
                          <div>
                            <h3 className="text-base font-bold text-slate-900">{truck.model}</h3>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-[12px] font-semibold text-slate-500 tracking-wide">{truck.plate}</span>
                               <span className="text-slate-300">•</span>
                               <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border ${
                                 truck.status?.toLowerCase() === 'maintenance' 
                                  ? 'bg-slate-100 text-slate-500 border-slate-200' 
                                  : `${theme.bg} ${theme.text} ${theme.border}`
                               }`}>
                                 {truck.status}
                               </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1">
                          {truck.driver ? (
                             <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                               <Icon icon="solar:user-bold" className="text-slate-400" />
                               {truck.driver.name.split(' ')[0]}
                             </div>
                          ) : (
                             <div className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">No Driver</div>
                          )}

                          {truck.trailer ? (
                             <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                               <Icon icon="solar:box-minimalistic-bold" className="text-slate-400" />
                               {truck.trailer.plate}
                             </div>
                          ) : (
                             <div className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">No Trailer</div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Configuration */}
            <div className="lg:col-span-5 h-full bg-white border-l border-slate-200 flex flex-col overflow-y-auto hidden lg:flex relative">
              {selectedTruck && selectedTheme && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Current Configuration</h2>
                      <p className="text-xs text-slate-500 mt-1">{selectedTruck.plate} • {selectedTruck.model}</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-slate-100 space-y-10">
                    
                    {/* Truck Node */}
                    <div className="relative">
                      <span className={`absolute -left-[29px] top-1 h-5 w-5 rounded-full ${selectedTheme.bg} border-[4px] border-white shadow-sm flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full ${selectedTheme.bg.replace('50', '500')}`}></div>
                      </span>
                      
                      <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Truck Unit</h3>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        {selectedTruck.driver ? (
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${selectedTheme.bg} ${selectedTheme.text} flex items-center justify-center font-bold text-sm shadow-inner`}>
                              {selectedTruck.driver.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-900">{selectedTruck.driver.name}</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Employee ID: {selectedTruck.driver.id}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                              <Icon icon="solar:user-linear" width="20" className="text-slate-400" />
                            </div>
                            <p className="text-sm font-semibold text-slate-500">No driver is currently assigned.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Trailer Node */}
                    <div className="relative">
                       <span className={`absolute -left-[29px] top-1 h-5 w-5 rounded-full bg-slate-100 border-[4px] border-white shadow-sm flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                      </span>
                      
                      <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">Attached Trailer</h3>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        {selectedTruck.trailer ? (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                              <Icon icon="solar:box-bold-duotone" width="24" className="text-slate-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-slate-900">{selectedTruck.trailer.plate}</p>
                              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Capacity: {selectedTruck.trailer.capacity}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center border-dashed">
                              <Icon icon="solar:box-linear" width="20" className="text-slate-300" />
                            </div>
                            <p className="text-sm font-semibold text-slate-500">No trailer attached.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}