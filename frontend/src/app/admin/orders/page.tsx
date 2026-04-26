// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Icon } from '@iconify/react';
// import { useAuth } from '@clerk/nextjs';

// import NewOrderModal from '../../../components/admin/NewOrderModal';
// import EditOrderModal from '../../../components/admin/EditOrderModal';
// import DeleteModal from '../../../components/admin/trucks/DeleteModal';

// interface Order {
//   id: number;
//   description: string;
//   weight_kg: number;
//   required_trailer_type: string | null;
//   status: string;
//   created_at: string;
//   pickup_lat?: number;
//   pickup_lng?: number;
//   delivery_lat?: number;
//   delivery_lng?: number;
//   pickup_deadline?: string;
//   delivery_deadline?: string;
// }

// export default function OrdersPage() {
//   const { getToken } = useAuth();
  
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Stări pentru Filtrare
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
  
//   // Stări pentru Modale
//   const [isNewModalOpen, setIsNewModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
//   const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

//   const fetchOrders = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) setOrders(await res.json());
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [getToken]);

//   useEffect(() => { fetchOrders(); }, [fetchOrders]);

//   // Logica elegantă de ștergere legată la DeleteModal
//   const confirmDelete = async () => {
//     if (!orderToDelete) return;
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${orderToDelete.id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         fetchOrders();
//         setOrderToDelete(null); // Închidem modalul automat
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Eroare de rețea la ștergere!");
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = order.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                           order.id.toString().includes(searchQuery);
//     const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'in_transit': return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">In Transit</span>;
//       case 'completed': return <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-100">Completed</span>;
//       case 'assigned': return <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-purple-100">Assigned</span>;
//       default: return <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-100">Pending</span>;
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      
//       {/* TOOLBAR */}
//       <div className="px-6 pt-6 pb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-4 border-b border-slate-200 bg-white">
//         <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Orders</h2>
        
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
//           <select 
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] text-slate-700 font-medium cursor-pointer"
//           >
//             <option value="ALL">Toate Statusurile</option>
//             <option value="pending">Pending</option>
//             <option value="assigned">Assigned</option>
//             <option value="in_transit">In Transit</option>
//             <option value="completed">Completed</option>
//           </select>

//           <div className="relative w-full sm:w-64">
//             <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
//             <input 
//               type="text" 
//               placeholder="Caută comandă sau ID..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] transition-all w-full" 
//             />
//           </div>

//           {/* Buton care deschide modalul de New Order */}
//           <button 
//             onClick={() => setIsNewModalOpen(true)}
//             className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto whitespace-nowrap justify-center"
//           >
//             <Icon icon="solar:add-circle-linear" width="16" /> New Order
//           </button>
//         </div>
//       </div>

//       {/* GRID COMENZI */}
//       <div className="flex-1 overflow-auto p-6 pt-6">
//         {isLoading ? (
//           <div className="flex justify-center py-10 text-slate-400 gap-2">
//             <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Se încarcă comenzile...
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
//             Nu s-a găsit nicio comandă.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//             {filteredOrders.map((order) => (
//               <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
                
//                 <div className="flex justify-between items-start">
//                   <h3 className="text-sm font-bold text-slate-900">#ORD-{order.id}</h3>
//                   {getStatusBadge(order.status)}
//                 </div>

//                 <div className="space-y-2 text-sm text-slate-600">
//                   <div className="flex items-center gap-2">
//                     <Icon icon="solar:box-linear" className="text-slate-400" />
//                     <span>{order.description}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Icon icon="solar:weight-linear" className="text-slate-400" />
//                     <span>{order.weight_kg} kg</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Icon icon="mdi:truck-trailer" className="text-slate-400" />
//                     <span className="capitalize">Remorcă: {order.required_trailer_type || "Nespecificat"}</span>
//                   </div>
//                 </div>

//                 <div className="border-t border-slate-100 pt-3 flex items-center justify-end gap-2 mt-auto">
                  
//                   {/* Buton de Editare */}
//                   <button 
//                     onClick={() => { setOrderToEdit(order); setIsEditModalOpen(true); }}
//                     className="p-1.5 text-slate-400 hover:text-[#5465FF] rounded transition-colors" 
//                     title="Editează"
//                   >
//                     <Icon icon="solar:pen-new-square-linear" width="18" />
//                   </button>

