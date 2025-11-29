import React, { useState } from 'react';
import { VehicleModel, Trim, ConfigOption } from '../types';
import { 
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
    RotateCw, Info, Check, Sparkles, AlertTriangle, 
    Layers, Palette, Circle, Package, Sliders, 
    Zap, Shield, Music, Grid, Sun, Aperture, 
    Power, Lightbulb, Disc, Thermometer, X,
    Maximize2, ArrowLeft, ArrowRight
} from 'lucide-react';

// --- EXPANDED DUMMY OPTIONS ---
const EXTERIOR_COLORS: ConfigOption[] = [
    { id: 'black', name: 'Jet Black Metallic', price: 0, type: 'color', value: '#000000' },
    { id: 'white', name: 'Carrara White', price: 0, type: 'color', value: '#F5F5F5' },
    { id: 'graphite', name: 'Graphite Grey', price: 800, type: 'color', value: '#374151' },
    { id: 'red', name: 'Carmine Red', price: 3200, type: 'color', value: '#B91C1C' },
    { id: 'blue', name: 'Gentian Blue', price: 1200, type: 'color', value: '#1E3A8A' },
];

const INTERIOR_COLORS: ConfigOption[] = [
    { id: 'int_black', name: 'Black Leather', price: 0, type: 'interior', value: '#111827' },
    { id: 'int_beige', name: 'Mojave Beige', price: 0, type: 'interior', value: '#D2B48C' },
    { id: 'int_red', name: 'Bordeaux Red', price: 4200, type: 'interior', value: '#7F1D1D' },
];

const WHEELS: ConfigOption[] = [
    { id: 'w19', name: '19" Standard Aero', price: 0, type: 'wheel' },
    { id: 'w20', name: '20" Sport Design', price: 2100, type: 'wheel' },
    { id: 'w21', name: '21" RS Spyder', price: 3800, type: 'wheel' },
];

const OPTIONS_CATEGORIES = {
    Safety: [
        { id: 'safe1', name: 'Lane Change Assist', price: 900, type: 'package', description: 'Monitors rear blind spots.' },
        { id: 'safe2', name: 'Surround View', price: 1200, type: 'package', description: '360-degree camera system.' },
    ],
    Convenience: [
        { id: 'conv1', name: 'Soft Close Doors', price: 700, type: 'package', description: 'Gently pulls doors shut.' },
        { id: 'conv2', name: 'Ambient Lighting', price: 500, type: 'package', description: 'Customizable interior colored LED.' },
    ],
    Tech: [
        { id: 'tech1', name: 'Burmester Sound', price: 5800, type: 'package', description: 'High-end 3D Surround Sound.' },
        { id: 'tech2', name: 'Head-Up Display', price: 1500, type: 'package', description: 'Projects info onto windshield.' },
    ],
    Accessories: [
        { id: 'acc1', name: 'Roof Rails Aluminum', price: 400, type: 'accessory', description: 'Required for roof transport systems.' },
    ]
};

const KSP_POINTS = [
    { id: 1, x: 32, y: 45, title: 'Matrix LED', desc: '84 individually controlled LEDs.' },
    { id: 2, x: 62, y: 60, title: '21" Forged', desc: 'Lightweight alloy construction.' },
    { id: 3, x: 48, y: 25, title: 'Panoramic', desc: 'Fixed glass roof with 95% tint.' },
];

const RADIAL_ITEMS = [
    { id: 'light', icon: Lightbulb, label: 'Lights' },
    { id: 'wiper', icon: Disc, label: 'Wipers' }, // Disc used as placeholder for wiper movement
    { id: 'door', icon: LogInIcon, label: 'Doors' },
    { id: 'trunk', icon: ArrowUpIcon, label: 'Trunk' },
    { id: 'start', icon: Power, label: 'Start' },
];

// Helper Icons
function LogInIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>; }
function ArrowUpIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>; }


