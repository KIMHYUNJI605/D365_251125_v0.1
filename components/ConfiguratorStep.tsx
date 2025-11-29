import React, { useState, useEffect } from 'react';
import { VehicleModel, Trim, ConfigOption } from '../types';
import { 
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
    RotateCw, Info, Check, Sparkles, AlertTriangle, 
    Layers, Palette, Circle, Package, Sliders, 
    Zap, Shield, Music, Grid, Sun, Aperture, 
    Power, Lightbulb, Disc, Thermometer, X,
    Maximize2, ArrowLeft, ArrowRight,
    Car, Armchair, CarFront, Move3d, LogOut,
    Settings, Gauge, Activity, List
} from 'lucide-react';

// --- COLORS ---
const NEO_MINT = '#3FE0C5';

// --- MOCK OPTIONS DATA ---
const ENGINES: ConfigOption[] = [
    { id: 'eng_base', name: '3.0L Turbo V6', price: 0, type: 'package', description: '335 hp | 332 lb-ft' },
    { id: 'eng_s', name: '2.9L Twin-Turbo V6', price: 8000, type: 'package', description: '434 hp | 405 lb-ft' },
    { id: 'eng_turbo', name: '4.0L Twin-Turbo V8', price: 24000, type: 'package', description: '541 hp | 567 lb-ft' },
];

const TRANSMISSIONS: ConfigOption[] = [
    { id: 'trans_auto', name: '8-Speed Tiptronic S', price: 0, type: 'package' },
    { id: 'trans_pdk', name: '8-Speed PDK', price: 0, type: 'package' },
];

const EXTERIOR_PAINTS: ConfigOption[] = [
    { id: 'paint_black', name: 'Jet Black', price: 0, type: 'color', value: '#000000' },
    { id: 'paint_white', name: 'Carrara White', price: 0, type: 'color', value: '#F5F5F5' },
    { id: 'paint_grey', name: 'Volcano Grey', price: 800, type: 'color', value: '#4B5563' },
    { id: 'paint_silver', name: 'Dolomite Silver', price: 800, type: 'color', value: '#D1D5DB' },
    { id: 'paint_blue', name: 'Gentian Blue', price: 1200, type: 'color', value: '#1E3A8A' },
    { id: 'paint_red', name: 'Carmine Red', price: 3200, type: 'color', value: '#B91C1C' },
    { id: 'paint_mint', name: 'Neo Mint Special', price: 4500, type: 'color', value: '#3FE0C5' },
    { id: 'paint_crayon', name: 'Crayon', price: 3200, type: 'color', value: '#9CA3AF' },
];

const WHEELS: ConfigOption[] = [
    { id: 'w19', name: '19" Standard Aero', price: 0, type: 'wheel' },
    { id: 'w20', name: '20" Sport Design', price: 2100, type: 'wheel' },
    { id: 'w21', name: '21" RS Spyder', price: 3800, type: 'wheel' },
    { id: 'w21_ex', name: '21" Exclusive Design', price: 4200, type: 'wheel' },
];

const INTERIOR_UPHOLSTERY: ConfigOption[] = [
    { id: 'uph_black', name: 'Black Leather', price: 0, type: 'interior', value: '#111827' },
    { id: 'uph_beige', name: 'Mojave Beige', price: 0, type: 'interior', value: '#D2B48C' },
    { id: 'uph_red', name: 'Bordeaux Red', price: 4200, type: 'interior', value: '#7F1D1D' },
    { id: 'uph_brown', name: 'Truffle Brown', price: 5500, type: 'interior', value: '#5D4037' },
];

const INTERIOR_TRIM: ConfigOption[] = [
    { id: 'trim_piano', name: 'High Gloss Black', price: 0, type: 'interior' },
    { id: 'trim_carbon', name: 'Carbon Fiber', price: 1800, type: 'interior' },
    { id: 'trim_wood', name: 'Dark Walnut', price: 1200, type: 'interior' },
];

