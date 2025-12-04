import React from 'react';
import { X, Check, ShoppingBag } from 'lucide-react';
import { ConfigOption } from '../types';

interface AccessoryDrawerProps {
  accessory: ConfigOption | null;
  isOpen: boolean;
  onClose: () => void;
  onToggle: (id: string) => void;
  isSelected: boolean;
}

export const AccessoryDrawer: React.FC<AccessoryDrawerProps> = ({ accessory, isOpen, onClose, onToggle, isSelected }) => {
  if (!accessory) return null;

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-[380px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 shadow-2xl z-[60] transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="h-[72px] flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
         <h3 className="text-sm font-bold text-white uppercase tracking-wider">Accessory Detail</h3>
         <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={20} />
         </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Hero Image Placeholder */}
        <div className="aspect-[4/3] bg-slate-800 rounded-lg border border-slate-700 mb-6 flex items-center justify-center relative overflow-hidden group">
           <ShoppingBag size={48} className="text-slate-600" strokeWidth={1} />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
           <div className="absolute bottom-4 left-4">
              <span className="px-2 py-1 bg-[#3FE0C5] text-slate-900 text-[10px] font-bold rounded uppercase tracking-wider">Official Gear</span>
           </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{accessory.name}</h2>
        <p className="text-lg font-medium text-[#3FE0C5] mb-6">
             {accessory.price === 0 ? 'Included' : `+${accessory.price.toLocaleString()}`}
        </p>

        <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase">Description</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                   Enhance your vehicle with the {accessory.name}. Designed for perfect fit and durability, this accessory adds both functionality and style to your journey. {accessory.description || "Premium quality materials ensure long-lasting performance in all conditions."}
                </p>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                 <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase">Installation</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">
                    Professional installation at the dealership is recommended. Estimated time: 1 hour.
                 </p>
            </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-slate-800 bg-slate-900 shrink-0">
         <button 
            onClick={() => onToggle(accessory.id)}
            className={`w-full py-4 rounded-lg text-sm font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
                isSelected 
                ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20' 
                : 'bg-[#3FE0C5] text-slate-900 hover:bg-[#32b29d]'
            }`}
         >
            {isSelected ? (
                <>
                    <X size={18} /> Remove from Build
                </>
            ) : (
                <>
                    <Check size={18} /> Add to Build
                </>
            )}
         </button>
      </div>
    </div>
  );
};