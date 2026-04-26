import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useAuth } from '@clerk/nextjs';

export default function AssignOrderModal({ isOpen, onClose, onSuccess, orderToAssign }: any) {
  const { getToken } = useAuth();
  const [fleets, setFleets] = useState<any[]>([]);
  const [selectedTruckId, setSelectedTruckId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Aducem echipajele active pentru a le putea selecta
  const fetchAvailableFleets = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: 'session_token' });
      // Chemăm ruta de dispecerat pe care am creat-o la asamblare
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/dispatcher/active-fleets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        // Filtrăm doar camioanele care sunt "AVAILABLE" (Disponibile)
        const available = data.filter((f: any) => f.status.toLowerCase() === 'available');
        setFleets(available);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isOpen) {
      setSelectedTruckId(null);
      fetchAvailableFleets();
    }
  }, [isOpen, fetchAvailableFleets]);

  if (!isOpen || !orderToAssign) return null;

  const handleAssign = async () => {
    if (!selectedTruckId) return;
    setIsSubmitting(true);

    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/orders/${orderToAssign.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ truck_id: selectedTruckId })
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const errData = await res.json();
        alert(`Eroare: ${errData.detail || 'Nu s-a putut aloca comanda.'}`);
      }
    } catch (error) {
      console.error(error);
      alert("A apărut o eroare la conexiunea cu serverul.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Alocă Echipaj</h2>
            <p className="text-xs text-slate-500 mt-0.5">{orderToAssign.description}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Icon icon="solar:close-circle-linear" width="24" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-50/30">
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Alege un echipaj disponibil</h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
              <Icon icon="lucide:loader" className="animate-spin" /> Se caută echipaje...
            </div>
          ) : fleets.length === 0 ? (
            <div className="text-center py-10 bg-white border border-slate-200 border-dashed rounded-xl">
              <Icon icon="solar:danger-circle-bold-duotone" width="32" className="text-amber-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">Niciun echipaj disponibil!</p>
              <p className="text-xs text-slate-500 mt-1">Toate camioanele sunt în tranzit sau în mentenanță.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fleets.map(fleet => (
                <div 
                  key={fleet.truck_id}
                  onClick={() => setSelectedTruckId(fleet.truck_id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                    selectedTruckId === fleet.truck_id 
                      ? 'bg-indigo-50 border-indigo-600 ring-1 ring-indigo-600' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedTruckId === fleet.truck_id ? 'border-indigo-600' : 'border-slate-300'
                  }`}>
                    {selectedTruckId === fleet.truck_id && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{fleet.driver_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex gap-2">
                       <span>🚚 {fleet.truck_plate}</span>
                       <span>📦 {fleet.trailer_plate}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">Anulează</button>
          <button 
            onClick={handleAssign} 
            disabled={!selectedTruckId || isSubmitting} 
            className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <Icon icon="lucide:loader" className="animate-spin" />}
            Asignează și Generează Ruta
          </button>
        </div>
      </div>
    </div>
  );
}