const PACKAGES_TECH = [
    { id: 'tech_hud', name: 'Head-Up Display', price: 1500, type: 'package' },
    { id: 'tech_sound', name: 'Burmester 3D Sound', price: 5800, type: 'package' },
];

const PACKAGES_SAFETY = [
    { id: 'safe_lca', name: 'Lane Change Assist', price: 900, type: 'package' },
    { id: 'safe_surround', name: 'Surround View', price: 1200, type: 'package' },
    { id: 'safe_innodrive', name: 'InnoDrive + ACC', price: 2800, type: 'package' },
];

const PACKAGES_COMFORT = [
    { id: 'comf_seats', name: '14-Way Power Seats', price: 1400, type: 'package' },
    { id: 'comf_vent', name: 'Seat Ventilation', price: 850, type: 'package' },
    { id: 'comf_massage', name: 'Massage Function', price: 1800, type: 'package' },
];

const ACCESSORIES = [
    { id: 'acc_roof', name: 'Roof Rails Aluminum', price: 400, type: 'accessory' },
    { id: 'acc_mats', name: 'All-Weather Mats', price: 250, type: 'accessory' },
    { id: 'acc_rack', name: 'Bicycle Rack', price: 600, type: 'accessory' },
];

// --- 3D INTERACTION POINTS ---
const POINTS_HIGHLIGHTS = [
    { id: 1, x: 25, y: 45, title: 'Matrix LED', desc: '84 pixel elements.' },
    { id: 2, x: 62, y: 65, title: '21" Forged', desc: 'Lightweight alloy.' },
    { id: 3, x: 45, y: 20, title: 'Panoramic', desc: 'Fixed glass roof.' },
];

const POINTS_FEATURES = [
    { id: 10, x: 25, y: 45, title: 'Headlights', desc: 'Toggle beam animation.' },
    { id: 11, x: 50, y: 50, title: 'Door', desc: 'Open/Close driver door.' },
    { id: 12, x: 80, y: 45, title: 'Trunk', desc: 'Open/Close rear lid.' },
    { id: 13, x: 62, y: 65, title: 'Wheels', desc: 'Rotate wheel view.' },
];

// --- HELPER COMPONENTS ---

// Ghost Accordion Header
const GhostAccordion: React.FC<{ 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    children: React.ReactNode 
}> = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-slate-800/50 last:border-0">
        <button 
            onClick={onToggle} 
            className="w-full py-4 flex items-center justify-between text-slate-300 hover:text-white transition-colors group px-2"
        >
            <span className={`text-[15px] font-semibold tracking-wide ${isOpen ? 'text-[#3FE0C5]' : 'group-hover:text-white'}`}>
                {title}
            </span>
            {isOpen 
                ? <ChevronUp size={18} className="text-[#3FE0C5]" /> 
                : <ChevronDown size={18} className="text-slate-500 group-hover:text-white" />
            }
        </button>
        <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pb-6 pt-1 px-1 space-y-3">
                {children}
            </div>
        </div>
    </div>
);

// Standard Card (Trim / Engine)
const TextCard: React.FC<{ 
    label: string; 
    price: number; 
    active: boolean; 
    onClick: () => void; 
    description?: string;
}> = ({ label, price, active, onClick, description }) => (
    <div 
        onClick={onClick}
        className={`relative p-4 rounded-[6px] border transition-all cursor-pointer group flex flex-col justify-between min-h-[80px] ${
            active 
            ? 'border-[#3FE0C5] bg-[#3FE0C5]/5 shadow-[0_0_15px_rgba(63,224,197,0.1)]' 
            : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:shadow-lg'
        }`}
    >
        <div className="flex justify-between items-start w-full">
            <span className={`text-sm font-bold ${active ? 'text-[#3FE0C5]' : 'text-slate-200'}`}>{label}</span>
            {active && <Check size={14} className="text-[#3FE0C5]" />}
        </div>
        {description && (
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{description}</p>
        )}
        <div className="mt-2 pt-2 border-t border-slate-800/50">
            <span className={`text-xs font-semibold ${active ? 'text-[#3FE0C5]' : 'text-slate-500'}`}>
                {price === 0 ? 'Standard' : `+${price.toLocaleString()}`}
            </span>
        </div>
    </div>
);

