import React from 'react';
import { VehicleModel } from '../../types';
import { Badge } from '../ui/Badge';
import { CheckSquare, ArrowRight, Layers, Scale } from 'lucide-react';

interface ModelCardProps {
    model: VehicleModel;
    isComparing: boolean;
    onToggleCompare: (model: VehicleModel) => void;
    onSelect: (model: VehicleModel) => void;
    viewMode: 'grid' | 'list';
    onCompareTrims: (model: VehicleModel) => void; // New Prop
}

const NEO_MINT = '#3FE0C5';

export const ModelCard: React.FC<ModelCardProps> = ({ model, isComparing, onToggleCompare, onSelect, viewMode, onCompareTrims }) => {
    
    const getYearFromModelName = (name: string): string => {
        const match = name.match(/\b202[0-9]\b/);
        return match ? match[0] : '2025';
    };

    const year = getYearFromModelName(model.name);
    const minPrice = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(model.basePrice);

    // GRID VIEW
    if (viewMode === 'grid') {
        return (
            <div 
                className={`bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-600 hover:shadow-2xl transition-all duration-300 group flex flex-col relative h-[360px] ${isComparing ? `ring-2 ring-[${NEO_MINT}]` : ''}`}
                onClick={() => onSelect(model)}
            >
                
                {/* Compare Models Toggle */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleCompare(model);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm z-20 ${
                        isComparing 
                        ? `bg-[${NEO_MINT}] text-slate-900` 
                        : 'bg-slate-950/50 text-slate-400 hover:bg-slate-900 hover:text-white border border-white/10'
                    }`}
                    title="Compare Models"
                >
                    <CheckSquare size={16} />
                </button>

                {/* Image Section (Fixed Height) */}
                <div className="h-44 relative overflow-hidden cursor-pointer bg-slate-950 shrink-0">
                    <img 
                        src={model.imageUrl} 
                        alt={model.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Badges */}
                    {model.isInventory && (
                        <div className="absolute top-3 left-3">
                            <Badge label="In Stock" color="green" variant="solid" className="shadow-lg border border-emerald-400/30 backdrop-blur-md" />
                        </div>
                    )}
                    
                    {/* Model Year Badge - Always Visible */}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-white text-[10px] font-bold border border-white/10 shadow-sm">
                        {year}
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                        <h3 className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</h3>
                        <h2 className="text-base font-bold text-white mb-1 leading-tight truncate">
                            {model.name}
                        </h2>
                        <p className="text-xs text-slate-400">From {minPrice}</p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-3 border-t border-slate-800/50 flex items-center justify-between">
                        {/* Compare Trims Button */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onCompareTrims(model);
                            }}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors px-2 py-1.5 rounded hover:bg-slate-800"
                            title="Compare Trims"
                        >
                            <Scale size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wide hidden sm:inline">Compare Trims</span>
                        </button>
                        
                        <button 
                            className={`px-4 py-2 bg-[${NEO_MINT}] hover:bg-[#32b29d] text-slate-900 text-[10px] font-extrabold uppercase rounded-md shadow-lg shadow-[${NEO_MINT}]/10 transition-all flex items-center gap-1 group/btn`}
                        >
                            Select Trim <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // LIST VIEW
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-all duration-300 flex h-40 group relative cursor-pointer" onClick={() => onSelect(model)}>
            {/* Compare Checkbox */}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompare(model);
                }}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm z-20 ${
                    isComparing 
                    ? `bg-[${NEO_MINT}] text-slate-900` 
                    : 'bg-slate-950/50 text-slate-400 hover:bg-slate-900 hover:text-white border border-white/10'
                }`}
            >
                <CheckSquare size={16} />
            </button>

            {/* Image Left */}
            <div className="w-64 relative overflow-hidden bg-slate-950 shrink-0">
                <img 
                    src={model.imageUrl} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50"></div>
                {model.isInventory && (
                    <div className="absolute top-3 left-3">
                        <Badge label="In Stock" color="green" variant="solid" className="shadow-sm" />
                    </div>
                )}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-white text-[10px] font-bold border border-white/10 shadow-sm">
                    {year}
                </div>
            </div>

            {/* Content Right */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <h3 className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</h3>
                    <h2 className="text-lg font-bold text-white mb-1">{model.name}</h2>
                    <p className="text-xs text-slate-400">Starting from <span className="text-white font-bold">{minPrice}</span></p>
                </div>

                <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Layers size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">{model.trims.length} Trims</span>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onCompareTrims(model);
                            }}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800"
                        >
                            <Scale size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Compare Trims</span>
                        </button>
                    </div>
                    <button 
                        className={`px-5 py-2.5 bg-[${NEO_MINT}] hover:bg-[#32b29d] text-slate-900 text-[10px] font-extrabold uppercase rounded-lg shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                        Select Trim <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};