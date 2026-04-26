'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Icon as Iconify } from '@iconify/react';

const truckIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const selectedTruckIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-10 h-10 bg-rose-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white z-50 transform scale-110 transition-transform"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v5c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const pickupMarkerIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white ring-2 ring-amber-200"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const deliveryMarkerIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white ring-2 ring-emerald-200"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.panTo(center, { animate: true, duration: 0.8 });
  }, [center, map]);
  return null;
}

const convertOsrmToLeaflet = (osrmCoords: [number, number][]) : [number, number][] => {
  if (!osrmCoords || !Array.isArray(osrmCoords)) return [];
  return osrmCoords.map(coord => [coord[1], coord[0]]); 
}

export default function LiveMapComponent({ activeFleets, selectedFleetId, onMarkerClick }: any) {
  
  const selectedFleet = activeFleets?.find((f: any) => f.fleet_id === selectedFleetId);
  const centerPosition = selectedFleet?.current_location || [47.05, 21.94];

  const [dynamicApproach, setDynamicApproach] = useState<[number, number][]>([]);

  const isComplexRouting = selectedFleet?.active_order?.route_geometry && 
                           selectedFleet.active_order.route_geometry.main !== undefined;

  const rawMainRoute = isComplexRouting ? selectedFleet.active_order.route_geometry.main : [];
  const rawApproachRoute = isComplexRouting ? selectedFleet.active_order.route_geometry.approach : [];
  
  const mainRouteCoords = convertOsrmToLeaflet(rawMainRoute);
  
  const pickupPoint = selectedFleet?.active_order?.pickup_coords || (mainRouteCoords.length > 0 ? mainRouteCoords[0] : null);
  const deliveryPoint = selectedFleet?.active_order?.delivery_coords || (mainRouteCoords.length > 0 ? mainRouteCoords[mainRouteCoords.length - 1] : null);

  
  const currentWaypointIndex = selectedFleet?.active_order?.route_geometry?.current_waypoint_index || 0;
  const approachLen = rawApproachRoute?.length || 0;
  
  const hasReachedPickup = currentWaypointIndex >= approachLen;

  useEffect(() => {
    if (hasReachedPickup) {
        setDynamicApproach([]);
        return;
    }

    if (selectedFleet?.current_location && pickupPoint) {
        const [t_lat, t_lng] = selectedFleet.current_location;
        const [p_lat, p_lng] = pickupPoint;

        fetch(`http://router.project-osrm.org/route/v1/driving/${t_lng},${t_lat};${p_lng},${p_lat}?geometries=geojson&overview=full`)
        .then(res => res.json())
        .then(data => {
            if (data.code === 'Ok') {
                const coords = data.routes[0].geometry.coordinates;
                setDynamicApproach(convertOsrmToLeaflet(coords));
            }
        })
        .catch(err => console.error("Eroare OSRM:", err));
    }
  }, [selectedFleet?.current_location, pickupPoint, hasReachedPickup]);

  const getDriverStatusBadge = (fleet: any) => {
      const state = fleet?.active_order?.route_geometry?.sim_state;
      if (state === "loading") return <div className="mt-2 bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit"><Iconify icon="solar:box-minimalistic-bold" /> LOAD CARGO</div>;
      if (state === "pausing") return <div className="mt-2 bg-sky-100 text-sky-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit"><Iconify icon="solar:cup-star-bold" /> BREAK 45 MIN</div>;
      if (state === "resting") return <div className="mt-2 bg-violet-100 text-violet-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit"><Iconify icon="solar:moon-sleep-bold" /> REST 10 HOURS</div>;
      if (state === "driving") return <div className="mt-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 w-fit"><Iconify icon="solar:steering-wheel-bold" /> AT THE WHEEL</div>;
      return null;
  }

  return (
    <MapContainer center={centerPosition} zoom={11} className="w-full h-full z-0" zoomControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
      <MapController center={selectedFleet ? selectedFleet.current_location : null} />

      {selectedFleet && selectedFleet.active_order && (
        <>
          
          {mainRouteCoords.length > 0 && (
            <Polyline positions={mainRouteCoords} color="#5465FF" weight={3} opacity={0.8} dashArray="2, 6" lineCap="round" lineJoin="round" />
          )}

         
          {!hasReachedPickup && dynamicApproach.length > 0 ? (
            <Polyline positions={dynamicApproach} color="#f59e0b" weight={3} opacity={0.8} dashArray="2, 6" lineCap="round" lineJoin="round" />
          ) : !hasReachedPickup && pickupPoint ? (
            <Polyline positions={[selectedFleet.current_location, pickupPoint]} color="#f59e0b" weight={3} dashArray="2, 6" opacity={0.3} />
          ) : null}

          
          {pickupPoint && (
            <Marker position={pickupPoint as [number, number]} icon={pickupMarkerIcon} zIndexOffset={400}>
               <Popup><p className="m-0 font-bold text-xs text-amber-600">Pick-up Point</p></Popup>
            </Marker>
          )}

          
          {deliveryPoint && (
            <Marker position={deliveryPoint as [number, number]} icon={deliveryMarkerIcon} zIndexOffset={400}>
               <Popup><p className="m-0 font-bold text-xs text-emerald-600">Delivery Point</p></Popup>
            </Marker>
          )}
        </>
      )}

      
      {activeFleets?.map((fleet: any) => {
        if (!fleet.current_location) return null;
        const isSelected = fleet.fleet_id === selectedFleetId;

        return (
          <Marker 
            key={fleet.fleet_id} 
            position={fleet.current_location as [number, number]} 
            icon={isSelected ? selectedTruckIcon : truckIcon}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{ click: () => onMarkerClick(fleet.fleet_id) }}
          >
            <Popup>
               <div className="font-sans min-w-[180px]">
                 <p className="font-bold text-slate-800 m-0">{fleet.driver ? fleet.driver.name : "No driver assigned"}</p>
                 <p className="text-xs text-slate-500 m-0 mb-2 tracking-wide">{fleet.truck.plate} {fleet.trailer ? `• ${fleet.trailer.plate}` : ''}</p>
                 
                 {fleet.active_order ? (
                    <div className="bg-indigo-50 border border-indigo-100 p-2 rounded-lg text-xs flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                          <Iconify icon="solar:routing-bold-duotone" width="20" className="text-indigo-500 shrink-0" />
                          <div>
                              <span className="font-bold text-indigo-700 block mb-0.5">Active Order</span>
                              <span className="text-slate-700 font-medium">{fleet.active_order.description}</span>
                          </div>
                      </div>
                    
                      {getDriverStatusBadge(fleet)}
                      
                    </div>
                 ) : (
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-xs text-slate-500 font-medium text-center">No active order (Standby)</div>
                 )}
               </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
}