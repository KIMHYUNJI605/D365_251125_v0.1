import React, { useEffect, useState } from 'react';
import { VehicleModel, Trim } from '../../types';
import { X, Check, ArrowRight } from 'lucide-react';

interface TrimDrawerProps {
    model: VehicleModel | null;
    isOpen: boolean;
    onClose: () => void;
    onSelect: (model: VehicleModel, trim: Trim) => void;
}

const NEO_MINT = '#3FE0C5';

export const TrimDrawer: React.FC<TrimDrawerProps> = ({ model, isOpen, onClose, onSelect }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setAnimate(true));
            // Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            setAnimate(false);
            // Unlock body scroll
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!model && !isOpen) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div 
                className={`fixed bottom-0 left-0 right-0 z-[60] bg-[#0F172A] border-t border-slate-700/50 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
                    animate ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ height: '70vh', maxHeight: '800px' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 shrink-0">
                    <div>
                        <h3 className={`text-xs font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model?.brand}</h3>
                        <h2 className="text-xl font-bold text-white">{model?.name}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Subheader */}
                <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800">
                    <p className="text-sm text-slate-400 font-medium">Select a trim to configure ({model?.trims.length} available)</p>
                </div>

                {/* Trim List (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#0F172A]">
                    {model?.trims.map((trim) => (
                        <div 
                            key={trim.id}
                            className="group relative p-5 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800 hover:border-[${NEO_MINT}]/50 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            onClick={() => onSelect(model, trim)}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className={`text-lg font-bold text-white group-hover:text-[${NEO_MINT}] transition-colors`}>{trim.name}</h3>
                                    {/* Dummy Badge for demo */}
                                    {trim.name.includes('Premium') && <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">Popular</span>}
                                </div>
                                <p className="text-sm text-slate-400">Starting at <span className="text-slate-200 font-semibold">{formatPrice(trim.price)}</span></p>
                                <p className="text-xs text-slate-500 mt-2 line-clamp-1">Includes standard features plus powertrain upgrades.</p>
                            </div>

                            <button 
                                className={`shrink-0 px-6 py-3 bg-[${NEO_MINT}] text-slate-900 text-xs font-extrabold uppercase rounded-lg shadow-lg shadow-[${NEO_MINT}]/10 group-hover:bg-[#32b29d] group-hover:scale-105 transition-all flex items-center justify-center gap-2`}
                            >
                                Configure <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};