// --- COMPONENTS ---

const Accordion: React.FC<{ title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }> = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-slate-100 last:border-0">
        <button onClick={onToggle} className="w-full py-4 flex items-center justify-between text-slate-800 hover:text-slate-600 transition-colors">
            <span className="text-sm font-bold uppercase tracking-wider">{title}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[800px]' : 'max-h-0'}`}>
            <div className="pb-6 pt-1 space-y-3">
                {children}
            </div>
        </div>
    </div>
);

const OptionCard: React.FC<{ 
    label: string; 
    price: number; 
    active: boolean; 
    onClick: () => void; 
    description?: string;
    colorValue?: string;
    image?: boolean 
}> = ({ label, price, active, onClick, description, colorValue }) => (
    <div 
        onClick={onClick}
        className={`relative p-4 rounded-[6px] border transition-all cursor-pointer group flex items-start gap-3 ${
            active 
            ? 'border-indigo-600 bg-indigo-50/10 shadow-sm' 
            : 'border-slate-200 bg-white hover:shadow-md hover:border-slate-300'
        }`}
    >
        {colorValue && (
            <div 
                className={`w-8 h-8 rounded-full border shadow-sm shrink-0 ${active ? 'ring-2 ring-offset-2 ring-indigo-600 border-transparent' : 'border-slate-200'}`}
                style={{ backgroundColor: colorValue }}
            />
        )}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-bold ${active ? 'text-indigo-900' : 'text-slate-800'}`}>{label}</span>
                <span className={`text-xs font-semibold ${active ? 'text-indigo-700' : 'text-slate-500'}`}>
                    {price === 0 ? 'Std' : `+$${price.toLocaleString()}`}
                </span>
            </div>
            {description && (
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{description}</p>
            )}
        </div>
        {active && <div className="absolute top-4 right-4"><Check size={14} className="text-indigo-600" /></div>}
    </div>
);

interface Props {
    model: VehicleModel;
    trim: Trim;
    onBack: () => void;
}

export const ConfiguratorStep: React.FC<Props> = ({ model, trim, onBack }) => {
    // Layout State
    const [sectionsOpen, setSectionsOpen] = useState({
        trim: true,
        exterior: true,
        interior: false,
        options: false
    });
    
    // Feature State
    const [kspActive, setKspActive] = useState(false);
    const [radialOpen, setRadialOpen] = useState(false);
    const [view, setView] = useState<'Front' | 'Side' | 'Rear' | 'Interior'>('Front');
    const [activeKsp, setActiveKsp] = useState<number | null>(null);

    // Config State
    const [extColor, setExtColor] = useState(EXTERIOR_COLORS[0]);
    const [intColor, setIntColor] = useState(INTERIOR_COLORS[0]);
    const [selectedOpts, setSelectedOpts] = useState<string[]>([]);

    const toggleSection = (key: keyof typeof sectionsOpen) => {
        setSectionsOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleOption = (id: string) => {
        setSelectedOpts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Calculations
    const allOptions = [
        ...OPTIONS_CATEGORIES.Safety, 
        ...OPTIONS_CATEGORIES.Convenience, 
        ...OPTIONS_CATEGORIES.Tech, 
        ...OPTIONS_CATEGORIES.Accessories
    ];
    const optionsCost = selectedOpts.reduce((sum, id) => sum + (allOptions.find(o => o.id === id)?.price || 0), 0) 
                        + extColor.price + intColor.price;
    const total = trim.price + optionsCost;

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            
            {/* 1. HEADER */}
            <div className="h-[68px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30 relative">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-slate-900 leading-tight">{model.brand} {model.name}</h1>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{trim.name} Trim</span>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onBack}
                        className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[6px] transition-colors"
                    >
                        Change Model
                    </button>
                    {/* Simulated "Switch to CRM" - In a real app this would use nav context */}
                    <button className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-[6px] transition-colors">
                        Switch to CRM
                    </button>
                </div>
            </div>

            {/* 3. LAYOUT STRUCTURE (Hard Split) */}
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* 2. LEFT PANEL (Fixed 360px) */}
                <div className="w-[360px] flex flex-col border-r border-slate-200 bg-white relative z-20 shrink-0">
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-2 pb-32">
                        
                        {/* Trim Section */}
                        <Accordion title="Trim Level" isOpen={sectionsOpen.trim} onToggle={() => toggleSection('trim')}>
                            {model.trims.map(t => (
                                <OptionCard 
                                    key={t.id} 
                                    label={t.name} 
                                    price={t.price - trim.price} 
                                    active={trim.id === t.id} 
                                    onClick={() => {}} // In a real app, this would switch trims
                                    description={t.id === trim.id ? 'Currently selected base configuration.' : undefined}
                                />
                            ))}
                        </Accordion>

                        {/* Exterior Section */}
                        <Accordion title="Exterior Color" isOpen={sectionsOpen.exterior} onToggle={() => toggleSection('exterior')}>
                            <div className="grid grid-cols-1 gap-2">
                                {EXTERIOR_COLORS.map(c => (
                                    <OptionCard 
                                        key={c.id} 
                                        label={c.name} 
                                        price={c.price} 
                                        active={extColor.id === c.id} 
                                        onClick={() => setExtColor(c)} 
                                        colorValue={c.value}
                                    />
                                ))}
                            </div>
                        </Accordion>

                        {/* Interior Section */}
                        <Accordion title="Interior" isOpen={sectionsOpen.interior} onToggle={() => toggleSection('interior')}>
                            <div className="grid grid-cols-1 gap-2">
                                {INTERIOR_COLORS.map(c => (
                                    <OptionCard 
                                        key={c.id} 
                                        label={c.name} 
                                        price={c.price} 
                                        active={intColor.id === c.id} 
                                        onClick={() => setIntColor(c)} 
                                        colorValue={c.value}
                                    />
                                ))}
                            </div>
                        </Accordion>

                        {/* Options Section */}
                        <Accordion title="Options & Packages" isOpen={sectionsOpen.options} onToggle={() => toggleSection('options')}>
                            {Object.entries(OPTIONS_CATEGORIES).map(([cat, items]) => (
                                <div key={cat} className="mb-4 last:mb-0">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">{cat}</h4>
                                    <div className="space-y-2">
                                        {items.map(opt => (
                                            <OptionCard 
                                                key={opt.id}
                                                label={opt.name}
                                                price={opt.price}
                                                active={selectedOpts.includes(opt.id)}
                                                onClick={() => toggleOption(opt.id)}
                                                description={opt.description}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </Accordion>

                    </div>

                    {/* 6. PRICE SUMMARY (Fixed Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-slate-200 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                        <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>Base Price</span>
                                <span>${trim.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>Options</span>
                                <span>${optionsCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end pt-2 mt-2 border-t border-slate-100">
                                <span className="text-sm font-bold text-slate-900">Total Price</span>
                                <span className="text-2xl font-bold text-indigo-600 leading-none">${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="w-full py-3.5 bg-[#424651] text-white text-sm font-bold uppercase tracking-wide rounded-[6px] hover:bg-slate-800 transition-all active:scale-[0.98] shadow-md">
                            Create Quotation
                        </button>
                    </div>
                </div>

                {/* RIGHT: 3D VIEW AREA (Full Bleed) */}
                <div className="flex-1 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                    
                    {/* Simulated 3D Model Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {/* In a real app, this would be a Canvas/WebGL container */}
                            {model.imageUrl ? (
                                <img 
                                    src={model.imageUrl} 
                                    alt="Vehicle 3D View" 
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${view === 'Interior' ? 'scale-110' : 'scale-100'}`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <span className="text-9xl font-black opacity-20 uppercase tracking-tighter">{model.brand}</span>
                                </div>
                            )}
                            {/* Color Overlay Mix */}
                            <div 
                                className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none transition-colors duration-500" 
                                style={{ backgroundColor: extColor.value }} 
                            />
                        </div>
                    </div>

                    {/* (C) KSP TOGGLE */}
                    <button 
                        onClick={() => setKspActive(!kspActive)}
                        className={`absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md shadow-lg border transition-all z-40 flex items-center gap-2 ${
                            kspActive ? 'bg-white/90 border-indigo-200 text-indigo-700' : 'bg-white/40 border-white/20 text-slate-600 hover:bg-white/60'
                        }`}
                    >
                        <Info size={16} />
                        <span className="text-xs font-bold">Highlights {kspActive ? 'On' : 'Off'}</span>
                    </button>

                    {/* KSP POINTS (Overlay) */}
                    {kspActive && KSP_POINTS.map(p => (
                        <div 
                            key={p.id} 
                            className="absolute z-30 group" 
                            style={{ left: p.x + '%', top: p.y + '%' }}
                        >
                            <button 
                                onClick={() => setActiveKsp(activeKsp === p.id ? null : p.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 ${
                                    activeKsp === p.id ? 'bg-indigo-600 text-white' : 'bg-white/80 backdrop-blur text-indigo-600 animate-pulse'
                                }`}
                            >
                                <Sparkles size={16} />
                            </button>
                            {/* Tooltip Card */}
                            {activeKsp === p.id && (
                                <div className="absolute left-10 top-0 w-48 bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-xl border border-white/50 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <h5 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h5>
                                    <p className="text-[10px] text-slate-500 leading-snug">{p.desc}</p>
                                    <button onClick={() => setActiveKsp(null)} className="absolute top-1 right-1 text-slate-400 hover:text-slate-600"><X size={12}/></button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* (A) BOTTOM VIEW NAVIGATION */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                        <div className="flex items-center gap-1 p-1 bg-white/70 backdrop-blur-[12px] rounded-full shadow-2xl border border-white/40">
                            {['Front', 'Side', 'Rear', 'Interior'].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v as any)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                                        view === v 
                                        ? 'bg-slate-900 text-white shadow-md' 
                                        : 'text-slate-600 hover:bg-white/50'
                                    }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* (B) RADIAL MENU (Bottom Right) */}
                    <div className="absolute bottom-8 right-8 z-40">
                        {/* Radial Items Arc */}
                        <div className={`absolute bottom-0 right-0 w-48 h-48 pointer-events-none transition-all duration-300 ${radialOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            {RADIAL_ITEMS.map((item, index) => {
                                // Calculate position on a 90 degree arc
                                const angle = -90 * (index / (RADIAL_ITEMS.length - 1)); // 0 to -90 deg
                                const radius = 100; // px
                                const rad = angle * (Math.PI / 180);
                                const x = Math.cos(rad) * radius - 24; // Offset for button size
                                const y = Math.sin(rad) * radius - 24;
                                
                                return (
                                    <button
                                        key={item.id}
                                        className="absolute w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-110 transition-all pointer-events-auto group"
                                        style={{ 
                                            bottom: 16, right: 16, // Anchor center of trigger
                                            transform: `translate(${x}px, ${y}px)` 
                                        }}
                                        title={item.label}
                                    >
                                        <item.icon size={18} />
                                        {/* Tooltip Label */}
                                        <span className="absolute -top-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Trigger Button */}
                        <button
                            onClick={() => setRadialOpen(!radialOpen)}
                            className={`relative w-12 h-12 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-[12px] transition-all duration-300 z-50 ${
                                radialOpen 
                                ? 'bg-indigo-600 text-white rotate-45' 
                                : 'bg-white/80 text-slate-800 hover:scale-105'
                            }`}
                        >
                            <PlusIcon size={24} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- ADDITIONAL ICONS ---
function PlusIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>; }