import React, { useState, useMemo } from 'react';
import { VehicleModel, Trim } from '../types';
import { Badge } from './ui/Badge';
import { 
    ChevronRight, ArrowRightLeft, CheckSquare, Search, Filter, 
    Car, Users, LogOut, UserCheck, Sparkles, ChevronDown, CheckCircle,
    LayoutGrid, List as ListIcon, ArrowRight, Mic, Camera, ChevronUp
} from 'lucide-react';
import { ComparisonModal } from './ComparisonModal';
import { TopFilterBar } from './filters/TopFilterBar';
import { ModelCard } from './model/ModelCard';
import { TrimDrawer } from './model/TrimDrawer';
import { TrimComparisonModal } from './model/TrimComparisonModal';

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
        { "trimId": "bmw_i4_edrive35_std", "name": "eDrive35 Standard", "price": 52000000 },
        { "trimId": "bmw_i4_edrive35_premium", "name": "eDrive35 Premium", "price": 56000000 }
      ]
    },
    {
      "modelId": "bmw_i5_edrive40",
      "brand": "BMW",
      "name": "BMW i5 eDrive40",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20eDrive40.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i5_edrive40_std", "name": "eDrive40 Standard", "price": 73000000 },
        { "trimId": "bmw_i5_edrive40_sport", "name": "eDrive40 Sport", "price": 78000000 }
      ]
    },
    {
      "modelId": "bmw_i5_m60",
      "brand": "BMW",
      "name": "BMW i5 M60 xDrive",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%20i5%20M60%20xDrive.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_i5_m60_base", "name": "M60 Base", "price": 98000000 },
        { "trimId": "bmw_i5_m60_performance", "name": "M60 Performance", "price": 103000000 }
      ]
    },
    {
      "modelId": "bmw_i7_edrive50",
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
        { "trimId": "bmw_i7_edrive50_lux", "name": "eDrive50 Luxury", "price": 160000000 },
        { "trimId": "bmw_i7_edrive50_exec", "name": "eDrive50 Executive", "price": 168000000 }
      ]
    },
    {
      "modelId": "bmw_530i",
      "brand": "BMW",
      "name": "BMW 5 Series 530i",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/BMW%205%20Series%20530i.png"
        ]
      },
      "trims": [
        { "trimId": "bmw_530i_std", "name": "530i Standard", "price": 72000000 },
        { "trimId": "bmw_530i_msport", "name": "530i M-Sport", "price": 76000000 }
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
        { "trimId": "pc_s_base", "name": "Cayenne S Base", "price": 110000000 },
        { "trimId": "pc_s_premium", "name": "Cayenne S Premium", "price": 118000000 }
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
        { "trimId": "pc_turbo_std", "name": "Turbo Standard", "price": 180000000 },
        { "trimId": "pc_turbo_gt", "name": "Turbo GT Package", "price": 195000000 }
      ]
    },
    {
      "modelId": "porsche_turbo_gt",
      "brand": "Porsche",
      "name": "Porsche Cayenne Turbo GT",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne%20Turbo%20GT.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/Cayenne%20Turbo%20GT.png",
        "angles": []
      },
      "trims": [
        { "trimId": "pc_tgt_base", "name": "Turbo GT Base", "price": 210000000 },
        { "trimId": "pc_tgt_track", "name": "Turbo GT Track Edition", "price": 225000000 }
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
        { "trimId": "pp_base", "name": "Panamera Base", "price": 120000000 },
        { "trimId": "pp_premium", "name": "Panamera Premium", "price": 132000000 }
      ]
    },
    {
      "modelId": "porsche_911_carrera",
      "brand": "Porsche",
      "name": "Porsche 911 Carrera",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/911%20Carrera.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/911%20Carrera.png",
        "angles": []
      },
      "trims": [
        { "trimId": "p911_carrera_base", "name": "Carrera Base", "price": 150000000 },
        { "trimId": "p911_carrera_sport", "name": "Carrera Sport", "price": 165000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_blue",
      "brand": "Toyota",
      "name": "Toyota Highlander (Blue)",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_blue_std", "name": "Highlander Standard", "price": 45000000 },
        { "trimId": "hl_blue_limited", "name": "Highlander Limited", "price": 49000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_gray",
      "brand": "Toyota",
      "name": "Toyota Highlander (Gray)",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander02.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander02.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_gray_std", "name": "Highlander Standard", "price": 46000000 },
        { "trimId": "hl_gray_limited", "name": "Highlander Limited", "price": 50000000 }
      ]
    },
    {
      "modelId": "toyota_highlander_xse",
      "brand": "Toyota",
      "name": "Toyota Highlander XSE",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander03.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Highlander03.png",
        "angles": []
      },
      "trims": [
        { "trimId": "hl_xse_std", "name": "Highlander XSE", "price": 52000000 },
        { "trimId": "hl_xse_sport", "name": "Highlander XSE Sport", "price": 55000000 }
      ]
    },
    {
      "modelId": "toyota_grand_highlander",
      "brand": "Toyota",
      "name": "Toyota Grand Highlander",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Grand%20Highlander.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20Grand%20Highlander.png",
        "angles": []
      },
      "trims": [
        { "trimId": "gh_std", "name": "Grand Highlander Standard", "price": 58000000 },
        { "trimId": "gh_lux", "name": "Grand Highlander Luxury", "price": 62000000 }
      ]
    },
    {
      "modelId": "toyota_crown_signia",
      "brand": "Toyota",
      "name": "Toyota Crown Signia",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20TOYOTA%20CROWN%20SIGNIA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20TOYOTA%20CROWN%20SIGNIA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "signia_std", "name": "Signia Standard", "price": 51000000 },
        { "trimId": "signia_platinum", "name": "Signia Platinum", "price": 56000000 }
      ]
    },
    {
      "modelId": "hyundai_kona",
      "brand": "Hyundai",
      "name": "Hyundai 2026 KONA",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20KONA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20KONA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "kona_std", "name": "KONA Standard", "price": 28000000 },
        { "trimId": "kona_nline", "name": "KONA N-Line", "price": 32000000 }
      ]
    },
    {
      "modelId": "hyundai_elantra",
      "brand": "Hyundai",
      "name": "Hyundai 2026 ELANTRA",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20ELANTRA.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20ELANTRA.png",
        "angles": []
      },
      "trims": [
        { "trimId": "elantra_std", "name": "ELANTRA Standard", "price": 23000000 },
        { "trimId": "elantra_sport", "name": "ELANTRA Sport", "price": 27000000 }
      ]
    },
    {
      "modelId": "hyundai_santafe_hybrid",
      "brand": "Hyundai",
      "name": "Hyundai 2026 SANTA FE Hybrid",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20SANTA%20FE%20Hybrid.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/2026%20SANTA%20FE%20Hybrid.png",
        "angles": []
      },
      "trims": [
        { "trimId": "santafe_hyb_std", "name": "SANTA FE Hybrid Standard", "price": 36000000 },
        { "trimId": "santafe_hyb_limited", "name": "SANTA FE Hybrid Limited", "price": 39000000 }
      ]
    },
    {
      "modelId": "hyundai_tucson_hybrid",
      "brand": "Hyundai",
      "name": "Hyundai TUCSON Hybrid",
      "images": {
        "thumbnail": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid.png",
        "hero": "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid.png",
        "angles": [
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid02.png",
          "https://raw.githubusercontent.com/KIMHYUNJI605/D365_251125_v0.1/main/TUCSON%20Hybrid003.png"
        ]
      },
      "trims": [
        { "trimId": "tucson_hybrid_std", "name": "TUCSON Hybrid Standard", "price": 31000000 },
        { "trimId": "tucson_hybrid_lux", "name": "TUCSON Hybrid Luxury", "price": 34000000 }
      ]
    }
  ]
};

