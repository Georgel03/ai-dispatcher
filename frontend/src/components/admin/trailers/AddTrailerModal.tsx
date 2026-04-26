'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DynamicMap from '../../maps/DynamicMap';
import { useAuth } from '@clerk/nextjs';

export default function AddTrailerModal({ isOpen, onClose, onSuccess, trailerToEdit = null }: any) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    plate_number: "",
    type: "prelata", 
    capacity_kg: "",
    own_weight_kg: "",
    latitude: null as number | null,
    longitude: null as number | null
  });

  useEffect(() => {
    if (trailerToEdit && isOpen) {
      setFormData({
        plate_number: trailerToEdit.plate_number || "",
        type: trailerToEdit.type || "prelata",
        capacity_kg: trailerToEdit.capacity_kg ? trailerToEdit.capacity_kg.toString() : "",
        own_weight_kg: trailerToEdit.own_weight_kg ? trailerToEdit.own_weight_kg.toString() : "",
        latitude: null,
        longitude: null
      });
    } else if (isOpen) {
      setFormData({ plate_number: "", type: "prelata", capacity_kg: "", own_weight_kg: "", latitude: null, longitude: null });
    }
  }, [trailerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!trailerToEdit && (!formData.latitude || !formData.longitude)) {
      alert("Please select a parking location on the map.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const payload: any = {
        plate_number: formData.plate_number,
        type: formData.type,
        capacity_kg: parseInt(formData.capacity_kg),
        own_weight_kg: parseInt(formData.own_weight_kg),
      };

      if (formData.latitude && formData.longitude) {
        payload.parked_location = { latitude: formData.latitude, longitude: formData.longitude };
      }

      const method = trailerToEdit ? "PATCH" : "POST";
      const url = trailerToEdit 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/${trailerToEdit.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/`;

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess(); 
        onClose();   
      } else {
        const error = await res.json();
        alert(`Error: ${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">{trailerToEdit ? "Edit Trailer" : "Add New Trailer"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Plate Number</label>
              <input type="text" value={formData.plate_number} onChange={e => setFormData({...formData, plate_number: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trailer Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF] bg-white">
                <option value="prelata">Prelată (General)</option>
                <option value="frigorific">Frigorific (Frigo)</option>
                <option value="cisterna">Cisternă</option>
                <option value="platforma">Platformă (Oversized)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Capacity (kg)</label>
              <input type="number" value={formData.capacity_kg} onChange={e => setFormData({...formData, capacity_kg: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Own Weight (kg)</label>
              <input type="number" value={formData.own_weight_kg} onChange={e => setFormData({...formData, own_weight_kg: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{trailerToEdit ? "Update Parking Location" : "Parking Location (Click on Map)"}</label>
            <DynamicMap onLocationSelect={(lat, lng) => setFormData({...formData, latitude: lat, longitude: lng})} />
            {formData.latitude && (
              <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Icon icon="solar:check-circle-bold" /> Location saved
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-2 bg-[#5465FF] text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 disabled:opacity-50">
            {isLoading ? "Saving..." : (trailerToEdit ? "Update" : "Save")}
          </button>
        </div>

      </div>
    </div>
  );
}