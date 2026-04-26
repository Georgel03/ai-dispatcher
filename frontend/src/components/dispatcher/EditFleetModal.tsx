'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';

export default function EditFleetModal({ isOpen, onClose, fleet, availableResources, onSuccess } : any) {

    const { getToken } = useAuth();
    const [ isLoading, setIsLoading ] = useState(false);

    const [selectedTruck, setSelectedTruck] = useState(fleet?.truck_id || "");
    const [selectedTrailer, setSelectedTrailer] = useState(fleet?.trailer_id || "");

    if (!isOpen || !fleet) return null;

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const token = await getToken({ template: "session_token" });
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/update-fleet`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify({
                    driver_id: fleet.driver_id,
                    truck_id: selectedTruck ? parseInt(selectedTruck) : null,
                    trailer_id: selectedTrailer ? parseInt(selectedTrailer) : null
                })
            });

            if (response.ok) {
                onSuccess();
                onClose();
            } else {
                const errorData = await response.json();
                alert(`Eroare: ${errorData.detail || errorData.message || JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error("Error updating fleet:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Icon icon="lucide:settings-2" className="text-indigo-600" width="20" />
            Modifică Echipajul
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <Icon icon="lucide:x-circle" width="24" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Șoferul rămâne "ancora" */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm">
               {fleet.driver_name.charAt(0)}
             </div>
             <div>
               <p className="text-xs text-indigo-400 font-semibold uppercase">Șofer Titular</p>
               <p className="text-sm font-bold text-indigo-900">{fleet.driver_name}</p>
             </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Schimbă Capul Tractor</label>
            <select 
              value={selectedTruck} 
              onChange={e => setSelectedTruck(e.target.value)} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white"
            >
              <option value={fleet.truck_id}>-- Curent: {fleet.truck_plate} --</option>
              {availableResources.trucks.map((t: any) => (
                <option key={t.id} value={t.id}>{t.plate_number} ({t.model})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Schimbă Remorca</label>
            <select 
              value={selectedTrailer} 
              onChange={e => setSelectedTrailer(e.target.value)} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-indigo-500 bg-white"
            >
              {fleet.trailer_id ? (
                 <option value={fleet.trailer_id}>-- Curent: {fleet.trailer_plate} --</option>
              ) : (
                 <option value="">-- Fără remorcă în prezent --</option>
              )}
              {availableResources.trailers.map((t: any) => (
                <option key={t.id} value={t.id}>{t.plate_number} (Max: {t.capacity_kg}kg)</option>
              ))}
              <option value="">Decuplează remorca (Fără)</option>
            </select>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Anulează</button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2">
            {isLoading ? <Icon icon="lucide:loader" className="animate-spin" /> : <Icon icon="lucide:save" />}
            Salvează Modificările
          </button>
        </div>
      </div>
    </div>
  );
}