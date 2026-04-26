// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { Icon } from '@iconify/react';
// import AddTrailerModal from '../../../components/admin/trailers/AddTrailerModal';
// import DeleteModal from '../../../components/admin/trucks/DeleteModal';
// import { useAuth } from '@clerk/nextjs';

// interface Trailer {
//   id: number;
//   plate_number: string;
//   type: string;
//   capacity_kg: number;
//   own_weight_kg: number;
// }

// export default function TrailersPage() {
//   const { getToken } = useAuth();

//   const [trailers, setTrailers] = useState<Trailer[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTrailer, setEditingTrailer] = useState<Trailer | null>(null);
//   const [trailerToDelete, setTrailerToDelete] = useState<Trailer | null>(null);

//   const fetchTrailers = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/`, {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) setTrailers(await res.json());
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [getToken]);

//   useEffect(() => {
//     fetchTrailers();
//   }, [fetchTrailers]);

//   const confirmDelete = async () => {
//     if (!trailerToDelete) return;
//     try {
//       const token = await getToken({ template: "session_token" });
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/${trailerToDelete.id}`, {
//         method: "DELETE",
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (res.ok) {
//         fetchTrailers();
//         setTrailerToDelete(null);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Selectam iconita in functie de tipul remorcii
//   const getTrailerIcon = (type: string) => {
//     switch(type.toLowerCase()) {
//       case 'frigorific': 
//         return <Icon icon="lucide:snowflake" width="20" className="text-blue-500" />;
//       case 'cisterna': 
//         return <Icon icon="lucide:droplet" width="20" className="text-cyan-500" />;
//       case 'platforma': 
//         return <Icon icon="mdi:truck-flatbed" width="24" className="text-amber-600" />;
//       default: 
//         return <Icon icon="mdi:truck-trailer" width="24" className="text-slate-500" />;
//     }
//   };

//   const filteredTrailers = trailers.filter(trailer => {
//     const term = searchQuery.toLowerCase();
//     return  (
//       trailer.plate_number.toLowerCase().includes(term) || trailer.type.toLowerCase().includes(term) || trailer.capacity_kg.toString().includes(term) || trailer.own_weight_kg.toString().includes(term)
//     );
//   });
//   return (
//     <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
//       <div className="px-6 py-4 flex justify-between items-center border-b border-slate-200 bg-white">
//         <h2 className="text-sm font-semibold text-slate-900">Trailer Assets</h2>
//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="relative flex-1 sm:flex-none">
//             <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
//             <input 
//               type="text" 
//               placeholder="Caută număr sau tip..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] focus:shadow-sm transition-all w-full sm:w-64"
//             />
//           </div>

//           <button 
//             onClick={() => { setEditingTrailer(null); setIsModalOpen(true); }}
//             className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
//           >
//             <Icon icon="solar:add-circle-linear" width="16" /> Add Trailer
//           </button>
//         </div>
//       </div>

//       <div className="p-6 overflow-auto">
//         {isLoading ? (
//            <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
//              <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Încărcare...
//            </div>
//         ) : trailers.length === 0 ? (
//            <div className="text-center py-10 text-slate-400">Nu ai adăugat nicio remorcă încă.</div>
//         ) : (
//           <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
//               {filteredTrailers.map((trailer) => (
//                 <div key={trailer.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors border-b border-slate-100 lg:border-b-0">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-10 h-10 rounded flex items-center justify-center ${trailer.type === 'frigorific' ? 'bg-blue-50' : trailer.type === 'cisterna' ? 'bg-cyan-50' : 'bg-slate-50'}`}>
//                       {getTrailerIcon(trailer.type)}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-slate-900 uppercase">{trailer.plate_number}</p>
//                       <p className="text-[11px] text-slate-500 capitalize">{trailer.type} • Cap: {trailer.capacity_kg}kg</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button onClick={() => { setEditingTrailer(trailer); setIsModalOpen(true); }} className="text-slate-400 hover:text-[#5465FF]">
//                       <Icon icon="solar:pen-new-square-linear" width="16" />
//                     </button>
//                     <button onClick={() => setTrailerToDelete(trailer)} className="text-slate-400 hover:text-red-500">
//                       <Icon icon="solar:trash-bin-trash-linear" width="16" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <AddTrailerModal 
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         onSuccess={fetchTrailers} 
//         trailerToEdit={editingTrailer} 
//       />

