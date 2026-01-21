import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <div className="w-1.5 h-2.5 bg-green-500 rounded-sm"></div>
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">Tracker</span>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (452) 008-8888</div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>8003 Ranchview Dr.<br />Richardson, Singapore 8493</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Home</h4>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Features</h4>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Pricing</h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-slate-900">
          <div className="space-y-4">
            <a href="#" className="block hover:text-white">In the galleries &gt;</a>
            <a href="#" className="block hover:text-white">Events &gt;</a>
            <a href="#" className="block hover:text-white">Film series &gt;</a>
            <a href="#" className="block hover:text-white">Performance programs &gt;</a>
            <a href="#" className="block hover:text-white">Exhibition history &gt;</a>
          </div>

          <div className="md:col-span-3 flex justify-end items-end">
            <button className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs text-center leading-none hover:bg-blue-700 transition">BACK TO<br />TOP</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-12 pt-8 border-t border-slate-900 text-xs text-slate-600">
          <div className="flex gap-6">
            <a href="#">TERMS & CONDITIONS</a>
            <a href="#">PRIVACY POLICY</a>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>2023 TRACKER</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
