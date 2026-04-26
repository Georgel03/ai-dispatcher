// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Icon } from '@iconify/react';
// import EditDriverModal from '../../../components/admin/EditDriverModal';
// import DeleteModal from '../../../components/admin/trucks/DeleteModal';
// import { useAuth } from '@clerk/nextjs';


// interface Driver {
//   id: number;
//   name: string | null;
//   phone: string | null;
//   email?: string; 
//   status: string;
//   assigned_truck: string | null;
// }

// export default function DriversPage() {
//   const { getToken } = useAuth();
  
//   const [drivers, setDrivers] = useState<Driver[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Stări pentru filtre
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterCriteria, setFilterCriteria] = useState("ALL"); // ALL, ASSIGNED, UNASSIGNED, ACTIVE, OFF_DUTY
  
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [driverToEdit, setDriverToEdit] = useState<Driver | null>(null);
//   const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);

//   const fetchDrivers = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/drivers`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setDrivers(data);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [getToken]);

//   useEffect(() => { fetchDrivers(); }, [fetchDrivers]);

//   const confirmDelete = async () => {
//     if (!driverToDelete) return;
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/drivers/${driverToDelete.id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         fetchDrivers();
//         setDriverToDelete(null);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

  
//   const filteredDrivers = drivers.filter(driver => {
    
//     const term = searchQuery.toLowerCase();
//     const nameMatch = driver.name ? driver.name.toLowerCase().includes(term) : false;
//     const phoneMatch = driver.phone ? driver.phone.includes(term) : false;
//     const passesSearch = nameMatch || phoneMatch;

   
//     let passesFilter = true;
//     if (filterCriteria === "ASSIGNED") passesFilter = driver.assigned_truck !== null;
//     if (filterCriteria === "UNASSIGNED") passesFilter = driver.assigned_truck === null;
//     if (filterCriteria === "ACTIVE") passesFilter = driver.status === "active";
//     if (filterCriteria === "OFF_DUTY") passesFilter = driver.status === "off_duty";

//     return passesSearch && passesFilter;
//   });

 
//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'active': return <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">On Duty</span>;
//       case 'resting': return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Resting</span>;
//       default: return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Off Duty</span>;
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      
//       <div className="px-6 pt-6 pb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-4 border-b border-slate-200 bg-white">
//         <h2 className="text-xl font-bold text-slate-900 tracking-tight">Driver Roster</h2>
        
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
//           <select 
//             value={filterCriteria}
//             onChange={(e) => setFilterCriteria(e.target.value)}
//             className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] text-slate-700 font-medium cursor-pointer"
//           >
//             <option value="ALL">Toți Șoferii</option>
//             <option value="ASSIGNED">Cu Camion Asignat</option>
//             <option value="UNASSIGNED">Fără Camion</option>
//             <option value="ACTIVE">On Duty (Activi)</option>
//             <option value="OFF_DUTY">Off Duty (Inactivi)</option>
//           </select>

          
//           <div className="relative w-full sm:w-64">
//             <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
//             <input 
//               type="text" 
//               placeholder="Caută nume sau telefon..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] transition-all w-full" 
//             />
//           </div>
//         </div>
//       </div>

      
//       <div className="flex-1 overflow-auto p-6 pt-6">
//         {isLoading ? (
//           <div className="flex justify-center py-10 text-slate-400 gap-2">
//             <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Se încarcă șoferii...
//           </div>
//         ) : filteredDrivers.length === 0 ? (
//           <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
//             Niciun șofer nu corespunde filtreloare aplicate.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//             {filteredDrivers.map((driver) => (
//               <div key={driver.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all relative overflow-hidden">
                
//                 {/* Status Badge in the corner */}
//                 <div className="absolute top-4 right-4">
//                   {getStatusBadge(driver.status)}
//                 </div>
                
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
//                     {driver.name ? driver.name.charAt(0).toUpperCase() : <Icon icon="solar:user-bold" width="24" />}
//                   </div>
//                   <div className="flex-1 min-w-0 pr-16">
//                     <h3 className="text-sm font-bold text-slate-900 truncate">{driver.name || "Nume Nesetat"}</h3>
//                     <p className="text-xs text-slate-500 truncate">{driver.email || "Fără Email"}</p>
//                   </div>
//                 </div>

//                 {/* Truck Assignment Badge */}
//                 <div>
//                   {driver.assigned_truck ? (
//                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold border border-slate-200">
//                       <Icon icon="mdi:truck-outline" width="14" />
//                       Asignat: {driver.assigned_truck}
//                     </div>
//                   ) : (
//                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-md text-[11px] font-semibold border border-red-100">
//                       <Icon icon="solar:forbidden-circle-linear" width="14" />
//                       Neasignat
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t border-slate-100 pt-3 flex items-center justify-between mt-auto">
//                   <div className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
//                     <Icon icon="solar:phone-calling-linear" className="text-slate-400" width="16" /> 
//                     {driver.phone || "Lipsă telefon"}
//                   </div>
                  
//                   {/* Acțiuni */}
//                   <div className="flex gap-1">
//                     <button 
//                       onClick={() => { setDriverToEdit(driver); setIsEditModalOpen(true); }} 
//                       className="p-1.5 text-slate-400 hover:text-[#5465FF] hover:bg-indigo-50 rounded transition-colors"
//                       title="Editează datele"
//                     >
//                       <Icon icon="solar:pen-new-square-linear" width="16" />
//                     </button>
//                     <button 
//                       onClick={() => setDriverToDelete(driver)} 
//                       className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
//                       title="Șterge definitiv"
//                     >
//                       <Icon icon="solar:trash-bin-trash-linear" width="16" />
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <EditDriverModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={fetchDrivers} driverToEdit={driverToEdit} />
//       <DeleteModal isOpen={driverToDelete !== null} onClose={() => setDriverToDelete(null)} onConfirm={confirmDelete} itemName={driverToDelete ? `șoferul ${driverToDelete.name || 'fără nume'}` : ""} />
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import EditDriverModal from '../../../components/admin/EditDriverModal';
import DeleteModal from '../../../components/admin/trucks/DeleteModal';
import { useAuth } from '@clerk/nextjs';

interface Driver {
  id: number;
  name: string | null;
  phone: string | null;
  email?: string; 
  status: string;
  assigned_truck: string | null;
}

export default function DriversPage() {
  const { getToken } = useAuth();
  
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("ALL"); 
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [driverToEdit, setDriverToEdit] = useState<Driver | null>(null);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);

  const fetchDrivers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/drivers`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDrivers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => { fetchDrivers(); }, [fetchDrivers]);

  const confirmDelete = async () => {
    if (!driverToDelete) return;
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/drivers/${driverToDelete.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchDrivers();
        setDriverToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const term = searchQuery.toLowerCase();
    const nameMatch = driver.name ? driver.name.toLowerCase().includes(term) : false;
    const phoneMatch = driver.phone ? driver.phone.includes(term) : false;
    const passesSearch = nameMatch || phoneMatch;

    let passesFilter = true;
    if (filterCriteria === "ASSIGNED") passesFilter = driver.assigned_truck !== null;
    if (filterCriteria === "UNASSIGNED") passesFilter = driver.assigned_truck === null;
    if (filterCriteria === "ACTIVE") passesFilter = driver.status === "active";
    if (filterCriteria === "OFF_DUTY") passesFilter = driver.status === "off_duty";

    return passesSearch && passesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active': return <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">On Duty</span>;
      case 'resting': return <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Resting</span>;
      default: return <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Off Duty</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      
      <div className="px-6 pt-6 pb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-4 border-b border-slate-200 bg-white">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Driver Roster</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          <select 
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Drivers</option>
            <option value="ASSIGNED">Assigned to Truck</option>
            <option value="UNASSIGNED">Unassigned</option>
            <option value="ACTIVE">On Duty</option>
            <option value="OFF_DUTY">Off Duty</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
            <input 
              type="text" 
              placeholder="Search name or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] transition-all w-full" 
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 pt-6">
        {isLoading ? (
          <div className="flex justify-center py-10 text-slate-400 gap-2">
            <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Loading drivers...
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
            No drivers match the applied filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredDrivers.map((driver) => (
              <div key={driver.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all relative overflow-hidden">
                
                <div className="absolute top-4 right-4">
                  {getStatusBadge(driver.status)}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    {driver.name ? driver.name.charAt(0).toUpperCase() : <Icon icon="solar:user-bold" width="24" />}
                  </div>
                  <div className="flex-1 min-w-0 pr-16">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{driver.name || "Name Not Set"}</h3>
                    <p className="text-xs text-slate-500 truncate">{driver.email || "No Email"}</p>
                  </div>
                </div>

                <div>
                  {driver.assigned_truck ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-semibold border border-slate-200">
                      <Icon icon="mdi:truck-outline" width="14" />
                      Assigned: {driver.assigned_truck}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-md text-[11px] font-semibold border border-red-100">
                      <Icon icon="solar:forbidden-circle-linear" width="14" />
                      Unassigned
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between mt-auto">
                  <div className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                    <Icon icon="solar:phone-calling-linear" className="text-slate-400" width="16" /> 
                    {driver.phone || "No phone number"}
                  </div>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => { setDriverToEdit(driver); setIsEditModalOpen(true); }} 
                      className="p-1.5 text-slate-400 hover:text-[#5465FF] hover:bg-indigo-50 rounded transition-colors"
                      title="Edit details"
                    >
                      <Icon icon="solar:pen-new-square-linear" width="16" />
                    </button>
                    <button 
                      onClick={() => setDriverToDelete(driver)} 
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete permanently"
                    >
                      <Icon icon="solar:trash-bin-trash-linear" width="16" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <EditDriverModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSuccess={fetchDrivers} driverToEdit={driverToEdit} />
      <DeleteModal isOpen={driverToDelete !== null} onClose={() => setDriverToDelete(null)} onConfirm={confirmDelete} itemName={driverToDelete ? `driver ${driverToDelete.name || 'unnamed'}` : ""} />
    </div>
  );
}