// --- CONSTANTS ---
const BODY_TYPES = ['All', 'Sedan', 'SUV', 'Coupe', 'Sports Car'];
const POWERTRAINS = ['All', 'EV', 'Hybrid', 'Gasoline'];
const BUDGETS = ['All', '< 60M', '60M - 100M', '> 100M'];
const NEO_MINT = '#3FE0C5';

// --- HELPERS ---
const getYearFromModelName = (name: string): string => {
    const match = name.match(/\b202[0-9]\b/);
    return match ? match[0] : '2026'; // Default fallback year based on dataset trends
};

// --- DATA PROCESSING ---

// 1. Map Data & Inject Dummy Trims
const MODELS: VehicleModel[] = RAW_DATA.models.map(m => {
    const nameLower = m.name.toLowerCase();
    const isEV = nameLower.includes('i4') || nameLower.includes('i5') || nameLower.includes('i7') || nameLower.includes('electric');
    const isHybrid = nameLower.includes('hybrid');
    const isSUV = nameLower.includes('cayenne') || nameLower.includes('highlander') || nameLower.includes('tucson') || nameLower.includes('santa fe') || nameLower.includes('kona') || nameLower.includes('x5');
    const isCoupe = nameLower.includes('911') || nameLower.includes('coupe');
    const isInventory = Math.random() > 0.6; // Demo inventory status

    let trims = m.trims.map(t => ({
        id: t.trimId,
        name: t.name,
        price: t.price
    }));

    const basePrice = trims[0]?.price || 50000000;

    // --- DUMMY TRIM INJECTION LOGIC (Ensuring sufficient trims for demo) ---
    if (m.modelId.includes('i7')) {
        while(trims.length < 4) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `M Sport Pro ${trims.length}`, price: basePrice + trims.length * 5000000 });
    }
    else if (m.modelId.includes('i5')) {
        while(trims.length < 3) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `xDrive Sport ${trims.length}`, price: basePrice + trims.length * 4000000 });
    }
    else if (m.modelId.includes('highlander') && !m.modelId.includes('grand')) {
        while(trims.length < 3) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Platinum ${trims.length}`, price: basePrice + trims.length * 3000000 });
    }
    else if (m.modelId.includes('grand_highlander')) {
        while(trims.length < 4) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Hybrid Max ${trims.length}`, price: basePrice + trims.length * 3500000 });
    }
    else if (m.modelId.includes('kona')) {
         while(trims.length < 3) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Limited ${trims.length}`, price: basePrice + trims.length * 2500000 });
    }
    else if (m.modelId.includes('elantra')) {
         while(trims.length < 4) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `N-Line ${trims.length}`, price: basePrice + trims.length * 2000000 });
    }
    else if (m.modelId.includes('santafe')) {
         while(trims.length < 5) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Calligraphy ${trims.length}`, price: basePrice + trims.length * 3000000 });
    }
    else if (m.modelId.includes('cayenne') && !m.modelId.includes('gt')) {
        while(trims.length < 3) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Platinum Edition ${trims.length}`, price: basePrice + trims.length * 10000000 });
    }
    else if (m.modelId.includes('panamera')) {
        while(trims.length < 4) trims.push({ id: `${m.modelId}_dummy_${trims.length}`, name: `Executive ${trims.length}`, price: basePrice + trims.length * 12000000 });
    }

    if (trims.length === 1) {
         trims.push({ id: `${m.modelId}_dummy_adv`, name: 'Advanced Package', price: basePrice * 1.1 });
    }

    return {
        id: m.modelId,
        brand: m.brand,
        name: m.name,
        basePrice: basePrice,
        images: m.images,
        imageUrl: m.images.thumbnail, 
        trims: trims,
        stockStatus: isInventory ? 'In Stock' : 'Arriving Soon', 
        specs: { hp: 0, mpg: 'N/A', zeroSixty: 'N/A' },
        bodyType: isSUV ? 'SUV' : isCoupe ? 'Coupe' : 'Sedan',
        powertrain: isEV ? 'EV' : isHybrid ? 'Hybrid' : 'Gasoline',
        isInventory: isInventory
    };
});

interface Props {
    onSelect: (model: VehicleModel, trim: Trim) => void;
    onNavigate: (view: 'dashboard' | 'deals' | 'config') => void;
}

export const ModelSelectionStep: React.FC<Props> = ({ onSelect, onNavigate }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter States
    const [brandFilter, setBrandFilter] = useState('All');
    const [bodyFilter, setBodyFilter] = useState('All');
    const [powerFilter, setPowerFilter] = useState('All');
    const [budgetFilter, setBudgetFilter] = useState('All');
    const [inventoryOnly, setInventoryOnly] = useState(false);

    // Compare Logic
    const [compareList, setCompareList] = useState<VehicleModel[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    // Trim Comparison Logic
    const [trimCompareModel, setTrimCompareModel] = useState<VehicleModel | null>(null);

    // Drawer State
    const [drawerModel, setDrawerModel] = useState<VehicleModel | null>(null);

    const toggleCompare = (model: VehicleModel) => {
        if (compareList.find(m => m.id === model.id)) {
            setCompareList(prev => prev.filter(m => m.id !== model.id));
        } else {
            if (compareList.length < 4) {
                setCompareList(prev => [...prev, model]);
            }
        }
    };

    const handleCardSelect = (model: VehicleModel) => {
        if (model.trims.length === 1) {
            onSelect(model, model.trims[0]);
        } else {
            setDrawerModel(model);
        }
    };

    const filteredModels = useMemo(() => {
        return MODELS.filter(m => {
            if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (brandFilter !== 'All' && m.brand !== brandFilter) return false;
            if (bodyFilter !== 'All' && m.bodyType !== bodyFilter) return false;
            if (powerFilter !== 'All' && m.powertrain !== powerFilter) return false;
            if (inventoryOnly && !m.isInventory) return false;
            if (budgetFilter !== 'All') {
                const price = m.basePrice;
                if (budgetFilter === '< 60M' && price >= 60000000) return false;
                if (budgetFilter === '60M - 100M' && (price < 60000000 || price > 100000000)) return false;
                if (budgetFilter === '> 100M' && price <= 100000000) return false;
            }
            return true;
        });
    }, [searchQuery, brandFilter, bodyFilter, powerFilter, budgetFilter, inventoryOnly]);

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 font-sans overflow-hidden">
            
            {/* 1. CONFIGU HEADER */}
            <div className="shrink-0 h-[64px] bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 z-30 relative shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        <span className="font-black text-white text-sm">D</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-none">Dealer365</span>
                        <span className={`text-[10px] font-bold text-[${NEO_MINT}] uppercase tracking-wider leading-none mt-0.5`}>Configu Mode</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-[${NEO_MINT}]/10 border border-[${NEO_MINT}]/50 text-[${NEO_MINT}] text-xs font-bold hover:bg-[${NEO_MINT}]/20 transition-all`}
                        onClick={() => {}}
                    >
                        <Sparkles size={14} />
                        AI Advisor
                    </button>
                    <div className="h-6 w-px bg-slate-800"></div>
                    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Customer Check-in">
                        <UserCheck size={18} />
                    </button>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button onClick={() => onNavigate('dashboard')} className="px-3 py-1 rounded text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors">CRM</button>
                        <button className="px-3 py-1 rounded bg-slate-800 text-white text-[10px] font-bold shadow-sm">Config</button>
                    </div>
                </div>
            </div>

            {/* 2. TITLE & FILTER BAR */}
            <TopFilterBar 
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                viewMode={viewMode} setViewMode={setViewMode}
                brandFilter={brandFilter} setBrandFilter={setBrandFilter}
                bodyFilter={bodyFilter} setBodyFilter={setBodyFilter}
                powerFilter={powerFilter} setPowerFilter={setPowerFilter}
                budgetFilter={budgetFilter} setBudgetFilter={setBudgetFilter}
                inventoryOnly={inventoryOnly} setInventoryOnly={setInventoryOnly}
                compareList={compareList} onCompare={() => setIsCompareOpen(true)}
            />

            {/* 3. MODEL GRID/LIST */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-950">
                <div className={`grid gap-6 pb-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {filteredModels.map(model => (
                        <ModelCard 
                            key={model.id} 
                            model={model} 
                            viewMode={viewMode}
                            isComparing={!!compareList.find(m => m.id === model.id)}
                            onToggleCompare={toggleCompare}
                            onSelect={handleCardSelect}
                            onCompareTrims={(m) => setTrimCompareModel(m)}
                        />
                    ))}
                </div>
            </div>

            {/* MODALS / DRAWERS */}
            {isCompareOpen && (
                <ComparisonModal 
                    selectedModels={compareList} 
                    availableModels={MODELS} // Passing full list for Add Drawer
                    onClose={() => setIsCompareOpen(false)}
                    onConfigure={(model) => {
                        setIsCompareOpen(false);
                        handleCardSelect(model);
                    }}
                />
            )}
            
            {trimCompareModel && (
                <TrimComparisonModal 
                    model={trimCompareModel}
                    onClose={() => setTrimCompareModel(null)}
                    onSelectTrim={(trim) => {
                        setTrimCompareModel(null);
                        onSelect(trimCompareModel, trim);
                    }}
                />
            )}
            
            <TrimDrawer 
                model={drawerModel}
                isOpen={!!drawerModel}
                onClose={() => setDrawerModel(null)}
                onSelect={(m, t) => {
                    setDrawerModel(null);
                    onSelect(m, t);
                }}
            />
        </div>
    );
};