// Color Chip
const ColorChip: React.FC<{ 
    color: string; 
    active: boolean; 
    onClick: () => void;
    name: string;
}> = ({ color, active, onClick, name }) => (
    <button 
        onClick={onClick}
        className={`w-full aspect-square rounded-full border-2 transition-all relative group ${
            active ? 'border-[#3FE0C5] scale-110 shadow-[0_0_12px_rgba(63,224,197,0.4)]' : 'border-slate-700 hover:border-slate-500 hover:scale-105'
        }`}
        style={{ backgroundColor: color }}
        title={name}
    >
        {active && <div className="absolute inset-0 flex items-center justify-center"><Check size={14} className={color === '#FFFFFF' || color === '#F5F5F5' ? 'text-black' : 'text-white'} /></div>}
    </button>
);

// Image Card (Wheels / Accessories)
const ImageCard: React.FC<{ 
    label: string; 
    price: number; 
    active: boolean; 
    onClick: () => void; 
}> = ({ label, price, active, onClick }) => (
    <div 
        onClick={onClick}
        className={`relative rounded-[6px] border transition-all cursor-pointer group overflow-hidden ${
            active 
            ? 'border-[#3FE0C5] shadow-[0_0_10px_rgba(63,224,197,0.15)]' 
            : 'border-slate-800 hover:border-slate-600'
        }`}
    >
        <div className="aspect-square bg-slate-800 relative">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                <Circle size={32} strokeWidth={1} />
            </div>
            {active && (
                <div className="absolute top-2 right-2 bg-[#3FE0C5] rounded-full p-0.5">
                    <Check size={10} className="text-black" />
                </div>
            )}
        </div>
        <div className="p-3 bg-slate-900/80">
            <p className={`text-[11px] font-bold leading-tight mb-1 ${active ? 'text-[#3FE0C5]' : 'text-slate-300'}`}>{label}</p>
            <p className="text-[10px] text-slate-500">{price === 0 ? 'Std' : `+${price.toLocaleString()}`}</p>
        </div>
    </div>
);

// Glow Pulse Point
const GlowPulsePoint: React.FC<{ 
    x: number; 
    y: number; 
    active: boolean; 
    onClick: () => void; 
    label?: string;
}> = ({ x, y, active, onClick, label }) => (
    <div 
        className="absolute z-30 group cursor-pointer" 
        style={{ left: `${x}%`, top: `${y}%` }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
        {/* Core & Pulse */}
        <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Outer Glow / Halo */}
            <div className={`absolute inset-0 rounded-full bg-[#A8F1E7] blur-md opacity-20 animate-pulse ${active ? 'opacity-40 scale-125' : ''}`}></div>
            {/* Pulse Animation Ring */}
            <div className="absolute inset-0 rounded-full border border-[#3FE0C5] opacity-50 animate-[ping_1.6s_ease-out_infinite]"></div>
            {/* Core Dot */}
            <div className={`w-3.5 h-3.5 rounded-full bg-[#3FE0C5] border-2 border-[#29BFA7] shadow-[0_0_10px_#3FE0C5] transition-transform duration-300 group-hover:scale-125 ${active ? 'scale-125 bg-white' : ''}`}></div>
        </div>
        
        {/* Hover Label (Desktop) */}
        {label && (
            <div className="absolute left-8 top-1 ml-2 px-2 py-1 bg-black/80 backdrop-blur text-[#3FE0C5] text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </div>
        )}
    </div>
);


