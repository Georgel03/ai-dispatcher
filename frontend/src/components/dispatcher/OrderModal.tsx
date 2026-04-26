import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';

export default function OrderModal({ isOpen, onClose, onSuccess, orderToEdit }: any) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Setăm valori default pt ușurință la testare (Oradea -> Cluj)
  const [formData, setFormData] = useState({
    description: '',
    weight_kg: 20000,
    required_trailer_type: 'prelata',
    pickup_lat: 47.0465,
    pickup_lng: 21.9189,
    delivery_lat: 46.7712,
    delivery_lng: 23.6236,
    pickup_deadline: '',
    delivery_deadline: ''
  });

  useEffect(() => {
    if (orderToEdit) {
      setFormData({
        description: orderToEdit.description || '',
        weight_kg: orderToEdit.weight_kg || 20000,
        required_trailer_type: orderToEdit.required_trailer_type || 'prelata',
        pickup_lat: orderToEdit.pickup_lat || 47.0465,
        pickup_lng: orderToEdit.pickup_lng || 21.9189,
        delivery_lat: orderToEdit.delivery_lat || 46.7712,
        delivery_lng: orderToEdit.delivery_lng || 23.6236,
        // Formatăm datele pentru input-ul de tip datetime-local
        pickup_deadline: orderToEdit.pickup_deadline ? new Date(orderToEdit.pickup_deadline).toISOString().slice(0, 16) : '',
        delivery_deadline: orderToEdit.delivery_deadline ? new Date(orderToEdit.delivery_deadline).toISOString().slice(0, 16) : '',
      });
    } else {
      setFormData({
        description: '', weight_kg: 20000, required_trailer_type: 'prelata',
        pickup_lat: 47.0465, pickup_lng: 21.9189, delivery_lat: 46.7712, delivery_lng: 23.6236,
        pickup_deadline: '', delivery_deadline: ''
      });
    }
  }, [orderToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await getToken({ template: "session_token" });
      const url = orderToEdit 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${orderToEdit.id}` 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders`;
        
      const payload = {
          ...formData,
          // Convertim stringurile goale în null pentru date
          pickup_deadline: formData.pickup_deadline || null,
          delivery_deadline: formData.delivery_deadline || null,
      };

      const res = await fetch(url, {
        method: orderToEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.detail || 'Could not save order.'}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800">
            {orderToEdit ? 'Edit Order' : 'Add New Order'}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="orderForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Detalii de bază */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider border-b border-indigo-100 pb-2">Cargo Details</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Cargo Description</label>
                <input required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Ex: 20 Paleți Apă Minerală" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg)</label>
                  <input required type="number" value={formData.weight_kg} onChange={e => setFormData({...formData, weight_kg: Number(e.target.value)})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Required Trailer Type</label>
                  <select value={formData.required_trailer_type} onChange={e => setFormData({...formData, required_trailer_type: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors">
                    <option value="prelata">Prelata</option>
                    <option value="frigorific">Frigorific</option>
                    <option value="cisterna">Cisterna</option>
                    <option value="platforma">Platforma</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Locații (Coordonate) */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider border-b border-rose-100 pb-2">Locations (GPS Coordinates)</h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1"><Icon icon="solar:map-point-bold" className="text-indigo-500" /> Pickup</p>
                  <label className="block text-[10px] text-slate-500">Latitude</label>
                  <input type="number" step="any" required value={formData.pickup_lat} onChange={e => setFormData({...formData, pickup_lat: parseFloat(e.target.value)})} className="w-full px-3 py-1.5 mb-2 border rounded-lg text-xs" />
                  <label className="block text-[10px] text-slate-500">Longitude</label>
                  <input type="number" step="any" required value={formData.pickup_lng} onChange={e => setFormData({...formData, pickup_lng: parseFloat(e.target.value)})} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1"><Icon icon="solar:map-point-bold" className="text-emerald-500" /> Delivery</p>
                  <label className="block text-[10px] text-slate-500">Latitude</label>
                  <input type="number" step="any" required value={formData.delivery_lat} onChange={e => setFormData({...formData, delivery_lat: parseFloat(e.target.value)})} className="w-full px-3 py-1.5 mb-2 border rounded-lg text-xs" />
                  <label className="block text-[10px] text-slate-500">Longitude</label>
                  <input type="number" step="any" required value={formData.delivery_lng} onChange={e => setFormData({...formData, delivery_lng: parseFloat(e.target.value)})} className="w-full px-3 py-1.5 border rounded-lg text-xs" />
                </div>
              </div>
            </div>

            {/* Deadlines */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider border-b border-amber-100 pb-2">Deadlines</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Deadline Pick-up</label>
                  <input type="datetime-local" value={formData.pickup_deadline} onChange={e => setFormData({...formData, pickup_deadline: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Deadline Delivery</label>
                  <input type="datetime-local" value={formData.delivery_deadline} onChange={e => setFormData({...formData, delivery_deadline: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
          <button form="orderForm" type="submit" disabled={isLoading} className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isLoading && <Icon icon="lucide:loader" className="animate-spin" />}
            {orderToEdit ? 'Save Changes' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
}