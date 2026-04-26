'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

const OrderMap = dynamic(() => import('./OrderMap'), { 
  ssr: false, 
  loading: () => <div className="h-72 w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400 font-medium">Loading map...</div> 
});

export default function EditOrderModal({ isOpen, onClose, onSuccess, orderToEdit }: any) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    weight_kg: "",
    required_trailer_type: "",
    status: "",
    pickup_lat: "", pickup_lng: "",
    delivery_lat: "", delivery_lng: "",
    pickup_deadline: "", delivery_deadline: ""
  });

  const formatDateForInput = (isoString: string) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().slice(0, 16);
  };

  // Când se deschide modalul, încărcăm datele (inclusiv coordonatele primite de la backend)
  useEffect(() => {
    if (orderToEdit && isOpen) {
      setFormData({
        description: orderToEdit.description || "",
        weight_kg: orderToEdit.weight_kg?.toString() || "",
        required_trailer_type: orderToEdit.required_trailer_type || "prelata",
        status: orderToEdit.status || "pending",
        pickup_lat: orderToEdit.pickup_lat || "", 
        pickup_lng: orderToEdit.pickup_lng || "",
        delivery_lat: orderToEdit.delivery_lat || "", 
        delivery_lng: orderToEdit.delivery_lng || "",
        pickup_deadline: formatDateForInput(orderToEdit.pickup_deadline),
        delivery_deadline: formatDateForInput(orderToEdit.delivery_deadline)
      });
    }
  }, [orderToEdit, isOpen]);

  if (!isOpen || !orderToEdit) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      
      const payload: any = {
        description: formData.description,
        weight_kg: parseInt(formData.weight_kg),
        required_trailer_type: formData.required_trailer_type,
        status: formData.status,
      };

      // Trimitem coordonatele doar dacă sunt setate valide
      if (formData.pickup_lat && formData.pickup_lng) {
        payload.pickup_lat = parseFloat(formData.pickup_lat);
        payload.pickup_lng = parseFloat(formData.pickup_lng);
      }
      if (formData.delivery_lat && formData.delivery_lng) {
        payload.delivery_lat = parseFloat(formData.delivery_lat);
        payload.delivery_lng = parseFloat(formData.delivery_lng);
      }

      if (formData.pickup_deadline) payload.pickup_deadline = new Date(formData.pickup_deadline).toISOString();
      if (formData.delivery_deadline) payload.delivery_deadline = new Date(formData.delivery_deadline).toISOString();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${orderToEdit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const err = await res.json();
        alert(`Eroare la editare: ${JSON.stringify(err)}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="solar:pen-new-square-bold" className="text-[#5465FF]" width="20" />
            Edit Order #ORD-{orderToEdit.id}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col lg:flex-row gap-6">
          
          {/* Partea Stângă: Formular */}
          <div className="flex-1 space-y-5">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Order Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF] bg-white font-medium text-slate-800">
                <option value="pending">Pending (Waiting)</option>
                <option value="assigned">Assigned (Allocated)</option>
                <option value="in_transit">In Transit (On the way)</option>
                <option value="completed">Completed (Completed)</option>
                <option value="cancelled">Cancelled (Cancelled)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Cargo Description</label>
              <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (kg)</label>
                <input type="number" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Trailer Type</label>
                <select value={formData.required_trailer_type} onChange={e => setFormData({...formData, required_trailer_type: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF] bg-white">
                  <option value="prelata">Prelată</option>
                  <option value="frigorific">Frigorific</option>
                  <option value="cisterna">Cisternă</option>
                  <option value="platforma">Platformă</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-emerald-700 mb-1">Pickup Deadline</label>
                <input type="datetime-local" value={formData.pickup_deadline} onChange={e => setFormData({...formData, pickup_deadline: e.target.value})} className="w-full border border-emerald-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-red-700 mb-1">Delivery Deadline</label>
                <input type="datetime-local" value={formData.delivery_deadline} onChange={e => setFormData({...formData, delivery_deadline: e.target.value})} className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
              </div>
            </div>
          </div>

          {/* Partea Dreaptă: Harta */}
          <div className="flex-1 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Modify GPS Route</h4>
            {/* Map will automatically fetch initial coordinates from formData set in useEffect */}
            <OrderMap formData={formData} setFormData={setFormData} />
            <div className="text-[10px] text-slate-500 text-center italic mt-1">Drag the markers to update the order location.</div>
          </div>

        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-5 py-2 bg-[#5465FF] text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isLoading ? <Icon icon="solar:spinner-linear" className="animate-spin" width="18" /> : <Icon icon="solar:diskette-bold" width="18" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}