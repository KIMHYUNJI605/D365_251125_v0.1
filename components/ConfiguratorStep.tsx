import React, { useState } from 'react';
import { VehicleModel, Trim, ConfigOption } from '../types';
import { 
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp, 
    RotateCw, Info, Check, Sparkles, AlertTriangle, 
    Layers, Palette, Circle, Package, Sliders, 
    Zap, Shield, Music, Grid, Sun, Aperture, 
    Power, Lightbulb, Disc, Thermometer, X,
    Maximize2, ArrowLeft, ArrowRight,
    Car, Armchair, CarFront, Move3d, LogOut
} from 'lucide-react';

// --- COLORS ---
const NEO_MINT = '#3FE0C5';

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
    { id: 'wiper', icon: Disc, label: 'Wipers' },
    { id: 'door', icon: LogInIcon, label: 'Doors' },
    { id: 'trunk', icon: ArrowUpIcon, label: 'Trunk' },
    { id: 'start', icon: Power, label: 'Start' },
];

// Helper Icons
function LogInIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>; }
function ArrowUpIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>; }


// --- COMPONENTS ---

const Accordion: React.FC<{ title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }> = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-slate-800 last:border-0">
        <button onClick={onToggle} className="w-full py-4 flex items-center justify-between text-slate-300 hover:text-white transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
            {isOpen ? <ChevronUp size={16} strokeWidth={1.75} /> : <ChevronDown size={16} strokeWidth={1.75} />}
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
            ? 'border-[#3FE0C5] bg-[#3FE0C5]/10 shadow-sm' 
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800'
        }`}
    >
        {colorValue && (
            <div 
                className={`w-8 h-8 rounded-full border shadow-sm shrink-0 ${active ? 'ring-2 ring-offset-2 ring-[#3FE0C5] ring-offset-slate-900 border-transparent' : 'border-slate-600'}`}
                style={{ backgroundColor: colorValue }}
            />
        )}
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-bold ${active ? 'text-[#3FE0C5]' : 'text-slate-200'}`}>{label}</span>
                <span className={`text-xs font-semibold ${active ? 'text-[#3FE0C5]/80' : 'text-slate-500'}`}>
                    {price === 0 ? 'Std' : `+$${price.toLocaleString()}`}
                </span>
            </div>
            {description && (
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{description}</p>
            )}
        </div>
        {active && <div className="absolute top-4 right-4"><Check size={14} className="text-[#3FE0C5]" /></div>}
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

    const views = [
        { id: 'Front', icon: CarFront },
        { id: 'Side', icon: Car },
        { id: 'Rear', icon: Car }, 
        { id: 'Interior', icon: Armchair },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-950 overflow-hidden font-sans text-slate-200">
            
            {/* 1. HEADER - Dark */}
            <div className="h-[68px] bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-30 relative shadow-md">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-white leading-tight">{model.brand} {model.name}</h1>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trim.name} Trim</span>
                </div>
                <div className="flex items-center gap-3">
                    {/* Secondary Button */}
                    <button 
                        onClick={onBack}
                        className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-[6px] transition-all border border-slate-700"
                    >
                        Change Model
                    </button>
                    {/* Tertiary Button */}
                    <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-[#3FE0C5] bg-transparent hover:bg-slate-800/50 rounded-[6px] transition-colors flex items-center gap-2">
                        <LogOut size={14} />
                        Switch to CRM
                    </button>
                </div>
            </div>

            {/* 3. LAYOUT STRUCTURE (Hard Split, Right Panel) */}
            <div className="flex flex-1 overflow-hidden relative flex-row">
                
                {/* 3D VIEW AREA (Left/Center, Full Bleed) */}
                <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
                    
                    {/* Simulated 3D Model Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {/* In a real app, this would be a Canvas/WebGL container */}
                            {model.imageUrl ? (
                                <img 
                                    src={model.imageUrl} 
                                    alt="Vehicle 3D View" 
                                    className={`w-full h-full object-cover transition-opacity duration-[400ms] ${view === 'Interior' ? 'scale-110' : 'scale-100'}`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                    <span className="text-9xl font-black opacity-10 uppercase tracking-tighter">{model.brand}</span>
                                </div>
                            )}
                            {/* Color Overlay Mix */}
                            <div 
                                className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none transition-colors duration-[400ms]" 
                                style={{ backgroundColor: extColor.value }} 
                            />
                        </div>
                    </div>

                    {/* (C) KSP TOGGLE */}
                    <button 
                        onClick={() => setKspActive(!kspActive)}
                        className={`absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-[10px] shadow-lg border transition-all z-40 flex items-center gap-2 ${
                            kspActive 
                            ? 'bg-slate-900/90 border-[#3FE0C5] text-[#3FE0C5]' 
                            : 'bg-slate-900/40 border-white/10 text-slate-300 hover:bg-slate-900/60'
                        }`}
                    >
                        <Info size={16} strokeWidth={1.75} />
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
                                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 relative ${
                                    activeKsp === p.id ? 'bg-[#3FE0C5] text-slate-900' : 'bg-slate-900/80 backdrop-blur text-[#3FE0C5] border border-[#3FE0C5]/30'
                                }`}
                            >
                                <span className={`absolute inset-0 rounded-full bg-[#3FE0C5] opacity-20 animate-ping ${activeKsp === p.id ? 'hidden' : 'block'}`}></span>
                                <Sparkles size={16} strokeWidth={1.75} />
                            </button>
                            {/* Tooltip Card */}
                            {activeKsp === p.id && (
                                <div className="absolute left-10 top-0 w-48 bg-slate-900/95 backdrop-blur-md p-3 rounded-lg shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-left-2 duration-200">
                                    <h5 className="text-sm font-bold text-white mb-1">{p.title}</h5>
                                    <p className="text-[10px] text-slate-400 leading-snug">{p.desc}</p>
                                    <button onClick={() => setActiveKsp(null)} className="absolute top-1 right-1 text-slate-500 hover:text-white"><X size={12} strokeWidth={1.75} /></button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* (A) BOTTOM VIEW NAVIGATION (Fixed Height 52px) */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                        <div className="flex items-center gap-1 p-1 bg-slate-900/80 backdrop-blur-[12px] rounded-full shadow-2xl border border-white/10 h-[52px]">
                            {views.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setView(v.id as any)}
                                    className={`h-full px-5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                                        view === v.id 
                                        ? 'bg-[#3FE0C5] text-slate-900 shadow-lg shadow-[#3FE0C5]/20' 
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <v.icon size={16} strokeWidth={1.75} />
                                    <span>{v.id}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* (B) RADIAL MENU (Bottom Left now, since panel is on right) */}
                    <div className="absolute bottom-8 left-8 z-40">
                        {/* Radial Items Arc */}
                        <div className={`absolute bottom-0 left-0 w-48 h-48 pointer-events-none transition-all duration-300 ${radialOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                            {RADIAL_ITEMS.map((item, index) => {
                                // Calculate position on a 90 degree arc (flipped for bottom-left)
                                const angle = 0 + 90 * (index / (RADIAL_ITEMS.length - 1)); // 0 to 90 deg
                                const radius = 100; // px
                                const rad = angle * (Math.PI / 180);
                                const x = Math.cos(rad) * radius - 24; 
                                const y = -Math.sin(rad) * radius - 24; // Negative Y to go up
                                
                                // Adjust X because cos(0) is 1 (right), we want to go right and up from bottom-left corner? 
                                // Actually bottom-left corner means 0 degrees is right, 90 degrees is up.
                                // Standard unit circle: 0 is East, 90 is North. 
                                // We are at bottom-left. We want arc from East (0) to North (90).
                                const cx = 24; // Center offset of trigger
                                const cy = -24; // Center offset of trigger (relative to bottom)

                                const finalX = cx + (Math.cos(rad) * radius);
                                const finalY = cy - (Math.sin(rad) * radius);

                                return (
                                    <button
                                        key={item.id}
                                        className="absolute w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur shadow-lg border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#3FE0C5] hover:text-slate-900 hover:scale-110 transition-all pointer-events-auto group"
                                        style={{ 
                                            bottom: 16, left: 16, 
                                            transform: `translate(${Math.cos(rad) * 100}px, ${-Math.sin(rad) * 100}px)` 
                                        }}
                                        title={item.label}
                                    >
                                        <item.icon size={18} strokeWidth={1.75} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Trigger Button */}
                        <button
                            onClick={() => setRadialOpen(!radialOpen)}
                            className={`relative w-12 h-12 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-[12px] transition-all duration-300 z-50 border border-white/10 ${
                                radialOpen 
                                ? 'bg-[#3FE0C5] text-slate-900 rotate-45' 
                                : 'bg-slate-900/80 text-white hover:scale-105'
                            }`}
                        >
                            <PlusIcon size={24} strokeWidth={1.75} />
                        </button>
                    </div>

                </div>

                {/* 2. RIGHT PANEL (Fixed 360px) */}
                <div className="w-[360px] flex flex-col border-l border-slate-800 bg-slate-900 relative z-20 shrink-0 shadow-2xl">
                    
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
                                    onClick={() => {}} 
                                    description={t.id === trim.id ? 'Currently selected base configuration.' : undefined}
                                />
                            ))}
                        </Accordion>

                        {/* Exterior Section */}
                        <Accordion title="Exterior Color" isOpen={sectionsOpen.exterior} onToggle={() => toggleSection('exterior')}>
                            <div className="grid grid-cols-4 gap-2">
                                {EXTERIOR_COLORS.map(c => (
                                    <button 
                                        key={c.id} 
                                        onClick={() => setExtColor(c)} 
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${extColor.id === c.id ? 'border-[#3FE0C5] scale-110 shadow-[0_0_10px_rgba(63,224,197,0.4)]' : 'border-slate-600 hover:border-slate-400'}`}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">{extColor.name}</p>
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
                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 pl-1">{cat}</h4>
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
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                        <div className="space-y-1 mb-4">
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>Base Price</span>
                                <span>${trim.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 font-medium">
                                <span>Options</span>
                                <span>${optionsCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-end pt-2 mt-2 border-t border-slate-800">
                                <span className="text-sm font-bold text-white">Total Price</span>
                                <span className="text-2xl font-bold text-[#3FE0C5] leading-none">${total.toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="w-full py-3.5 bg-[#3FE0C5] text-slate-900 text-sm font-bold uppercase tracking-wide rounded-[6px] hover:bg-[#32b29d] transition-all active:scale-[0.98] shadow-lg shadow-[#3FE0C5]/20">
                            Create Quotation
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- ADDITIONAL ICONS ---
function PlusIcon(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>; }