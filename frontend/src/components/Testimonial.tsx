'use client';

import React, { useState, useRef } from 'react';
import { Play, X, Minimize2, Maximize2 } from 'lucide-react';

export default function Testimonial() {
  const [videoState, setVideoState] = useState<'idle' | 'fullscreen' | 'minimized'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

  const openFullscreen = () => {
    setVideoState('fullscreen');
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Redarea a fost întreruptă intenționat de utilizator.");
        });
      }
    }
  };

  const closeVideo = () => {
    setVideoState('idle');
    if (videoRef.current) {
      videoRef.current.pause(); 
      videoRef.current.currentTime = 0; 
    }
  };

  const toggleMinimize = () => {
    setVideoState(prev => prev === 'fullscreen' ? 'minimized' : 'fullscreen');
  };

  return (
    <>
      <section className="h-[600px] relative bg-slate-900 flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Shipping Containers" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="absolute top-10 right-20 flex gap-4 z-10">
          <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">Copenhagen</div>
          <div className="bg-white/10 backdrop-blur border border-white/20 text-white text-xs px-4 py-2 rounded-full">SendMyPackage.ltd</div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            onClick={openFullscreen}
            className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.3)] group"
          >
            <Play className="w-10 h-10 text-blue-600 ml-2 fill-blue-600 group-hover:text-blue-700 group-hover:fill-blue-700 transition-colors" />
          </button>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <p className="text-3xl font-medium text-white mb-6 leading-snug">
              "Tracker ensures that we maintain uninterrupted connectivity and traceability for our fleet, even in remote areas."
            </p>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Maclister Messi</p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
            More story from them
          </button>
        </div>
      </section>

      <div 
        className={`fixed z-[9999] transition-all duration-500 ease-in-out ${
          videoState === 'idle' 
            ? 'opacity-0 pointer-events-none translate-y-10 scale-95' 
            : videoState === 'fullscreen'
              ? 'inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 opacity-100 scale-100'
              : 'bottom-6 right-6 w-[350px] aspect-video bg-black rounded-2xl shadow-2xl opacity-100 scale-100 overflow-hidden ring-1 ring-white/10 group'
        }`}
      >
        <div className={`absolute top-0 left-0 w-full p-4 flex justify-end gap-3 z-50 transition-opacity duration-300 bg-gradient-to-b from-black/80 to-transparent ${
          videoState === 'minimized' ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}>
          <button 
            onClick={toggleMinimize} 
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full transition-colors"
            title={videoState === 'fullscreen' ? 'Minimizați' : 'Ecran complet'}
          >
            {videoState === 'fullscreen' ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button 
            onClick={closeVideo} 
            className="bg-rose-500/80 hover:bg-rose-500 backdrop-blur-md text-white p-2.5 rounded-full transition-colors"
            title="Închide"
          >
            <X size={20} />
          </button>
        </div>

        <video
          ref={videoRef}
          className={`w-full h-full object-contain ${videoState === 'minimized' ? 'object-cover cursor-pointer' : ''}`}
          controls={videoState === 'fullscreen'}
          onClick={() => videoState === 'minimized' && openFullscreen()}
          playsInline
        >
          <source src="/videos/logistics.mp4" type="video/mp4" />
          Browserul tău nu suportă redarea video.
        </video>
      </div>
    </>
  );
}