// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Icon } from '@iconify/react';
// import AddTruckModal from '@/src/components/admin/trucks/AddTruckModel';
// import DeleteModal from '@/src/components/admin/trucks/DeleteModal';
// import { useAuth } from '@clerk/nextjs';

// interface Truck {
//   id: number;
//   plate_number: string;
//   model: string;
//   own_weight_kg: number;
//   status: 'available' | 'in_transit' | 'maintenance';
//   driver_id: number | null;
//   trailer_id: number | null;
// }

// export default function FleetPage() {
//   const { getToken } = useAuth();
  
//   // Stările pentru date
//   const [trucks, setTrucks] = useState<Truck[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Starea pentru CĂUTARE (Search)
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All"); // 'All', 'available', 'in_transit', 'maintenance'

//   // Stările pentru Modale
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
//   const [truckToDelete, setTruckToDelete] = useState<Truck | null>(null);

//   // Tab-urile pe care le vom afișa
//   const TABS = [
//     { label: "All", value: "All" },
//     { label: "Active", value: "available" },
//     { label: "In Transit", value: "in_transit" },
//     { label: "Maintenance", value: "maintenance" },
//   ];

//   // Funcție de helper pentru a desena statusul corect colorat
//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'available': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">Available</span>;
//       case 'in_transit': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">In Transit</span>;
//       case 'maintenance': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-600 border border-rose-100">Maintenance</span>;
//       default: return null;
//     }
//   };

//   const fetchTrucks = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) setTrucks(await res.json());
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [getToken]);

//   useEffect(() => {
//     fetchTrucks();
//   }, [fetchTrucks]);

