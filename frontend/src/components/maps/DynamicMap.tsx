'use client';

import dynamic from 'next/dynamic';

// Importăm MapPicker, dar îi spunem lui Next.js să NU îl randeze pe server (ssr: false)
const DynamicMap = dynamic(() => import('./MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400 font-medium border border-slate-200">
      Loading map...
    </div>
  )
});

export default DynamicMap;