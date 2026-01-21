import React from 'react';
import { Truck } from 'lucide-react';

export default function BentoGrid() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 mb-4">Powerful Features for Seamless Fleet Connectivity and Control</h2>
          </div>
          <div>
            <p className="text-lg text-slate-500">Stay one step ahead of the competition with our comprehensive truck tracking platform. Take control of your trucking business.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-[400px]">
            <div>
              <h3 className="text-xl font-semibold mb-2">Live Map Views</h3>
              <p className="text-slate-500 text-sm mb-6">Gain real-time visibility into the exact location and status of your trucks.</p>
              <button className="bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200">Learn more</button>
            </div>
            <div className="mt-auto bg-slate-50 rounded-lg h-32 w-full overflow-hidden border border-slate-100 relative">
              <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&q=80&w=300')] bg-cover"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-100 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Integration Capabilities</h3>
            <p className="text-slate-500 text-sm mb-8">Seamlessly integrate PrecisionTrack with your existing systems.</p>
            <button className="bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 w-max mb-8">Learn more</button>
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-white shadow-md rounded-md flex items-center justify-center border border-slate-100 text-xs font-bold">G</div>
                  <div className="absolute bottom-0 right-10 w-8 h-8 bg-purple-100 text-purple-600 shadow-md rounded-md flex items-center justify-center text-xs font-bold">M</div>
                  <div className="absolute top-10 right-0 w-8 h-8 bg-blue-100 text-blue-600 shadow-md rounded-md flex items-center justify-center text-xs font-bold">J</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
            <h3 className="text-xl font-semibold mb-2">Statistic</h3>
            <p className="text-slate-500 text-sm mb-6">Shipments statistic</p>
            <div className="flex-1 flex items-end pb-4">
              <div className="w-full h-32 flex items-end justify-between gap-2">
                <div className="w-full bg-blue-50 h-[40%] rounded-t-sm"></div>
                <div className="w-full bg-blue-100 h-[60%] rounded-t-sm"></div>
                <div className="w-full bg-blue-500 h-[85%] rounded-t-sm relative group">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">23.70%</div>
                </div>
                <div className="w-full bg-blue-100 h-[50%] rounded-t-sm"></div>
              </div>
            </div>
          </div>

          {/* Card 4 (Spanning) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:col-span-2 lg:col-span-2 h-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Customizable Dashboards</h3>
                <p className="text-slate-500 text-sm mb-6">Create personalized dashboards that display key performance indicators (KPIs) relevant to your trucking operations.</p>
                <button className="bg-slate-50 text-slate-900 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200">Learn more</button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Emery Zuckrafberg</div>
                    <div className="text-xs text-slate-500">Driver Score</div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-10 h-10 rounded-full border-4 border-blue-500 flex items-center justify-center text-xs font-bold">4.5</div>
                  </div>
                </div>
                <div className="bg-white rounded p-3 text-xs text-slate-500 shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Volvo BM-390
                  </div>
                  <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Schedule Management</h3>
            <div className="flex gap-2 mb-4">
              <span className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded-full">All</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">In transit</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs border-b border-slate-50 pb-2">
                <span className="text-slate-400 w-12">Sun 19</span>
                <div className="flex-1 bg-green-100 p-2 rounded text-green-800 font-medium">XY 78894</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 w-12">Sun 20</span>
                <div className="flex-1 bg-blue-100 p-2 rounded text-blue-800 font-medium">AB 39304</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
