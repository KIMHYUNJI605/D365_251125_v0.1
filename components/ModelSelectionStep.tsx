import React, { useState } from 'react';
import { VehicleModel, Trim } from '../types';
import { Badge } from './ui/Badge';
import { ChevronRight, ArrowRightLeft, CheckSquare, Search, Filter, Car } from 'lucide-react';
import { ComparisonModal } from './ComparisonModal';

// --- DATASET FROM PROMPT ---
const RAW_DATA = {
  "models": [
    {
      "modelId": "bmw_i4",
      "brand": "BMW",
      "name": "BMW i4 eDrive35",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35-1.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i4%20eDrive35-1.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i4_edrive35", "name": "eDrive35", "price": 52000000 }
      ]
    },
    {
      "modelId": "bmw_i7",
      "brand": "BMW",
      "name": "BMW i7 eDrive50",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-01.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-03.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i7%20eDrive50-04.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i7_edrive50", "name": "eDrive50", "price": 160000000 }
      ]
    },
    {
      "modelId": "bmw_i5",
      "brand": "BMW",
      "name": "BMW i5 G60",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5-G60.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5-G60.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5-G60.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i5_g60", "name": "i5 G60", "price": 73000000 }
      ]
    },
    {
      "modelId": "porsche_cayenne_gt",
      "brand": "Porsche",
      "name": "Porsche Cayenne GT",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_gt.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_gt.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_cayenne_gt", "name": "GT", "price": 150000000 }
      ]
    },
    {
      "modelId": "porsche_cayenne_s",
      "brand": "Porsche",
      "name": "Porsche Cayenne S",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_s.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne_s.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_cayenne_s", "name": "S", "price": 110000000 }
      ]
    },
    {
      "modelId": "porsche_cayenne_turbo",
      "brand": "Porsche",
      "name": "Porsche Cayenne Turbo",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-01.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Porsche%20Cayenne%20Turbo-03.png"
        ]
      },
      "trims": [
        { "trimId": "p_cayenne_turbo", "name": "Turbo", "price": 180000000 }
      ]
    },
    {
      "modelId": "porsche_panamera_base",
      "brand": "Porsche",
      "name": "Porsche Panamera Base",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_base.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_base.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_panamera_base", "name": "Base", "price": 120000000 }
      ]
    },
    {
      "modelId": "porsche_panamera_4s",
      "brand": "Porsche",
      "name": "Porsche Panamera 4S",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_4s.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_4s.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_panamera_4s", "name": "4S", "price": 140000000 }
      ]
    },
    {
      "modelId": "porsche_panamera_gts",
      "brand": "Porsche",
      "name": "Porsche Panamera GTS",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_gts.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_gts.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_panamera_gts", "name": "GTS", "price": 170000000 }
      ]
    },
    {
      "modelId": "porsche_panamera_turbos",
      "brand": "Porsche",
      "name": "Porsche Panamera Turbo S",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_turbo%20s.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Panamera_turbo%20s.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p_panamera_turbos", "name": "Turbo S", "price": 210000000 }
      ]
    }
  ]
};

// Map Raw Data to Application Types
const MODELS: VehicleModel[] = RAW_DATA.models.map(m => ({
    id: m.modelId,
    brand: m.brand,
    name: m.name,
    basePrice: m.trims[0].price,
    images: m.images,
    imageUrl: m.images.thumbnail, // Fallback for legacy components
    trims: m.trims.map(t => ({
        id: t.trimId,
        name: t.name,
        price: t.price
    })),
    stockStatus: 'In Stock', // Mocked as dataset doesn't have it
    specs: { hp: 0, mpg: 'N/A', zeroSixty: 'N/A' } // Mocked
}));

interface Props {
    onSelect: (model: VehicleModel, trim: Trim) => void;
}