//       <DeleteModal 
//         isOpen={trailerToDelete !== null}
//         onClose={() => setTrailerToDelete(null)}
//         onConfirm={confirmDelete}
//         itemName={trailerToDelete ? `remorca ${trailerToDelete.plate_number}` : ""}
//       />
//     </div>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import AddTrailerModal from '../../../components/admin/trailers/AddTrailerModal';
import DeleteModal from '../../../components/admin/trucks/DeleteModal';
import { useAuth } from '@clerk/nextjs';

interface Trailer {
  id: number;
  plate_number: string;
  type: string;
  capacity_kg: number;
  own_weight_kg: number;
}

export default function TrailersPage() {
  const { getToken } = useAuth();

  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrailer, setEditingTrailer] = useState<Trailer | null>(null);
  const [trailerToDelete, setTrailerToDelete] = useState<Trailer | null>(null);

  const fetchTrailers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setTrailers(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchTrailers();
  }, [fetchTrailers]);

  const confirmDelete = async () => {
    if (!trailerToDelete) return;
    try {
      const token = await getToken({ template: "session_token" });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/trailers/${trailerToDelete.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTrailers();
        setTrailerToDelete(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTrailerIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'frigorific': 
        return <Icon icon="lucide:snowflake" width="20" className="text-blue-500" />;
      case 'cisterna': 
        return <Icon icon="lucide:droplet" width="20" className="text-cyan-500" />;
      case 'platforma': 
        return <Icon icon="mdi:truck-flatbed" width="24" className="text-amber-600" />;
      default: 
        return <Icon icon="mdi:truck-trailer" width="24" className="text-slate-500" />;
    }
  };

  const filteredTrailers = trailers.filter(trailer => {
    const term = searchQuery.toLowerCase();
    return  (
      trailer.plate_number.toLowerCase().includes(term) || trailer.type.toLowerCase().includes(term) || trailer.capacity_kg.toString().includes(term) || trailer.own_weight_kg.toString().includes(term)
    );
  });
  
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50/50 animate-in fade-in duration-300">
      <div className="px-6 py-4 flex justify-between items-center border-b border-slate-200 bg-white">
        <h2 className="text-sm font-semibold text-slate-900">Trailer Assets</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="16" />
            <input 
              type="text" 
              placeholder="Search plate or type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#5465FF] focus:shadow-sm transition-all w-full sm:w-64"
            />
          </div>

          <button 
            onClick={() => { setEditingTrailer(null); setIsModalOpen(true); }}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Icon icon="solar:add-circle-linear" width="16" /> Add Trailer
          </button>
        </div>
      </div>

      <div className="p-6 overflow-auto">
        {isLoading ? (
           <div className="flex items-center justify-center py-10 text-slate-400 gap-2">
             <Icon icon="solar:spinner-linear" className="animate-spin" width="24" /> Loading...
           </div>
        ) : trailers.length === 0 ? (
           <div className="text-center py-10 text-slate-400">You haven't added any trailers yet.</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              {filteredTrailers.map((trailer) => (
                <div key={trailer.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors border-b border-slate-100 lg:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded flex items-center justify-center ${trailer.type === 'frigorific' ? 'bg-blue-50' : trailer.type === 'cisterna' ? 'bg-cyan-50' : 'bg-slate-50'}`}>
                      {getTrailerIcon(trailer.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 uppercase">{trailer.plate_number}</p>
                      <p className="text-[11px] text-slate-500 capitalize">{trailer.type} • Cap: {trailer.capacity_kg}kg</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingTrailer(trailer); setIsModalOpen(true); }} className="text-slate-400 hover:text-[#5465FF]">
                      <Icon icon="solar:pen-new-square-linear" width="16" />
                    </button>
                    <button onClick={() => setTrailerToDelete(trailer)} className="text-slate-400 hover:text-red-500">
                      <Icon icon="solar:trash-bin-trash-linear" width="16" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AddTrailerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchTrailers} 
        trailerToEdit={editingTrailer} 
      />

      <DeleteModal 
        isOpen={trailerToDelete !== null}
        onClose={() => setTrailerToDelete(null)}
        onConfirm={confirmDelete}
        itemName={trailerToDelete ? `trailer ${trailerToDelete.plate_number}` : ""}
      />
    </div>
  );
}