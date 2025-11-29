
import React, { useState } from 'react';
import { VehicleModel, Trim } from '../types';
import { Badge } from './ui/Badge';
import { ChevronRight, ArrowRightLeft, CheckSquare } from 'lucide-react';
import { ComparisonModal } from './ComparisonModal';

// --- UPDATED DATA MATCHING IMAGES ---
const MODELS: VehicleModel[] = [
    {
        id: 'p1', brand: 'Porsche', name: 'Panamera', basePrice: 109800,
        imageColor: 'bg-red-900',
        imageUrl: 'https://images.unsplash.com/photo-1614207291779-6c0725505230?auto=format&fit=crop&q=80&w=800', // Red Panamera placeholder
        stockStatus: 'In Stock',
        specs: { hp: 473, mpg: '18/24', zeroSixty: '3.9s' },
        trims: [
            { id: 't1', name: 'GTS', price: 142000 },
            { id: 't2', name: 'Turbo S', price: 210000 },
            { id: 't3', name: '4S', price: 121000 }
        ]
    },
    {
        id: 'p2', brand: 'Porsche', name: 'Taycan', basePrice: 90900,
        imageColor: 'bg-red-700',
        imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800', // Red Taycan placeholder
        stockStatus: 'Low Stock',
        specs: { hp: 402, mpg: '83 MPGe', zeroSixty: '5.1s' },
        trims: [
            { id: 'ty1', name: 'Base', price: 90900 },
            { id: 'ty2', name: '4S', price: 111700 },
            { id: 'ty3', name: 'Turbo S', price: 187600 }
        ]
    },
    {
        id: 'p3', brand: 'Porsche', name: 'Taycan Cross Turismo', basePrice: 101900,
        imageColor: 'bg-teal-700',
        imageUrl: 'https://images.unsplash.com/photo-1655217965809-3c7275727976?auto=format&fit=crop&q=80&w=800', // Green/Teal Taycan CT
        stockStatus: 'Arriving Soon',
        specs: { hp: 469, mpg: '80 MPGe', zeroSixty: '4.8s' },
        trims: [
            { id: 'ct1', name: '4', price: 101900 },
            { id: 'ct2', name: '4S', price: 118200 },
            { id: 'ct3', name: 'Turbo', price: 160800 }
        ]
    },
    {
        id: 'p4', brand: 'Porsche', name: 'Cayenne Coupe', basePrice: 84300,
        imageColor: 'bg-orange-600',
        imageUrl: 'https://images.unsplash.com/photo-1678808625346-602055695029?auto=format&fit=crop&q=80&w=800', // Orange Cayenne placeholder
        stockStatus: 'In Stock',
        specs: { hp: 348, mpg: '17/23', zeroSixty: '5.4s' },
        trims: [
            { id: 'cc1', name: 'Base', price: 84300 },
            { id: 'cc2', name: 'S', price: 102100 },
            { id: 'cc3', name: 'Turbo GT', price: 196300 }
        ]
    },
    {
        id: 'b1', brand: 'BMW', name: 'i4', basePrice: 52200,
        imageColor: 'bg-slate-300',
        imageUrl: 'https://images.unsplash.com/photo-1652538784883-9b24479907be?auto=format&fit=crop&q=80&w=800', // Silver i4
        stockStatus: 'In Stock',
        specs: { hp: 281, mpg: '109 MPGe', zeroSixty: '5.8s' },
        trims: [
            { id: 'i41', name: 'eDrive35', price: 52200 },
            { id: 'i42', name: 'eDrive40', price: 57300 },
            { id: 'i43', name: 'M50', price: 69700 }
        ]
    },
    {
        id: 'b2', brand: 'BMW', name: 'i5', basePrice: 66800,
        imageColor: 'bg-slate-400',
        imageUrl: 'https://images.unsplash.com/photo-1696526975276-23ee3929555f?auto=format&fit=crop&q=80&w=800', // Silver i5
        stockStatus: 'Arriving Soon',
        specs: { hp: 335, mpg: '105 MPGe', zeroSixty: '5.7s' },
        trims: [
            { id: 'i51', name: 'eDrive40', price: 66800 },
            { id: 'i52', name: 'M60', price: 84100 }
        ]
    },
    {
        id: 'b3', brand: 'BMW', name: 'i7', basePrice: 105700,
        imageColor: 'bg-amber-800',
        imageUrl: 'https://images.unsplash.com/photo-1623194464736-2396b27eb4b6?auto=format&fit=crop&q=80&w=800', // Bronze i7
        stockStatus: 'Low Stock',
        specs: { hp: 449, mpg: '87 MPGe', zeroSixty: '5.3s' },
        trims: [
            { id: 'i71', name: 'eDrive50', price: 105700 },
            { id: 'i72', name: 'xDrive60', price: 124200 },
            { id: 'i73', name: 'M70', price: 168500 }
        ]
    },
    {
        id: 'b4', brand: 'BMW', name: 'iX', basePrice: 87100,
        imageColor: 'bg-slate-900',
        imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800', // Black iX
        stockStatus: 'In Stock',
        specs: { hp: 516, mpg: '86 MPGe', zeroSixty: '4.4s' },
        trims: [
            { id: 'ix1', name: 'xDrive50', price: 87100 },
            { id: 'ix2', name: 'M60', price: 111500 }
        ]
    }
];