interface Props {
    model: VehicleModel;
    trim: Trim;
    onBack: () => void;
}

export const ConfiguratorStep: React.FC<Props> = ({ model, trim, onBack }) => {
    // --- STATE ---
    // Section Visibility (Accordion)
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        '1_trim': true,
        '4_exterior': true,
        '10_summary': true // Although summary is fixed, we track it for consistency
    });

    // Configuration Selections
    const [config, setConfig] = useState({
        engine: ENGINES[0],
        transmission: TRANSMISSIONS[0],
        paint: EXTERIOR_PAINTS[0],
        wheels: WHEELS[0],
        uph: INTERIOR_UPHOLSTERY[0],
        trim: INTERIOR_TRIM[0],
        packages: [] as string[],
        accessories: [] as string[]
    });

    // Interaction Modes
    const [overlayMode, setOverlayMode] = useState<'BASE' | 'HIGHLIGHTS' | 'FEATURES'>('BASE');
    const [view, setView] = useState<'Front' | 'Side' | 'Rear' | 'Interior'>('Front');
    const [activePointId, setActivePointId] = useState<number | null>(null);

    // --- HANDLERS ---
    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateConfig = (key: keyof typeof config, value: any) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const toggleMultiSelect = (key: 'packages' | 'accessories', id: string) => {
        setConfig(prev => {
            const list = prev[key];
            return {
                ...prev,
                [key]: list.includes(id) ? list.filter(x => x !== id) : [...list, id]
            };
        });
    };

    const handleModeToggle = (mode: 'HIGHLIGHTS' | 'FEATURES') => {
        if (overlayMode === mode) {
            setOverlayMode('BASE');
        } else {
            setOverlayMode(mode);
        }
        setActivePointId(null);
    };

    const handleViewChange = (newView: typeof view) => {
        setView(newView);
        if (newView === 'Interior') {
            setOverlayMode('BASE');
        }
    };

    // --- CALCULATIONS ---
    const calculateTotal = () => {
        let total = trim.price;
        total += config.engine.price;
        total += config.transmission.price;
        total += config.paint.price;
        total += config.wheels.price;
        total += config.uph.price;
        total += config.trim.price;
        
        // Sum packages
        const allPackages = [...PACKAGES_TECH, ...PACKAGES_SAFETY, ...PACKAGES_COMFORT];
        config.packages.forEach(pid => {
            const p = allPackages.find(x => x.id === pid);
            if(p) total += p.price;
        });

        // Sum accessories
        config.accessories.forEach(aid => {
            const a = ACCESSORIES.find(x => x.id === aid);
            if(a) total += a.price;
        });

        return total;
    };

    const totalPrice = calculateTotal();
    const optionsTotal = totalPrice - trim.price;

    return (
        <div className="flex flex-col h-full bg-slate-950 overflow-hidden text-slate-200 font-sans selection:bg-[#3FE0C5] selection:text-slate-900">
            
            {/* 1. HEADER */}
            <header className="h-[72px] bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 shrink-0 z-50 relative shadow-md">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-white tracking-tight leading-none">
                        {model.brand} <span className="font-light text-slate-400">{model.name}</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3FE0C5] shadow-[0_0_6px_#3FE0C5]"></span>
                        <span className="text-[10px] font-bold text-[#3FE0C5] uppercase tracking-[0.15em]">{trim.name}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="px-5 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                        Change Model
                    </button>
                    <div className="h-6 w-px bg-slate-800"></div>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#3FE0C5] transition-colors">
                        <LogOut size={16} /> Switch to CRM
                    </button>
                </div>
            </header>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden relative flex-row">
                
                {/* 3D VIEW REGION */}
                <div className="flex-1 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden flex items-center justify-center">
                    
                    {/* Simulated 3D Model */}
                    <div className="relative w-full h-full max-w-[1400px]">
                        {model.imageUrl ? (
                            <img 
                                src={model.imageUrl} 
                                alt="3D View" 
                                className={`w-full h-full object-cover transition-opacity duration-[400ms] ${view === 'Interior' ? 'scale-110' : 'scale-100'}`}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Car size={120} className="text-slate-800 opacity-20" />
                            </div>
                        )}
                        {/* Paint Overlay */}
                        <div 
                            className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none transition-colors duration-[400ms]" 
                            style={{ backgroundColor: config.paint.value }} 
                        />
                    </div>

                    {/* 8.1 KSP + FEATURES TOGGLES (Top Right) */}
                    <div className="absolute top-6 right-6 flex gap-2 z-40">
                        <button 
                            onClick={() => handleModeToggle('HIGHLIGHTS')}
                            className={`px-4 py-2 rounded-l-full backdrop-blur-md border border-r-0 transition-all flex items-center gap-2 ${
                                overlayMode === 'HIGHLIGHTS' 
                                ? 'bg-slate-900/90 border-[#3FE0C5] text-[#3FE0C5]' 
                                : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900/60'
                            }`}
                        >
                            <Info size={16} strokeWidth={2} />
                            <span className="text-xs font-bold">Highlights</span>
                        </button>
                        <button 
                            onClick={() => handleModeToggle('FEATURES')}
                            className={`px-4 py-2 rounded-r-full backdrop-blur-md border border-l-0 transition-all flex items-center gap-2 ${
                                overlayMode === 'FEATURES' 
                                ? 'bg-slate-900/90 border-[#3FE0C5] text-[#3FE0C5]' 
                                : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900/60'
                            }`}
                        >
                            <Sparkles size={16} strokeWidth={2} />
                            <span className="text-xs font-bold">Features</span>
                        </button>
                    </div>

                    {/* 9. GLOW PULSE POINTS (Overlay) */}
                    {(overlayMode === 'HIGHLIGHTS' ? POINTS_HIGHLIGHTS : overlayMode === 'FEATURES' ? POINTS_FEATURES : []).map(p => (
                        <GlowPulsePoint 
                            key={p.id} 
                            x={p.x} 
                            y={p.y} 
                            active={activePointId === p.id} 
                            onClick={() => setActivePointId(activePointId === p.id ? null : p.id)}
                            label={p.title}
                        />
                    ))}

                    {/* Active Point Popover */}
                    {activePointId && (
                        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
                            <div className="bg-slate-900/90 backdrop-blur-xl border border-[#3FE0C5]/30 p-4 rounded-xl shadow-2xl w-64 text-center">
                                <h4 className="text-sm font-bold text-white mb-1">
                                    {(overlayMode === 'HIGHLIGHTS' ? POINTS_HIGHLIGHTS : POINTS_FEATURES).find(p => p.id === activePointId)?.title}
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    {(overlayMode === 'HIGHLIGHTS' ? POINTS_HIGHLIGHTS : POINTS_FEATURES).find(p => p.id === activePointId)?.desc}
                                </p>
                                <button onClick={() => setActivePointId(null)} className="absolute top-2 right-2 text-slate-500 hover:text-white">
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 8.2 BOTTOM NAVIGATION (Camera Views) */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                        <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 h-[52px]">
                            {[
                                { id: 'Front', icon: CarFront },
                                { id: 'Side', icon: Car },
                                { id: 'Rear', icon: Car },
                                { id: 'Interior', icon: Armchair }
                            ].map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => handleViewChange(v.id as any)}
                                    className={`h-full px-5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                        view === v.id 
                                        ? 'bg-[#3FE0C5] text-slate-900 shadow-[0_0_15px_rgba(63,224,197,0.2)]' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <v.icon size={18} strokeWidth={1.75} />
                                    <span>{v.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* OPTIONS PANEL (Right Side, Fixed 360px) */}
                <div className="w-[360px] flex flex-col border-l border-slate-800 bg-slate-900 relative z-20 shrink-0 shadow-2xl">
                    
                    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-1 pb-32">
                        
                        {/* 1. TRIM */}
                        <GhostAccordion title="1. Trim" isOpen={openSections['1_trim']} onToggle={() => toggleSection('1_trim')}>
                            {model.trims.map(t => (
                                <TextCard 
                                    key={t.id} 
                                    label={t.name} 
                                    price={t.price - model.trims[0].price} 
                                    active={trim.id === t.id} 
                                    onClick={() => {}} // Switch trim logic would go here
                                    description={t.id === trim.id ? 'Selected Base' : undefined}
                                />
                            ))}
                        </GhostAccordion>

                        {/* 2. POWERTRAIN */}
                        <GhostAccordion title="2. Powertrain" isOpen={openSections['2_engine']} onToggle={() => toggleSection('2_engine')}>
                            {ENGINES.map(e => (
                                <TextCard 
                                    key={e.id}
                                    label={e.name}
                                    price={e.price}
                                    active={config.engine.id === e.id}
                                    onClick={() => updateConfig('engine', e)}
                                    description={e.description}
                                />
                            ))}
                        </GhostAccordion>

                        {/* 3. TRANSMISSION */}
                        <GhostAccordion title="3. Transmission" isOpen={openSections['3_transmission']} onToggle={() => toggleSection('3_transmission')}>
                            {TRANSMISSIONS.map(t => (
                                <div 
                                    key={t.id} 
                                    onClick={() => updateConfig('transmission', t)}
                                    className={`flex items-center gap-3 p-3 rounded-[6px] cursor-pointer transition-colors ${config.transmission.id === t.id ? 'bg-[#3FE0C5]/10' : 'hover:bg-slate-800'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${config.transmission.id === t.id ? 'border-[#3FE0C5]' : 'border-slate-500'}`}>
                                        {config.transmission.id === t.id && <div className="w-2 h-2 rounded-full bg-[#3FE0C5]"></div>}
                                    </div>
                                    <span className={`text-sm font-medium ${config.transmission.id === t.id ? 'text-white' : 'text-slate-400'}`}>{t.name}</span>
                                </div>
                            ))}
                        </GhostAccordion>

                        {/* 4. EXTERIOR */}
                        <GhostAccordion title="4. Exterior" isOpen={openSections['4_exterior']} onToggle={() => toggleSection('4_exterior')}>
                            <div className="mb-4">
                                <h5 className="text-xs font-bold text-slate-500 mb-2 uppercase">Paint</h5>
                                <div className="grid grid-cols-4 gap-3">
                                    {EXTERIOR_PAINTS.map(p => (
                                        <ColorChip 
                                            key={p.id} 
                                            color={p.value!} 
                                            active={config.paint.id === p.id} 
                                            onClick={() => updateConfig('paint', p)}
                                            name={p.name}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-[#3FE0C5] mt-2 font-medium">{config.paint.name} {config.paint.price > 0 && `(+${config.paint.price.toLocaleString()})`}</p>
                            </div>
                            <div>
                                <h5 className="text-xs font-bold text-slate-500 mb-2 uppercase">Wheels</h5>
                                <div className="grid grid-cols-2 gap-2">
                                    {WHEELS.map(w => (
                                        <ImageCard 
                                            key={w.id} 
                                            label={w.name} 
                                            price={w.price} 
                                            active={config.wheels.id === w.id} 
                                            onClick={() => updateConfig('wheels', w)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </GhostAccordion>

                        {/* 5. INTERIOR */}
                        <GhostAccordion title="5. Interior" isOpen={openSections['5_interior']} onToggle={() => toggleSection('5_interior')}>
                            <div className="mb-4">
                                <h5 className="text-xs font-bold text-slate-500 mb-2 uppercase">Upholstery</h5>
                                <div className="grid grid-cols-2 gap-2">
                                    {INTERIOR_UPHOLSTERY.map(u => (
                                        <div 
                                            key={u.id}
                                            onClick={() => updateConfig('uph', u)}
                                            className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${config.uph.id === u.id ? 'border-[#3FE0C5] bg-[#3FE0C5]/5' : 'border-slate-700 hover:border-slate-500'}`}
                                        >
                                            <div className="w-6 h-6 rounded-full border border-slate-600" style={{ backgroundColor: u.value }}></div>
                                            <span className="text-xs font-bold text-slate-300 truncate">{u.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-xs font-bold text-slate-500 mb-2 uppercase">Trim</h5>
                                <div className="grid grid-cols-1 gap-2">
                                    {INTERIOR_TRIM.map(t => (
                                        <TextCard key={t.id} label={t.name} price={t.price} active={config.trim.id === t.id} onClick={() => updateConfig('trim', t)} />
                                    ))}
                                </div>
                            </div>
                        </GhostAccordion>

                        {/* 6. TECHNOLOGY */}
                        <GhostAccordion title="6. Technology" isOpen={openSections['6_technology']} onToggle={() => toggleSection('6_technology')}>
                            <div className="space-y-2">
                                {PACKAGES_TECH.map(p => (
                                    <TextCard 
                                        key={p.id} 
                                        label={p.name} 
                                        price={p.price} 
                                        active={config.packages.includes(p.id)} 
                                        onClick={() => toggleMultiSelect('packages', p.id)} 
                                    />
                                ))}
                            </div>
                        </GhostAccordion>

                        {/* 7. SAFETY */}
                        <GhostAccordion title="7. Safety" isOpen={openSections['7_safety']} onToggle={() => toggleSection('7_safety')}>
                            <div className="space-y-2">
                                {PACKAGES_SAFETY.map(p => (
                                    <TextCard 
                                        key={p.id} 
                                        label={p.name} 
                                        price={p.price} 
                                        active={config.packages.includes(p.id)} 
                                        onClick={() => toggleMultiSelect('packages', p.id)} 
                                    />
                                ))}
                            </div>
                        </GhostAccordion>

                        {/* 8. COMFORT */}
                        <GhostAccordion title="8. Comfort" isOpen={openSections['8_comfort']} onToggle={() => toggleSection('8_comfort')}>
                            <div className="space-y-2">
                                {PACKAGES_COMFORT.map(p => (
                                    <TextCard 
                                        key={p.id} 
                                        label={p.name} 
                                        price={p.price} 
                                        active={config.packages.includes(p.id)} 
                                        onClick={() => toggleMultiSelect('packages', p.id)} 
                                    />
                                ))}
                            </div>
                        </GhostAccordion>

                        {/* 9. ACCESSORIES */}
                        <GhostAccordion title="9. Accessories" isOpen={openSections['9_accessories']} onToggle={() => toggleSection('9_accessories')}>
                            <div className="grid grid-cols-2 gap-2">
                                {ACCESSORIES.map(a => (
                                    <ImageCard 
                                        key={a.id} 
                                        label={a.name} 
                                        price={a.price} 
                                        active={config.accessories.includes(a.id)} 
                                        onClick={() => toggleMultiSelect('accessories', a.id)} 
                                    />
                                ))}
                            </div>
                        </GhostAccordion>

                    </div>

                    {/* 10. SUMMARY (Fixed Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-5 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] z-20">
                        <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>Base Price</span>
                                <span>${trim.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>Options Total</span>
                                <span className="text-[#3FE0C5]">+${optionsTotal.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-slate-800 my-2"></div>
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-white uppercase tracking-wider">Total Price</span>
                                <span className="text-2xl font-black text-white leading-none">${totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="w-full py-3.5 bg-[#3FE0C5] text-slate-900 text-sm font-extrabold uppercase tracking-wide rounded-[6px] hover:bg-[#32b29d] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(63,224,197,0.2)] hover:shadow-[0_0_30px_rgba(63,224,197,0.4)]">
                            Create Quotation
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};