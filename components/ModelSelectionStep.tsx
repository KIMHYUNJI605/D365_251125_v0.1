
import React, { useState } from 'react';
import { VehicleModel, Trim } from '../types';
import { Badge } from './ui/Badge';
import { ChevronRight, ArrowRightLeft } from 'lucide-react';

// --- DUMMY DATA ---
const MODELS: VehicleModel[] = [
    {
        id: 'p1', brand: 'Porsche', name: 'Panamera', basePrice: 109800,
        imageColor: 'bg-slate-200',
        stockStatus: 'In Stock',
        trims: [
            { id: 't1', name: 'Base', price: 109800 },
            { id: 't2', name: '4S', price: 121000 },
            { id: 't3', name: 'GTS', price: 142000 },
            { id: 't4', name: 'Turbo S', price: 210000 }
        ]
    },
    {
        id: 'b1', brand: 'BMW', name: 'X5', basePrice: 65200,
        imageColor: 'bg-blue-100',
        stockStatus: 'In Stock',
        trims: [
            { id: 'x1', name: 'sDrive40i', price: 65200 },
            { id: 'x2', name: 'xDrive40i', price: 67500 },
            { id: 'x3', name: 'M60i', price: 89300 },
            { id: 'x4', name: 'M50i', price: 145000 } // Dummy high trim for demo
        ]
    },
    {
        id: 'm1', brand: 'Mercedes-Benz', name: 'GLE', basePrice: 62650,
        imageColor: 'bg-slate-300',
        stockStatus: 'Low Stock',
        trims: [
            { id: 'g1', name: 'GLE 350', price: 62650 },
            { id: 'g2', name: 'GLE 450', price: 189000 }, // Dummy high trim
            { id: 'g3', name: 'GLE 580', price: 86000 }
        ]
    },
    {
        id: 'h1', brand: 'Hyundai', name: 'Ioniq 6', basePrice: 41600,
        imageColor: 'bg-indigo-100',
        stockStatus: 'Arriving Soon',
        trims: [
            { id: 'i1', name: 'SE Standard', price: 41600 },
            { id: 'i2', name: 'SE Long Range', price: 45500 },
            { id: 'i3', name: 'SEL', price: 47700 },
            { id: 'i4', name: 'Limited', price: 52600 }
        ]
    },
    {
        id: 'p2', brand: 'Porsche', name: 'Cayenne', basePrice: 79200,
        imageColor: 'bg-slate-200',
        stockStatus: 'In Stock',
        trims: [
            { id: 'c1', name: 'Base', price: 79200 },
            { id: 'c2', name: 'S', price: 95700 },
            { id: 'c3', name: 'Turbo GT', price: 196300 }
        ]
    },
    {
        id: 'b2', brand: 'BMW', name: 'i7', basePrice: 105700,
        imageColor: 'bg-blue-100',
        stockStatus: 'Low Stock',
        trims: [
            { id: 'i71', name: 'eDrive50', price: 105700 },
            { id: 'i72', name: 'xDrive60', price: 124200 },
            { id: 'i73', name: 'M70', price: 168500 }
        ]
    }
];

interface Props {
    onSelect: (model: VehicleModel, trim: Trim) => void;
}

export const ModelSelectionStep: React.FC<Props> = ({ onSelect }) => {
    // Local state to track selected trim for each card individually
    const [selectedTrims, setSelectedTrims] = useState<Record<string, string>>({});

    const handleTrimChange = (modelId: string, trimId: string) => {
        setSelectedTrims(prev => ({ ...prev, [modelId]: trimId }));
    };

    const getTrim = (model: VehicleModel) => {
        const trimId = selectedTrims[model.id] || model.trims[0].id;
        return model.trims.find(t => t.id === trimId) || model.trims[0];
    };

    return (
        <div className="flex flex-col h-full bg-[#FFFFFF]">
            {/* Header */}
            <div className="shrink-0 px-8 py-6 border-b border-slate-200 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Select Your Vehicle</h1>
                    <p className="text-slate-500 mt-1">Choose a model to begin configuration.</p>
                </div>
                <div className="flex gap-2">
                     <button className="px-4 py-2 bg-white border border-slate-200 rounded-[6px] text-sm font-bold text-slate-600 hover:border-slate-300 transition-all flex items-center gap-2">
                        <ArrowRightLeft size={16} /> Compare Models
                     </button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MODELS.map(model => {
                        const currentTrim = getTrim(model);
                        const isSelectedTrim = selectedTrims[model.id] && selectedTrims[model.id] !== model.trims[0].id;

                        let badgeColor: 'green' | 'orange' | 'blue' = 'green';
                        if (model.stockStatus === 'Low Stock') badgeColor = 'orange';
                        if (model.stockStatus === 'Arriving Soon') badgeColor = 'blue';

                        return (
                            <div key={model.id} className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col h-[420px]">
                                {/* Image Area */}
                                <div className={`h-48 ${model.imageColor} relative flex items-center justify-center overflow-hidden group`}>
                                    <div className="absolute top-3 left-3">
                                        <Badge label={model.stockStatus} color={badgeColor} variant="solid" />
                                    </div>
                                    <span className="text-slate-400/50 font-bold text-4xl select-none group-hover:scale-105 transition-transform duration-500">{model.brand}</span>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{model.brand}</h3>
                                        <h2 className="text-xl font-bold text-slate-900 mb-2">{model.name}</h2>
                                        
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-sm text-slate-500 font-medium">From</span>
                                            <span className="text-lg font-bold text-slate-900">${currentTrim.price.toLocaleString()}</span>
                                        </div>

                                        {/* Trim Selector */}
                                        <div className="relative">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Trim Level</label>
                                            <select 
                                                className="w-full text-sm border border-slate-200 rounded-[6px] py-2 pl-3 pr-8 bg-slate-50 focus:bg-white focus:border-slate-400 focus:ring-0 cursor-pointer appearance-none font-medium text-slate-700"
                                                value={currentTrim.id}
                                                onChange={(e) => handleTrimChange(model.id, e.target.value)}
                                            >
                                                {model.trims.map(t => (
                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-[26px] pointer-events-none text-slate-400">
                                                <ChevronRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <button className="flex-1 py-2.5 border border-slate-200 rounded-[6px] text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                            Compare
                                        </button>
                                        <button 
                                            onClick={() => onSelect(model, currentTrim)}
                                            className="flex-1 py-2.5 bg-[#424651] rounded-[6px] text-xs font-bold text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
                                        >
                                            Configure <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