//   const confirmDelete = async () => {
//     if (!truckToDelete) return;
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/${truckToDelete.id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         fetchTrucks();
//         setTruckToDelete(null);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // LOGICA DUBLĂ DE FILTRARE (Tab-uri + Căutare text)
//   const filteredTrucks = trucks.filter(truck => {
//     const matchesSearch = truck.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) || truck.model.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTab = activeTab === "All" || truck.status === activeTab;
//     return matchesSearch && matchesTab;
//   });

//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
//       {/* TOOLBAR SECUNDAR */}
//       <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
        
//         {/* BUTOANELE TALE DE TAB-URI AICI */}
//         <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
//           {TABS.map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveTab(tab.value)}
//               className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
//                 activeTab === tab.value 
//                   ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
//                   : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
//               }`}
//             >
//               {tab.label}
//               {/* Opțional: Numărăm câte camioane sunt în fiecare status */}
//               <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === tab.value ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-500"}`}>
//                 {tab.value === "All" ? trucks.length : trucks.filter(t => t.status === tab.value).length}
//               </span>
//             </button>
//           ))}
//         </div>
        
//         {/* Acțiunile aliniate la dreapta */}
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           {/* BARA DE CĂUTARE */}
//           <div className="relative flex-1 sm:flex-none">
//             <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
//             <input 
//               type="text" 
//               placeholder="Caută număr sau model..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] focus:shadow-sm transition-all w-full sm:w-64"
//             />
//           </div>

//           <button 
//             onClick={() => { setEditingTruck(null); setIsModalOpen(true); }}
//             className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm whitespace-nowrap"
//           >
//             <Icon icon="solar:add-circle-linear" width="16" /> Add Vehicle
//           </button>
//         </div>
//       </div>

//       {/* TABEL */}
//       <div className="flex-1 overflow-auto p-6">
//         <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//           <thead className="bg-slate-50">
//             <tr className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
//               <th className="py-3 px-4">Vehicle</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4">Driver</th>
//               <th className="py-3 px-4">Location</th>
//               <th className="py-3 px-4">Trailer</th> 
//               <th className="py-3 px-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-xs text-slate-600 divide-y divide-slate-100">
            
//             {isLoading && (
//               <tr>
//                 <td colSpan={6} className="py-8 text-center text-slate-400">
//                   <div className="flex items-center justify-center gap-2">
//                     <Icon icon="solar:spinner-linear" className="animate-spin" width="20" /> Încărcare...
//                   </div>
//                 </td>
//               </tr>
//             )}

//             {!isLoading && trucks.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="py-8 text-center text-slate-400">Nu ai niciun camion în flotă.</td>
//               </tr>
//             )}

//             {!isLoading && trucks.length > 0 && filteredTrucks.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="py-8 text-center text-slate-400">
//                   Nu am găsit niciun rezultat pentru <span className="font-semibold text-slate-700">"{searchQuery}"</span>.
//                 </td>
//               </tr>
//             )}

//             {!isLoading && filteredTrucks.map((truck) => (
//               <tr key={truck.id} className="hover:bg-slate-50 transition-colors group">
//                 {/* 1. VEHICLE */}
//                 <td className="py-3 px-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center">
//                       <Icon icon="lucide:truck" width="16" className="text-slate-700" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-slate-900">{truck.plate_number}</p>
//                       <p className="text-[10px] text-slate-400">{truck.model} • {truck.own_weight_kg} kg</p>
//                     </div>
//                   </div>
//                 </td>

//                 {/* 2. STATUS */}
//                 <td className="py-3 px-4">
//                   {getStatusBadge(truck.status)}
//                 </td>
                
//                 {/* 3. DRIVER */}
//                 <td className="py-3 px-4">
//                   {truck.driver_id ? <span className="text-slate-900">ID: {truck.driver_id}</span> : <span className="text-slate-400 italic">Not Assigned</span>}
//                 </td>
                
//                 {/* 4. LOCATION */}
//                 <td className="py-3 px-4">
//                   <span className="text-slate-400 italic">Not Assigned</span>
//                 </td>

//                 {/* 5. TRAILER */}
//                 <td className="py-3 px-4">
//                   {truck.trailer_id ? <span className="text-slate-900">ID: {truck.trailer_id}</span> : <span className="text-slate-400 italic">Not Assigned</span>}
//                 </td>

//                 {/* 6. ACTIONS */}
//                 <td className="py-3 px-4 text-right">
//                   <button onClick={() => { setEditingTruck(truck); setIsModalOpen(true); }} className="text-slate-400 hover:text-[#5465FF] mx-1 transition-colors">
//                     <Icon icon="solar:pen-new-square-linear" width="16" />
//                   </button>
//                   <button onClick={() => setTruckToDelete(truck)} className="text-slate-400 hover:text-red-500 mx-1 transition-colors">
//                     <Icon icon="solar:trash-bin-trash-linear" width="16" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
            
//           </tbody>
//         </table>
//       </div>

//       <AddTruckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchTrucks} truckToEdit={editingTruck} />
//       <DeleteModal isOpen={truckToDelete !== null} onClose={() => setTruckToDelete(null)} onConfirm={confirmDelete} itemName={truckToDelete ? `camionul ${truckToDelete.plate_number}` : ""} />
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import AddTruckModal from '@/src/components/admin/trucks/AddTruckModel';
import DeleteModal from '@/src/components/admin/trucks/DeleteModal';
import { useAuth } from '@clerk/nextjs';

interface Truck {
  id: number;
  plate_number: string;
  model: string;
  own_weight_kg: number;
  status: 'available' | 'in_transit' | 'maintenance';
  driver_id: number | null;
  trailer_id: number | null;
}

export default function FleetPage() {
  const { getToken } = useAuth();
  
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [truckToDelete, setTruckToDelete] = useState<Truck | null>(null);

  const TABS = [
    { label: "All", value: "All" },
    { label: "Active", value: "available" },
    { label: "In Transit", value: "in_transit" },
    { label: "Maintenance", value: "maintenance" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">Available</span>;
      case 'in_transit': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-100">In Transit</span>;
      case 'maintenance': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-600 border border-rose-100">Maintenance</span>;
      default: return null;
    }
  };

  const fetchTrucks = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setTrucks(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchTrucks();
  }, [fetchTrucks]);

  const confirmDelete = async () => {
    if (!truckToDelete) return;
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/${truckToDelete.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTrucks();
        setTruckToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.plate_number.toLowerCase().includes(searchQuery.toLowerCase()) || truck.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || truck.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                activeTab === tab.value 
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] ${activeTab === tab.value ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-500"}`}>
                {tab.value === "All" ? trucks.length : trucks.filter(t => t.status === tab.value).length}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
            <input 
              type="text" 
              placeholder="Search plate or model..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] focus:shadow-sm transition-all w-full sm:w-64"
            />
          </div>

          <button 
            onClick={() => { setEditingTruck(null); setIsModalOpen(true); }}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm whitespace-nowrap"
          >
            <Icon icon="solar:add-circle-linear" width="16" /> Add Vehicle
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Vehicle</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Driver</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Trailer</th> 
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 divide-y divide-slate-100">
            
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Icon icon="solar:spinner-linear" className="animate-spin" width="20" /> Loading...
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && trucks.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">You don't have any trucks in your fleet.</td>
              </tr>
            )}

            {!isLoading && trucks.length > 0 && filteredTrucks.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No results found for <span className="font-semibold text-slate-700">"{searchQuery}"</span>.
                </td>
              </tr>
            )}

            {!isLoading && filteredTrucks.map((truck) => (
              <tr key={truck.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center">
                      <Icon icon="lucide:truck" width="16" className="text-slate-700" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{truck.plate_number}</p>
                      <p className="text-[10px] text-slate-400">{truck.model} • {truck.own_weight_kg} kg</p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  {getStatusBadge(truck.status)}
                </td>
                
                <td className="py-3 px-4">
                  {truck.driver_id ? <span className="text-slate-900">ID: {truck.driver_id}</span> : <span className="text-slate-400 italic">Not Assigned</span>}
                </td>
                
                <td className="py-3 px-4">
                  <span className="text-slate-400 italic">Not Assigned</span>
                </td>

                <td className="py-3 px-4">
                  {truck.trailer_id ? <span className="text-slate-900">ID: {truck.trailer_id}</span> : <span className="text-slate-400 italic">Not Assigned</span>}
                </td>

                <td className="py-3 px-4 text-right">
                  <button onClick={() => { setEditingTruck(truck); setIsModalOpen(true); }} className="text-slate-400 hover:text-[#5465FF] mx-1 transition-colors">
                    <Icon icon="solar:pen-new-square-linear" width="16" />
                  </button>
                  <button onClick={() => setTruckToDelete(truck)} className="text-slate-400 hover:text-red-500 mx-1 transition-colors">
                    <Icon icon="solar:trash-bin-trash-linear" width="16" />
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      <AddTruckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchTrucks} truckToEdit={editingTruck} />
      <DeleteModal isOpen={truckToDelete !== null} onClose={() => setTruckToDelete(null)} onConfirm={confirmDelete} itemName={truckToDelete ? `truck ${truckToDelete.plate_number}` : ""} />
    </div>
  );
}