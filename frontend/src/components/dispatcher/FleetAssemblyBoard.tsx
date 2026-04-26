'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function FleetAssemblyBoard({ 
  availableDrivers, 
  availableTrucks, 
  availableTrailers, 
  onAssemble,
  onSearch 
}: any) {
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<number | null>(null);
  const [selectedTrailer, setSelectedTrailer] = useState<number | null>(null);

  const handleAssemble = () => {
    if (selectedDriver && selectedTruck && selectedTrailer) {
      onAssemble({ driver_id: selectedDriver, truck_id: selectedTruck, trailer_id: selectedTrailer });
      setSelectedDriver(null); setSelectedTruck(null); setSelectedTrailer(null);
    }
  };

  const isReady = selectedDriver && selectedTruck && selectedTrailer;

  return (
    <div className="flex flex-col h-full">
      {/* Header-ul Componentei */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Fleet Assembly</h1>
          <p className="text-sm text-slate-400 mt-1">Selectează un șofer, un cap tractor și o remorcă pentru a forma un echipaj activ.</p>
        </div>
        
        {/* Container pentru Căutare + Buton */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Bara de Căutare Integrată */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 w-full md:w-72 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 shadow-sm">
            <Icon icon="lucide:search" className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Caută resursa..." 
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-slate-400 outline-none text-slate-700 font-medium" 
            />
          </div>

          <button 
            onClick={handleAssemble}
            disabled={!isReady}
            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm whitespace-nowrap ${
              isReady ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Icon icon="lucide:link" className="w-4 h-4" />
            {isReady ? 'Formează Ansamblul' : 'Selectează toate 3'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Coloana 1: Șoferi */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="font-medium text-slate-800 flex items-center gap-2">
              <Icon icon="lucide:user" className="text-indigo-500" /> Șoferi Liberi
            </h3>
          </div>
          <div className="p-3 overflow-y-auto flex-1 space-y-2 no-scrollbar">
            {availableDrivers?.map((driver: any) => (
              <div 
                key={driver.id} 
                onClick={() => setSelectedDriver(selectedDriver === driver.id ? null : driver.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                  selectedDriver === driver.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">{driver.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{driver.name}</p>
                  <p className="text-xs text-slate-400">Ore conduse azi: {driver.driving_hours || 0}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coloana 2: Camioane */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="font-medium text-slate-800 flex items-center gap-2">
              <Icon icon="lucide:truck" className="text-orange-500" /> Capete Tractor
            </h3>
          </div>
          <div className="p-3 overflow-y-auto flex-1 space-y-2 no-scrollbar">
            {availableTrucks?.map((truck: any) => (
              <div 
                key={truck.id} 
                onClick={() => setSelectedTruck(selectedTruck === truck.id ? null : truck.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  selectedTruck === truck.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{truck.plate_number}</p>
                  <p className="text-xs text-slate-500">{truck.model}</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">Cap. {truck.own_weight_kg}kg</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coloana 3: Remorci */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50">
            <h3 className="font-medium text-slate-800 flex items-center gap-2">
              <Icon icon="lucide:container" className="text-emerald-500" /> Remorci Libere
            </h3>
          </div>
          <div className="p-3 overflow-y-auto flex-1 space-y-2 no-scrollbar">
            {availableTrailers?.map((trailer: any) => (
              <div 
                key={trailer.id} 
                onClick={() => setSelectedTrailer(selectedTrailer === trailer.id ? null : trailer.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${
                  selectedTrailer === trailer.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{trailer.plate_number}</p>
                  <p className="text-xs text-slate-500 capitalize">{trailer.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium block mb-1">Max {trailer.capacity_kg}kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}