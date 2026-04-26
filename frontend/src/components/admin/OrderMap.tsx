'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef, useMemo, useEffect } from 'react';

// Creăm iconițe personalizate frumoase (Verde pt Preluare, Roșu pt Livrare)
const createMarkerIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.4);"></div>`,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const pickupIcon = createMarkerIcon('#10b981'); // Emerald (Pickup)
const deliveryIcon = createMarkerIcon('#ef4444'); // Red (Delivery)

// Centrul implicit (Oradea, România - poți ajusta după preferințe)
const DEFAULT_CENTER: [number, number] = [47.0465, 21.9189];

export default function OrderMap({ formData, setFormData }: any) {
  const pickupRef = useRef<L.Marker>(null);
  const deliveryRef = useRef<L.Marker>(null);

  // Setăm coordonatele inițiale pe hartă (dacă sunt goale, le punem ușor decalate de centru)
  const pickupPos: [number, number] = formData.pickup_lat 
    ? [formData.pickup_lat, formData.pickup_lng] 
    : [DEFAULT_CENTER[0], DEFAULT_CENTER[1] - 0.05];
    
  const deliveryPos: [number, number] = formData.delivery_lat 
    ? [formData.delivery_lat, formData.delivery_lng] 
    : [DEFAULT_CENTER[0], DEFAULT_CENTER[1] + 0.05];

  // Când harta se încarcă prima dată, și coordonatele formularului sunt goale,
  // salvăm aceste poziții default în formular ca să nu dea eroare la submit.
  useEffect(() => {
    if (!formData.pickup_lat || !formData.delivery_lat) {
      setFormData((prev: any) => ({
        ...prev,
        pickup_lat: pickupPos[0], pickup_lng: pickupPos[1],
        delivery_lat: deliveryPos[0], delivery_lng: deliveryPos[1]
      }));
    }
  }, []);

  // Funcții care interceptează momentul în care termini de tras punctul pe hartă
  const eventHandlersPickup = useMemo(() => ({
    dragend() {
      const marker = pickupRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        setFormData((prev: any) => ({ ...prev, pickup_lat: lat, pickup_lng: lng }));
      }
    },
  }), [setFormData]);

  const eventHandlersDelivery = useMemo(() => ({
    dragend() {
      const marker = deliveryRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        setFormData((prev: any) => ({ ...prev, delivery_lat: lat, delivery_lng: lng }));
      }
    },
  }), [setFormData]);

  return (
    <div className="h-72 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner relative z-0">
      <MapContainer center={DEFAULT_CENTER} zoom={11} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Punctul Verde - Pickup */}
        <Marker 
          draggable={true} 
          eventHandlers={eventHandlersPickup} 
          position={pickupPos} 
          ref={pickupRef}
          icon={pickupIcon}
        >
          <Popup className="font-semibold text-emerald-700">📍 Preluare Marfă (Trage de mine!)</Popup>
        </Marker>

        {/* Punctul Roșu - Delivery */}
        <Marker 
          draggable={true} 
          eventHandlers={eventHandlersDelivery} 
          position={deliveryPos} 
          ref={deliveryRef}
          icon={deliveryIcon}
        >
          <Popup className="font-semibold text-red-700">🎯 Livrare Marfă (Trage de mine!)</Popup>
        </Marker>
      </MapContainer>
      
      {/* Mic overlay vizual ca să explice utilizatorului */}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-slate-100 text-[10px] font-bold z-[1000] flex flex-col gap-1">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Preluare</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Livrare</div>
      </div>
    </div>
  );
}