interface Props {
    onSelect: (model: VehicleModel, trim: Trim) => void;
}

export const ModelSelectionStep: React.FC<Props> = ({ onSelect }) => {
    const [selectedTrims, setSelectedTrims] = useState<Record<string, string>>({});
    const [compareList, setCompareList] = useState<VehicleModel[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    const handleTrimChange = (modelId: string, trimId: string) => {
        setSelectedTrims(prev => ({ ...prev, [modelId]: trimId }));
    };

    const getTrim = (model: VehicleModel) => {
        const trimId = selectedTrims[model.id] || model.trims[0].id;
        return model.trims.find(t => t.id === trimId) || model.trims[0];
    };

    const toggleCompare = (model: VehicleModel) => {
        if (compareList.find(m => m.id === model.id)) {
            setCompareList(prev => prev.filter(m => m.id !== model.id));
        } else {
            if (compareList.length < 4) {
                setCompareList(prev => [...prev, model]);
            }
        }
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
                     <button 
                        onClick={() => compareList.length > 0 && setIsCompareOpen(true)}
                        disabled={compareList.length === 0}
                        className={`px-4 py-2 border rounded-[6px] text-sm font-bold transition-all flex items-center gap-2 ${
                            compareList.length > 0 
                            ? 'bg-[#424651] text-white border-[#424651] hover:bg-slate-700' 
                            : 'bg-white text-slate-400 border-slate-200 cursor-not-allowed'
                        }`}
                     >
                        <ArrowRightLeft size={16} /> 
                        Compare Models
                        {compareList.length > 0 && (
                            <span className="bg-white text-[#424651] text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                                {compareList.length}
                            </span>
                        )}
                     </button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                    {MODELS.map(model => {
                        const currentTrim = getTrim(model);
                        const isComparing = !!compareList.find(m => m.id === model.id);

                        let badgeColor: 'green' | 'orange' | 'blue' = 'green';
                        if (model.stockStatus === 'Low Stock') badgeColor = 'orange';
                        if (model.stockStatus === 'Arriving Soon') badgeColor = 'blue';

                        return (
                            <div 
                                key={model.id} 
                                className={`bg-white border rounded-[8px] overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col h-[420px] group ${
                                    isComparing ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-slate-200'
                                }`}
                            >
                                {/* Image Area with Overlay Selection for Compare */}
                                <div className={`h-48 ${model.imageColor} relative flex items-center justify-center overflow-hidden`}>
                                    {model.imageUrl ? (
                                        <img 
                                            src={model.imageUrl} 
                                            alt={model.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-slate-400/50 font-bold text-4xl select-none">{model.brand}</span>
                                    )}
                                    
                                    <div className="absolute top-3 left-3 z-10">
                                        <Badge label={model.stockStatus} color={badgeColor} variant="solid" />
                                    </div>

                                    {/* Compare Checkbox */}
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCompare(model);
                                        }}
                                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm z-10 ${
                                            isComparing 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-white/80 text-slate-400 hover:bg-white hover:text-indigo-600'
                                        }`}
                                        title="Add to Compare"
                                    >
                                        <CheckSquare size={18} />
                                    </button>
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
                                        <button 
                                            onClick={() => onSelect(model, currentTrim)}
                                            className="w-full py-2.5 bg-[#424651] rounded-[6px] text-xs font-bold text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
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

            {/* Comparison Modal */}
            {isCompareOpen && (
                <ComparisonModal 
                    selectedModels={compareList} 
                    onClose={() => setIsCompareOpen(false)}
                    onConfigure={(model) => {
                        setIsCompareOpen(false);
                        onSelect(model, model.trims[0]);
                    }}
                />
            )}
        </div>
    );
};
