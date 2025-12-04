import React, { useState, useMemo } from 'react';
import { VehicleModel, Trim } from '../types';
import { X, ChevronRight, Plus, RotateCcw, Search, Check } from 'lucide-react';

// --- CONSTANTS ---
const NEO_MINT = '#3FE0C5';
const MAX_SLOTS = 4;

interface ComparisonModalProps {
    selectedModels: VehicleModel[];
    availableModels?: VehicleModel[]; 
    onClose: () => void;
    onConfigure: (model: VehicleModel) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ 
    selectedModels: initialSelected, 
    availableModels = [], 
    onClose, 
    onConfigure 
}) => {
    
    // Local state for managing the list (Add/Remove/Reset)
    const [models, setModels] = useState<VehicleModel[]>(initialSelected);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    // Drawer Filter State
    const [drawerSearch, setDrawerSearch] = useState('');
    const [drawerBrand, setDrawerBrand] = useState('All');

    // --- HANDLERS ---

    const handleRemove = (modelId: string) => {
        setModels(prev => prev.filter(m => m.id !== modelId));
    };

    const handleReset = () => {
        setModels([]);
    };

    const handleAddModel = (model: VehicleModel) => {
        if (models.length < MAX_SLOTS) {
            setModels(prev => [...prev, model]);
            setIsDrawerOpen(false);
        }
    };

    const slots = useMemo(() => {
        const filled = models;
        const emptyCount = MAX_SLOTS - models.length;
        const empty = Array(Math.max(0, emptyCount)).fill(null);
        return [...filled, ...empty];
    }, [models]);

    // Drawer Filter Logic
    const filteredAvailable = useMemo(() => {
        if (!availableModels.length) return []; 
        return availableModels.filter(m => {
            // Exclude already selected
            if (models.find(sel => sel.id === m.id)) return false;
            // Search
            if (drawerSearch && !m.name.toLowerCase().includes(drawerSearch.toLowerCase())) return false;
            // Brand
            if (drawerBrand !== 'All' && m.brand !== drawerBrand) return false;
            return true;
        });
    }, [availableModels, models, drawerSearch, drawerBrand]);

    const brands = ['All', ...Array.from(new Set(availableModels.map(m => m.brand)))];

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
            
            {/* MAIN MODAL */}
            <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-[1400px] h-[85vh] flex flex-col overflow-hidden relative">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50 shrink-0">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-white">Compare Models</h2>
                        <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                            {models.length} / {MAX_SLOTS} Selected
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleReset}
                            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800"
                            disabled={models.length === 0}
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                        <div className="h-6 w-px bg-slate-700"></div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>
                </div>
                
                {/* Content Grid */}
                <div className="overflow-x-auto overflow-y-hidden flex-1 p-6 no-scrollbar">
                    <div className="flex gap-4 h-full min-w-max">
                        {slots.slice(0, MAX_SLOTS).map((model, index) => (
                            <div key={model ? model.id : `empty-${index}`} className="w-[300px] md:w-[320px] shrink-0 flex flex-col">
                                {model ? (
                                    // FILLED CARD
                                    <div className="flex flex-col h-full bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-500 transition-all group relative">
                                        
                                        {/* Remove Button */}
                                        <button 
                                            onClick={() => handleRemove(model.id)}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-red-500/80 transition-colors z-10 opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>

                                        {/* Image */}
                                        <div className="h-40 relative bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
                                            <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover opacity-90" />
                                            <div className="absolute bottom-3 left-3">
                                                 <span className="text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded border border-white/10">2025</span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5 flex flex-col flex-1 border-t border-slate-800">
                                            <div className="mb-4">
                                                <h3 className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</h3>
                                                <h2 className="text-lg font-bold text-white leading-tight mb-1">{model.name}</h2>
                                                <p className="text-xs text-slate-400">From ${(model.basePrice/1000000).toFixed(0)}M</p>
                                            </div>

                                            {/* Specs List */}
                                            <div className="space-y-3 flex-1">
                                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Power</span>
                                                    <span className="text-xs font-medium text-slate-200">{model.specs?.hp || '350'} HP</span>
                                                </div>
                                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">0-60 mph</span>
                                                    <span className="text-xs font-medium text-slate-200">{model.specs?.zeroSixty || '4.5s'}</span>
                                                </div>
                                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Economy</span>
                                                    <span className="text-xs font-medium text-slate-200">{model.specs?.mpg || '24 MPG'}</span>
                                                </div>
                                                
                                                {/* Section: Overview */}
                                                <div className="pt-2">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Overview</p>
                                                    <div className="flex flex-col gap-1 text-xs text-slate-300">
                                                        <span className="flex justify-between"><span>Body</span><span>{model.bodyType || 'Sedan'}</span></span>
                                                        <span className="flex justify-between"><span>Type</span><span>{model.powertrain || 'Gasoline'}</span></span>
                                                    </div>
                                                </div>
                                                
                                                 <div className="flex justify-between border-t border-slate-800 pt-2 mt-auto">
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Stock</span>
                                                    <span className={`text-xs font-bold ${model.stockStatus === 'In Stock' ? 'text-emerald-400' : 'text-orange-400'}`}>{model.stockStatus}</span>
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <button 
                                                onClick={() => {
                                                    onClose();
                                                    onConfigure(model);
                                                }}
                                                className={`w-full mt-6 py-3 bg-[${NEO_MINT}] hover:bg-[#32b29d] text-slate-900 text-xs font-extrabold uppercase rounded-lg shadow-lg shadow-[${NEO_MINT}]/10 transition-all flex items-center justify-center gap-2`}
                                            >
                                                Configure <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // EMPTY SLOT
                                    <button 
                                        onClick={() => setIsDrawerOpen(true)}
                                        className="flex-1 h-full border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#3FE0C5] hover:bg-slate-800/30 transition-all group"
                                    >
                                        <div className={`w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-[${NEO_MINT}] group-hover:text-slate-900 transition-all shadow-lg`}>
                                            <Plus size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">Add Model</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ADD MODEL DRAWER (Right Side Slide-in) */}
            <div className={`absolute inset-y-0 right-0 w-full md:w-[420px] bg-[#0F172A] border-l border-slate-700 shadow-2xl z-[110] transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Drawer Header */}
                <div className="h-[72px] flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0">
                    <h3 className="text-lg font-bold text-white">Add to Compare</h3>
                    <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Drawer Filters */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/50 space-y-3 shrink-0">
                    {/* Search */}
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                         <input 
                            type="text" 
                            placeholder="Search models..." 
                            value={drawerSearch}
                            onChange={(e) => setDrawerSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#3FE0C5] placeholder:text-slate-600"
                        />
                    </div>
                    {/* Brands */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                        {brands.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setDrawerBrand(brand)}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold border whitespace-nowrap transition-all ${
                                    drawerBrand === brand 
                                    ? `bg-[${NEO_MINT}]/10 border-[${NEO_MINT}] text-[${NEO_MINT}]` 
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Drawer List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0F172A]">
                    {filteredAvailable.map(model => (
                        <div 
                            key={model.id}
                            onClick={() => handleAddModel(model)}
                            className="flex items-center gap-4 p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 cursor-pointer transition-all group"
                        >
                            <div className="w-20 h-14 rounded bg-slate-950 overflow-hidden shrink-0 relative">
                                <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-[9px] font-bold text-[${NEO_MINT}] uppercase`}>{model.brand}</span>
                                </div>
                                <h4 className="text-sm font-bold text-white truncate group-hover:text-[#3FE0C5] transition-colors">{model.name}</h4>
                                <p className="text-[11px] text-slate-500">From ${(model.basePrice/1000000).toFixed(0)}M</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-[#3FE0C5] group-hover:text-slate-900 group-hover:border-[#3FE0C5] transition-all">
                                <Plus size={16} />
                            </div>
                        </div>
                    ))}
                    {filteredAvailable.length === 0 && (
                        <div className="text-center py-10 text-slate-500 text-sm">
                            No models found matching your filters.
                        </div>
                    )}
                </div>
            </div>

            {/* Drawer Backdrop */}
            {isDrawerOpen && (
                <div className="absolute inset-0 bg-black/40 z-[105] md:hidden" onClick={() => setIsDrawerOpen(false)}></div>
            )}

        </div>
    );
};