import React, { useState, useMemo, useEffect } from 'react';
import { VehicleModel, Trim } from '../../types';
import { X, ChevronRight, Check, Calendar, ToggleLeft, ToggleRight, AlertCircle, ArrowRight } from 'lucide-react';

const NEO_MINT = '#3FE0C5';

interface TrimComparisonModalProps {
    model: VehicleModel;
    selectedTrims?: Trim[]; // Kept for interface compatibility but unused (we show all)
    onClose: () => void;
    onSelectTrim: (trim: Trim) => void;
}

// --- DUMMY DATA GENERATOR FOR STRESS TESTING ---
const SPEC_CATEGORIES = [
    {
        category: "Performance",
        specs: ["Engine Type", "Horsepower", "Torque", "0-60 mph", "Top Speed", "Transmission", "Drivetrain"]
    },
    {
        category: "Efficiency & Range",
        specs: ["Combined MPG / MPGe", "City", "Highway", "Electric Range", "Battery Capacity", "Charging Time (AC)"]
    },
    {
        category: "Dimensions",
        specs: ["Length", "Width", "Height", "Wheelbase", "Cargo Capacity", "Curb Weight", "Seating Capacity"]
    },
    {
        category: "Interior & Tech",
        specs: ["Infotainment Size", "Sound System", "Upholstery Material", "Heated Seats", "Ventilated Seats", "Sunroof type", "Head-Up Display"]
    },
    {
        category: "Safety & ADAS",
        specs: ["Airbags", "Adaptive Cruise Control", "Lane Keep Assist", "Blind Spot Monitor", "Parking Sensors", "360 Camera"]
    }
];

