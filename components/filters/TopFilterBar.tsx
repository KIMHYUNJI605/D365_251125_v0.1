import React from 'react';
import { Search, Filter, Mic, Camera, CheckCircle, LayoutGrid, List as ListIcon, ArrowRightLeft } from 'lucide-react';
import { VehicleModel } from '../../types';

// --- CONSTANTS ---
const BRANDS = ['All', 'BMW', 'Porsche', 'Toyota', 'Hyundai', 'Mercedes-Benz', 'Audi', 'Kia', 'Genesis', 'Lexus'];
const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Coupe', 'Sports Car'];
const POWERTRAINS = ['All', 'EV', 'Hybrid', 'Gasoline'];
const BUDGETS = ['All', '< 60M', '60M - 100M', '> 100M'];
const NEO_MINT = '#3FE0C5';

interface TopFilterBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    brandFilter: string;
    setBrandFilter: (brand: string) => void;
    bodyFilter: string;
    setBodyFilter: (body: string) => void;
    powerFilter: string;
    setPowerFilter: (power: string) => void;
    budgetFilter: string;
    setBudgetFilter: (budget: string) => void;
    inventoryOnly: boolean;
    setInventoryOnly: (active: boolean) => void;
    compareList: VehicleModel[];
    onCompare: () => void;
}

export const TopFilterBar: React.FC<TopFilterBarProps> = ({
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    brandFilter, setBrandFilter,
    bodyFilter, setBodyFilter,
    powerFilter, setPowerFilter,
    budgetFilter, setBudgetFilter,
    inventoryOnly, setInventoryOnly,
    compareList, onCompare
}) => {

    return (
        <div className="shrink-0 bg-slate-950 border-b border-slate-800 z-20 flex flex-col relative">
            {/* Top Row: Title & Search/Compare */}
            <div className="px-8 py-6 flex justify-between items-end">
                <div>
                     <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Select Your Vehicle</h1>
                     <p className="text-sm text-slate-400 font-medium">Explore our premium collection</p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Compare Button */}
                    <button 
                        onClick={onCompare}
                        disabled={compareList.length < 2}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            compareList.length >= 2 
                            ? 'bg-white text-slate-900 hover:bg-slate-200 shadow-md' 
                            : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                        }`}
                    >
                        <ArrowRightLeft size={16} />
                        Compare
                        {compareList.length > 0 && <span className="ml-1 bg-slate-900 text-white px-1.5 rounded-full text-[10px] border border-slate-700">{compareList.length}</span>}
                    </button>

                    {/* Search with Icons */}
                    <div className="relative group hidden md:block">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[${NEO_MINT}] transition-colors`} size={16} />
                        <input 
                            type="text" 
                            placeholder="Search model..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-10 pr-20 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[${NEO_MINT}] w-72 transition-all placeholder:text-slate-600 hover:border-slate-600`}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-500">
                            <button className="p-1.5 hover:text-white hover:bg-slate-800 rounded-full transition-colors"><Mic size={14} /></button>
                            <button className="p-1.5 hover:text-white hover:bg-slate-800 rounded-full transition-colors"><Camera size={14} /></button>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Filters */}
            <div className="px-8 pb-4 flex flex-col gap-4 overflow-hidden">
                 {/* Brand Chips (Scrollable) */}
                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mask-linear-fade">
                    {BRANDS.map(brand => (
                        <button
                            key={brand}
                            onClick={() => setBrandFilter(brand)}
                            className={`px-5 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all flex-shrink-0 ${
                                brandFilter === brand 
                                ? `bg-[${NEO_MINT}]/10 border-[${NEO_MINT}] text-[${NEO_MINT}]` 
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                            }`}
                        >
                            {brand}
                        </button>
                    ))}
                 </div>

                 {/* Filter Controls */}
                 <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <select value={bodyFilter} onChange={(e) => setBodyFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {BODY_TYPES.map(b => <option key={b} value={b}>{b === 'All' ? 'Body Type' : b}</option>)}
                        </select>
                        <select value={powerFilter} onChange={(e) => setPowerFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {POWERTRAINS.map(p => <option key={p} value={p}>{p === 'All' ? 'Powertrain' : p}</option>)}
                        </select>
                        <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)} className={`bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:border-[${NEO_MINT}] outline-none cursor-pointer hover:border-slate-500 transition-colors`}>
                            {BUDGETS.map(b => <option key={b} value={b}>{b === 'All' ? 'Budget' : b}</option>)}
                        </select>
                    </div>

                    <div className="flex-1"></div>

                    <button 
                        onClick={() => setInventoryOnly(!inventoryOnly)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-bold transition-all ${
                            inventoryOnly 
                            ? `bg-[${NEO_MINT}]/20 border-[${NEO_MINT}] text-[${NEO_MINT}]` 
                            : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                        }`}
                    >
                        <CheckCircle size={14} className={inventoryOnly ? `fill-[${NEO_MINT}] text-slate-900` : ""} />
                        In-stock Only
                    </button>
                 </div>
            </div>
        </div>
    );
};