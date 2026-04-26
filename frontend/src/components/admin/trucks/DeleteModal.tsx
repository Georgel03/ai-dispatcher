'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>; // Functia care va apela API-ul
  itemName?: string; // Numele elementului pe care il stergem (ex: "Camionul B 123 ABC")
}

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName = "this item" }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-xs w-full relative z-10 animate-in zoom-in-95 duration-200">
        
        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <Icon icon="solar:trash-bin-trash-linear" width="20" />
        </div>
        
        <h3 className="text-base font-bold text-slate-900 mb-1">Are you sure?</h3>
        <p className="text-xs text-slate-500 mb-6">
          This action cannot be undone. You are about to permanently delete <b>{itemName}</b> from the database.
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            disabled={isDeleting}
            className="flex-1 px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            disabled={isDeleting}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 shadow-sm shadow-red-500/20 disabled:opacity-50 flex justify-center items-center"
          >
            {isDeleting ? <Icon icon="solar:spinner-linear" className="animate-spin" width="16" /> : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}