//                   {/* Buton de Ștergere */}
//                   <button 
//                     onClick={() => setOrderToDelete(order)}
//                     className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors" 
//                     title="Șterge"
//                   >
//                     <Icon icon="solar:trash-bin-trash-linear" width="18" />
//                   </button>

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* RENDERIZARE MODALE */}
//       <NewOrderModal 
//         isOpen={isNewModalOpen} 
//         onClose={() => setIsNewModalOpen(false)} 
//         onSuccess={fetchOrders} 
//       />
      
//       <EditOrderModal 
//         isOpen={isEditModalOpen} 
//         onClose={() => setIsEditModalOpen(false)} 
//         onSuccess={fetchOrders} 
//         orderToEdit={orderToEdit} 
//       />

//       <DeleteModal 
//         isOpen={orderToDelete !== null} 
//         onClose={() => setOrderToDelete(null)} 
//         onConfirm={confirmDelete} 
//         itemName={orderToDelete ? `comanda #ORD-${orderToDelete.id}` : ""} 
//       />

//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';

import NewOrderModal from '../../../components/admin/NewOrderModal';
import EditOrderModal from '../../../components/admin/EditOrderModal';
import DeleteModal from '../../../components/admin/trucks/DeleteModal';

interface Order {
  id: number;
  description: string;
  weight_kg: number;
  required_trailer_type: string | null;
  status: string;
  created_at: string;
  pickup_lat?: number;
  pickup_lng?: number;
  delivery_lat?: number;
  delivery_lng?: number;
  pickup_deadline?: string;
  delivery_deadline?: string;
}

export default function OrdersPage() {
  const { getToken } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setOrders(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${orderToDelete.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchOrders();
        setOrderToDelete(null);
      }
    } catch (error) {
      console.error(error);
      alert("Network error during deletion!");
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toString().includes(searchQuery);
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'in_transit': return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">In Transit</span>;
      case 'completed': return <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-emerald-100">Completed</span>;
      case 'assigned': return <span className="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-purple-100">Assigned</span>;
      default: return <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-100">Pending</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      
      <div className="px-6 pt-6 pb-4 flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-4 border-b border-slate-200 bg-white">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Orders</h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] text-slate-700 font-medium cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_transit">In Transit</option>
            <option value="completed">Completed</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
            <input 
              type="text" 
              placeholder="Search order or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] transition-all w-full" 
            />
          </div>

          <button 
            onClick={() => setIsNewModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto whitespace-nowrap justify-center"
          >
            <Icon icon="solar:add-circle-linear" width="16" /> New Order
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 pt-6">
        {isLoading ? (
          <div className="flex justify-center py-10 text-slate-400 gap-2">
            <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
            No orders found.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
                
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-slate-900">#ORD-{order.id}</h3>
                  {getStatusBadge(order.status)}
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:box-linear" className="text-slate-400" />
                    <span>{order.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="solar:weight-linear" className="text-slate-400" />
                    <span>{order.weight_kg} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:truck-trailer" className="text-slate-400" />
                    <span className="capitalize">Trailer: {order.required_trailer_type || "Unspecified"}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-end gap-2 mt-auto">
                  
                  <button 
                    onClick={() => { setOrderToEdit(order); setIsEditModalOpen(true); }}
                    className="p-1.5 text-slate-400 hover:text-[#5465FF] rounded transition-colors" 
                    title="Edit"
                  >
                    <Icon icon="solar:pen-new-square-linear" width="18" />
                  </button>

                  <button 
                    onClick={() => setOrderToDelete(order)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors" 
                    title="Delete"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" width="18" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <NewOrderModal 
        isOpen={isNewModalOpen} 
        onClose={() => setIsNewModalOpen(false)} 
        onSuccess={fetchOrders} 
      />
      
      <EditOrderModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSuccess={fetchOrders} 
        orderToEdit={orderToEdit} 
      />

      <DeleteModal 
        isOpen={orderToDelete !== null} 
        onClose={() => setOrderToDelete(null)} 
        onConfirm={confirmDelete} 
        itemName={orderToDelete ? `order #ORD-${orderToDelete.id}` : ""} 
      />

    </div>
  );
}