export const TrimComparisonModal: React.FC<TrimComparisonModalProps> = ({ 
    model, 
    onClose, 
    onSelectTrim 
}) => {
    
    const [showDiffOnly, setShowDiffOnly] = useState(false);

    // Format Price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(price);
    };

    // Helper to generate deterministic dummy data based on trim index
    const getSpecValue = (trim: Trim, specName: string, index: number) => {
        // Logic to create variations for "Show Difference" testing
        const isBase = index === 0;
        const isTop = index === model.trims.length - 1;
        
        switch(specName) {
            case "Engine Type": return isTop ? "Dual Motor AWD" : "Single Motor RWD";
            case "Horsepower": return isTop ? "523 HP" : isBase ? "335 HP" : "380 HP";
            case "Torque": return isTop ? "450 lb-ft" : "300 lb-ft";
            case "0-60 mph": return isTop ? "3.5 sec" : isBase ? "5.4 sec" : "4.8 sec";
            case "Drivetrain": return isTop ? "AWD" : "RWD";
            case "Seating Capacity": return "5 Passengers"; // Common item
            case "Length": return "4,783 mm"; // Common item
            case "Infotainment Size": return "14.9-inch Curved Display"; // Common
            case "Sound System": return isTop ? "Burmester 4D" : isBase ? "Hi-Fi Standard" : "Bose Surround";
            case "Battery Capacity": return isTop ? "105.2 kWh" : "83.9 kWh";
            case "Electric Range": return isTop ? "480 km" : "520 km"; // Higher trim often has less range due to performance
            default: return index % 2 === 0 ? "Standard" : "Available";
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
            
            {/* MAIN MODAL */}
            <div className="bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-[1600px] h-[90vh] flex flex-col overflow-hidden relative">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center bg-slate-900/95 backdrop-blur shrink-0 z-50">
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider mb-1`}>{model.brand}</span>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">Compare Trims</h2>
                            <span className="text-sm text-slate-400 border-l border-slate-600 pl-3">{model.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Show Differences Toggle */}
                        <button 
                            onClick={() => setShowDiffOnly(!showDiffOnly)}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <span className={`text-sm font-medium transition-colors ${showDiffOnly ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>Show differences only</span>
                            {showDiffOnly 
                                ? <ToggleRight size={32} className={`text-[${NEO_MINT}] fill-[${NEO_MINT}]/20`} /> 
                                : <ToggleLeft size={32} className="text-slate-600" />
                            }
                        </button>
                        
                        <div className="h-8 w-px bg-slate-700"></div>
                        
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>
                </div>
                
                {/* TABLE SCROLL AREA */}
                <div className="flex-1 overflow-auto relative bg-[#0F172A] scroll-smooth">
                    <table className="w-full border-collapse text-left">
                        
                        {/* STICKY HEADER (Trim Info) */}
                        <thead className="sticky top-0 z-40">
                            <tr>
                                {/* Fixed First Column Header */}
                                <th className="sticky left-0 z-50 w-[200px] min-w-[200px] bg-slate-900/95 backdrop-blur border-b border-r border-slate-700 p-4 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
                                    <div className="h-full flex items-end pb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specifications</span>
                                    </div>
                                </th>
                                
                                {/* Trim Columns */}
                                {model.trims.map((trim, i) => (
                                    <th key={trim.id} className="min-w-[280px] w-[280px] bg-slate-900/95 backdrop-blur border-b border-r border-slate-700/50 p-6 align-top last:border-r-0">
                                        <div className="flex flex-col h-full gap-3">
                                            <div>
                                                <h3 className={`text-lg font-bold text-white mb-1`}>{trim.name}</h3>
                                                <p className={`text-base font-medium text-[${NEO_MINT}]`}>{formatPrice(trim.price)}</p>
                                            </div>
                                            
                                            {/* Key Features Summary (Header) */}
                                            <div className="mt-2 space-y-1.5">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Key Features</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {/* Dummy Key Features for visual test */}
                                                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap">AWD</span>
                                                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap">360 Cam</span>
                                                    {i === model.trims.length - 1 && <span className="text-[10px] bg-indigo-900/40 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-700/50 whitespace-nowrap">Premium</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* TABLE BODY (Specs) */}
                        <tbody className="divide-y divide-slate-800/50">
                            {SPEC_CATEGORIES.map((cat) => (
                                <React.Fragment key={cat.category}>
                                    {/* Category Header Row */}
                                    <tr className="bg-slate-800/30">
                                        <td className="sticky left-0 z-30 bg-slate-800/90 backdrop-blur border-r border-slate-700 p-3 text-xs font-bold text-slate-300 uppercase tracking-wider shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
                                            {cat.category}
                                        </td>
                                        <td colSpan={model.trims.length} className="p-0"></td>
                                    </tr>

                                    {/* Data Rows */}
                                    {cat.specs.map((spec) => {
                                        // Check for differences
                                        const values = model.trims.map((t, idx) => getSpecValue(t, spec, idx));
                                        const isDifferent = new Set(values).size > 1;

                                        // Filter if "Show Diff Only" is active
                                        if (showDiffOnly && !isDifferent) return null;

                                        return (
                                            <tr key={spec} className="hover:bg-white/5 transition-colors group">
                                                <td className="sticky left-0 z-30 w-[200px] bg-[#0F172A] border-r border-slate-800 p-4 text-xs font-medium text-slate-400 group-hover:bg-slate-800/50 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
                                                    {spec}
                                                </td>
                                                {model.trims.map((t, idx) => (
                                                    <td key={t.id} className={`p-4 text-sm border-r border-slate-800/50 last:border-r-0 ${isDifferent ? 'text-white font-medium' : 'text-slate-500'}`}>
                                                        {getSpecValue(t, spec, idx)}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>

                        {/* STICKY FOOTER (Actions) */}
                        <tfoot className="sticky bottom-0 z-40">
                            <tr>
                                <td className="sticky left-0 z-50 bg-slate-900/95 backdrop-blur border-t border-r border-slate-700 p-4 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
                                    {/* Empty corner or label */}
                                </td>
                                {model.trims.map((trim) => (
                                    <td key={trim.id} className="bg-slate-900/95 backdrop-blur border-t border-r border-slate-700 p-4 last:border-r-0 align-bottom">
                                        <div className="flex flex-col gap-3">
                                            <button className="w-full py-2.5 rounded-lg border border-slate-600 text-slate-300 text-xs font-bold hover:border-white hover:text-white transition-all flex items-center justify-center gap-2">
                                                <Calendar size={14} /> Test Drive
                                            </button>
                                            <button 
                                                onClick={() => onSelectTrim(trim)}
                                                className={`w-full py-3 bg-[${NEO_MINT}] hover:bg-[#32b29d] text-slate-900 text-xs font-extrabold uppercase rounded-lg shadow-lg shadow-[${NEO_MINT}]/10 transition-all flex items-center justify-center gap-2`}
                                            >
                                                Configu <ArrowRight size={14} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};