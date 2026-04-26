'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import DynamicMap from '../../maps/DynamicMap';
import { useAuth } from '@clerk/nextjs';

export default function AddTruckModal({ isOpen, onClose, onSuccess, truckToEdit = null }: { isOpen: boolean, onClose: () => void, onSuccess: () => void, truckToEdit?: any }) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    plate_number: "",
    model: "",
    own_weight_kg: "",
    latitude: null as number | null,
    longitude: null as number | null
  });

  useEffect(() => {
    if (truckToEdit) {
      setFormData({
        plate_number: truckToEdit.plate_number,
        model: truckToEdit.model,
        own_weight_kg: truckToEdit.own_weight_kg?.toString(),
        latitude: null,
        longitude:  null
      });
    } else {
      setFormData({
        plate_number: "",
        model: "",
        own_weight_kg: "",
        latitude: null,
        longitude: null
      });
    }
  }, [truckToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!formData.latitude || !formData.longitude) {
      alert("Te rog să selectezi o locație pe hartă!");
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      
      const payload : any = {
        plate_number: formData.plate_number,
        model: formData.model,
        own_weight_kg: parseInt(formData.own_weight_kg),
        // location: {
        //   latitude: formData.latitude,
        //   longitude: formData.longitude
        // },
        // driver_id: null,
        // trailer_id: null
      };

      if (formData.latitude && formData.longitude) {
        payload['location'] = {
          latitude: formData.latitude,
          longitude: formData.longitude
        };
      }

      const method = truckToEdit ? "PATCH" : "POST";
      const url = truckToEdit 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/${truckToEdit?.id || ''}` 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trucks/`;

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess(); // Reîncarcă lista de camioane
        onClose();   // Închide modalul
      } else {
        const error = await res.json();
        alert(`Eroare: ${JSON.stringify(error)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Eroare de rețea!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">{truckToEdit ? "Edit Truck" : "Add New Truck"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Plate Number</label>
            <input type="text" placeholder="ex: B 123 ABC" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" 
              onChange={e => setFormData({...formData, plate_number: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Model</label>
              <input type="text" placeholder="ex: Volvo FH" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" 
                onChange={e => setFormData({...formData, model: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (kg)</label>
              <input type="number" placeholder="ex: 8500" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF]" 
                onChange={e => setFormData({...formData, own_weight_kg: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Location (Click pe hartă)</label>
            <DynamicMap onLocationSelect={(lat, lng) => setFormData({...formData, latitude: lat, longitude: lng})} />
            {formData.latitude && (
              <p className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Icon icon="solar:check-circle-bold" /> Locație salvată
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-2 bg-[#5465FF] text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 disabled:opacity-50">
            {isLoading ? "Se salvează..." : "Save Truck"}
          </button>
        </div>

      </div>
    </div>
  );
}