export const ModelSelectionStep: React.FC<Props> = ({ onSelect }) => {
    const [compareList, setCompareList] = useState<VehicleModel[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleCompare = (model: VehicleModel) => {
        if (compareList.find(m => m.id === model.id)) {
            setCompareList(prev => prev.filter(m => m.id !== model.id));
        } else {
            if (compareList.length < 4) {
                setCompareList(prev => [...prev, model]);
            }
        }
    };

    const filteredModels = MODELS.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatPrice = (price: number) => {
        // Simple currency formatter
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW' }).format(price).replace('KRW', '₩');
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 font-sans">
            
            {/* Header */}
            <div className="shrink-0 px-8 py-6 border-b border-slate-800 flex justify-between items-end bg-slate-900 shadow-md z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Car size={20} className="text-[#3FE0C5]" />
                        <span className="text-xs font-bold text-[#3FE0C5] uppercase tracking-widest">Configu</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Select Your Vehicle</h1>
                    <p className="text-slate-400 mt-1 text-sm">Choose a model to begin configuration.</p>
                </div>
                
                <div className="flex items-center gap-4">
                     {/* Search */}
                     <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#3FE0C5] transition-colors" size={16} />
                        <input 
                           type="text" 
                           placeholder="Search models..." 
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-[6px] text-sm text-white focus:outline-none focus:border-[#3FE0C5] focus:ring-1 focus:ring-[#3FE0C5] w-64 transition-all placeholder:text-slate-500"
                        />
                     </div>

                     {/* Compare Button */}
                     <button 
                        onClick={() => compareList.length > 0 && setIsCompareOpen(true)}
                        disabled={compareList.length === 0}
                        className={`px-4 py-2 border rounded-[6px] text-sm font-bold transition-all flex items-center gap-2 ${
                            compareList.length > 0 
                            ? 'bg-[#3FE0C5] text-slate-900 border-[#3FE0C5] hover:bg-[#32b29d]' 
                            : 'bg-transparent text-slate-600 border-slate-800 cursor-not-allowed'
                        }`}
                     >
                        <ArrowRightLeft size={16} /> 
                        Compare
                        {compareList.length > 0 && (
                            <span className="bg-slate-900 text-[#3FE0C5] text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center font-extrabold">
                                {compareList.length}
                            </span>
                        )}
                     </button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                    {filteredModels.map(model => {
                        const isComparing = !!compareList.find(m => m.id === model.id);

                        return (
                            <div 
                                key={model.id} 
                                className={`bg-slate-900 border rounded-[12px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group relative ${
                                    isComparing ? 'ring-2 ring-[#3FE0C5] border-[#3FE0C5]' : 'border-slate-800 hover:border-slate-600'
                                }`}
                            >
                                {/* Compare Checkbox (Absolute) */}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCompare(model);
                                    }}
                                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm z-20 ${
                                        isComparing 
                                        ? 'bg-[#3FE0C5] text-slate-900' 
                                        : 'bg-slate-950/50 text-slate-400 hover:bg-slate-900 hover:text-[#3FE0C5] border border-white/10'
                                    }`}
                                    title="Add to Compare"
                                >
                                    <CheckSquare size={16} />
                                </button>

                                {/* Image Area */}
                                <div className="h-48 relative bg-slate-950 flex items-center justify-center overflow-hidden">
                                    {model.images?.thumbnail ? (
                                        <img 
                                            src={model.images.thumbnail} 
                                            alt={model.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <span className="text-slate-700 font-bold text-4xl select-none">{model.brand}</span>
                                    )}
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between -mt-10 relative z-10">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-xs font-bold text-[#3FE0C5] uppercase tracking-wider shadow-black drop-shadow-md">{model.brand}</h3>
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-4 leading-tight shadow-black drop-shadow-md">{model.name}</h2>
                                        
                                        {/* Trims List */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Available Trims</label>
                                            {model.trims.map(trim => (
                                                <button
                                                    key={trim.id}
                                                    onClick={() => onSelect(model, trim)}
                                                    className="w-full flex items-center justify-between p-3 rounded-[8px] bg-slate-800 border border-slate-700 hover:border-[#3FE0C5] hover:bg-slate-800/80 transition-all group/trim text-left"
                                                >
                                                    <span className="text-sm font-bold text-slate-300 group-hover/trim:text-white transition-colors">{trim.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium text-slate-400">{formatPrice(trim.price)}</span>
                                                        <ChevronRight size={14} className="text-slate-600 group-hover/trim:text-[#3FE0C5]" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
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