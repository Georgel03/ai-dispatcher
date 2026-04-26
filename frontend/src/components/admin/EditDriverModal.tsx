'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';

export default function EditDriverModal({ isOpen, onClose, onSuccess, driverToEdit }: any) {
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (driverToEdit && isOpen) {
      setFormData({
        name: driverToEdit.name || "",
        phone: driverToEdit.phone || ""
      });
    }
  }, [driverToEdit, isOpen]);

  if (!isOpen || !driverToEdit) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/drivers/${driverToEdit.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        onSuccess(); 
        onClose();   
      } else {
        const errorData = await res.json();
        alert(`Eroare la actualizare: ${JSON.stringify(errorData)}`);
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
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">Edit Driver Information</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF] transition-colors" 
              placeholder="ex: Ion Popescu"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5465FF] transition-colors" 
              placeholder="ex: 0722 123 456"
            />
          </div>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-2 bg-[#5465FF] text-white rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors disabled:opacity-50 flex justify-center items-center">
            {isLoading ? <Icon icon="solar:spinner-linear" className="animate-spin" width="20" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}