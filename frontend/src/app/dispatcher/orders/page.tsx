'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Icon } from '@iconify/react';
import Sidebar from '../../../components/dispatcher/Sidebar';
import AssignOrderModal from '../../../components/dispatcher/AssignOrderModal';
import OrderModal from '../../../components/dispatcher/OrderModal'; // Asigură-te că importul e corect

export default function OrdersPage() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState<any | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [orderToAssign, setOrderToAssign] = useState<any | null>(null);

  const openAssignModal = (order: any) => { 
    setOrderToAssign(order); 
    setIsAssignModalOpen(true); 
  };

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: 'session_token' });
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleDelete = async (id: number) => {
    if (!confirm("Sigur vrei să ștergi această comandă?")) return;
    try {
      const token = await getToken({ template: 'session_token' });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const openAddModal = () => { setOrderToEdit(null); setIsModalOpen(true); };
  const openEditModal = (order: any) => { setOrderToEdit(order); setIsModalOpen(true); };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden text-slate-800 antialiased font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Load Board</h1>
              <p className="text-sm text-slate-500 mt-1">Manage goods and prepare them for dispatch.</p>
            </div>
            <button onClick={openAddModal} className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
              <Icon icon="solar:add-circle-bold" width="20" /> Add Order
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-slate-500"><Icon icon="lucide:loader" className="animate-spin" /> Loading...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Icon icon="solar:box-minimalistic-linear" width="32" className="text-slate-400" /></div>
               <h3 className="text-lg font-bold text-slate-800">You have no active orders</h3>
               <p className="text-slate-500 text-sm mt-2">Click on "Add Order" to create your first shipment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <div className="flex items-center gap-3 mb-2">
                           <span className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                             order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                             order.status === 'assigned' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' :
                             order.status === 'in_transit' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                             'bg-emerald-50 text-emerald-600 border-emerald-200'
                           }`}>
                             {order.status === 'pending' ? 'Pending' : order.status}
                           </span>
                           
                           
                           {order.status === 'pending' && (
                             <button 
                               onClick={() => openAssignModal(order)}
                               className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-md hover:bg-indigo-600 transition-colors flex items-center gap-1"
                             >
                               <Icon icon="solar:routing-bold" /> Assign Team
                             </button>
                           )}
                       </div>
                       <h3 className="text-lg font-bold text-slate-900">{order.description}</h3>
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => openEditModal(order)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Icon icon="solar:pen-new-square-linear" width="20" /></button>
                        <button onClick={() => handleDelete(order.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Icon icon="solar:trash-bin-trash-linear" width="20" /></button>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4">
                     <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                       <p className="text-sm font-bold text-slate-800">{order.weight_kg.toLocaleString()} kg</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trailer Type</p>
                       <p className="text-sm font-bold text-slate-800 capitalize">{order.required_trailer_type}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>    
      </main>
      <AssignOrderModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} onSuccess={fetchOrders} orderToAssign={orderToAssign} />
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchOrders} orderToEdit={orderToEdit} />
    </div>
  );
}