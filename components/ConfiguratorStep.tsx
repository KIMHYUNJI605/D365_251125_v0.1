
import React, { useState } from 'react';
import { VehicleModel, Trim, ConfigOption } from '../types';
import { ChevronLeft, ChevronRight, Info, RotateCw, Check, Sparkles, AlertTriangle, Layers, Palette, Circle, Package, Sliders, ChevronDown } from 'lucide-react';

// --- DUMMY OPTIONS ---
const EXTERIOR_COLORS: ConfigOption[] = [
    { id: 'black', name: 'Jet Black Metallic', price: 0, type: 'color', value: '#000000' },
    { id: 'white', name: 'Carrara White', price: 0, type: 'color', value: '#FFFFFF' },
    { id: 'graphite', name: 'Graphite Grey', price: 800, type: 'color', value: '#374151' },
    { id: 'red', name: 'Carmine Red', price: 3200, type: 'color', value: '#B91C1C' },
];

const INTERIOR_COLORS: ConfigOption[] = [
    { id: 'int_black', name: 'Black Leather', price: 0, type: 'interior', value: '#111827' },
    { id: 'int_beige', name: 'Mojave Beige', price: 0, type: 'interior', value: '#D2B48C' },
    { id: 'int_blue', name: 'Graphite Blue / Chalk', price: 4200, type: 'interior', value: '#1e3a8a' },
];

const WHEELS: ConfigOption[] = [
    { id: 'w19', name: '19" Standard Wheels', price: 0, type: 'wheel' },
    { id: 'w20', name: '20" Sport Aero Wheels', price: 2100, type: 'wheel' },
    { id: 'w21', name: '21" RS Spyder Design', price: 3800, type: 'wheel' },
];

const PACKAGES: ConfigOption[] = [
    { id: 'pkg_prem', name: 'Premium Package', price: 5400, type: 'package', description: 'Includes Panoramic Roof, Bose Sound, Ambient Lighting.' },
    { id: 'pkg_sport', name: 'Sport Chrono Package', price: 3200, type: 'package', description: 'Includes Mode Switch, Launch Control, Sport Response.' },
    { id: 'pkg_assist', name: 'Driver Assistance', price: 2800, type: 'package', description: 'Includes ACC, Lane Keep, Night Vision.' },
];

interface Props {
    model: VehicleModel;
    trim: Trim;
    onBack: () => void;
}

export const ConfiguratorStep: React.FC<Props> = ({ model, trim, onBack }) => {
    // State
    const [leftOpen, setLeftOpen] = useState(true);
    const [aiOpen, setAiOpen] = useState(false);
    
    // Config State
    const [extColor, setExtColor] = useState(EXTERIOR_COLORS[0]);
    const [intColor, setIntColor] = useState(INTERIOR_COLORS[0]);
    const [wheel, setWheel] = useState(WHEELS[0]);
    const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
    
    // UI State
    const [angle, setAngle] = useState<'Front' | 'Side' | 'Rear' | 'Interior'>('Front');
    const [paymentMode, setPaymentMode] = useState<'Loan' | 'Lease'>('Loan');

    const togglePackage = (id: string) => {
        if (selectedPackages.includes(id)) {
            setSelectedPackages(prev => prev.filter(p => p !== id));
        } else {
            setSelectedPackages(prev => [...prev, id]);
        }
    };

    // Calculate Totals
    const packagesCost = PACKAGES.filter(p => selectedPackages.includes(p.id)).reduce((acc, curr) => acc + curr.price, 0);
    const optionsTotal = extColor.price + intColor.price + wheel.price + packagesCost;
    const totalPrice = trim.price + optionsTotal + 1650; // + Destination
    const estimatedTax = totalPrice * 0.0825;
    const grandTotal = totalPrice + estimatedTax;
    
    // Estimate Payment (Simple calc for demo)
    const downPayment = 10000;
    const loanTerm = 60;
    const loanRate = 0.059;
    const principal = grandTotal - downPayment;
    const monthlyPayment = Math.floor((principal * (loanRate/12) * Math.pow(1 + loanRate/12, loanTerm)) / (Math.pow(1 + loanRate/12, loanTerm) - 1));


    return (
        <div className="flex flex-col h-full bg-slate-50 overflow-hidden relative">
            {/* 2.1 Title Row */}
            <div className="h-12 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                        <ChevronLeft size={14} /> Change Model
                    </button>
                    <div className="h-4 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{model.brand} {model.name}</span>
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{trim.name}</span>
                    </div>
                </div>
                <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Check size={12} /> Auto-saved 2 min ago
                </div>
            </div>

            {/* MAIN CONTENT ROW */}
            <div className="flex-1 flex overflow-hidden relative">
                
                {/* 2.3 LEFT OPTIONS PANEL */}
                <div className={`${leftOpen ? 'w-[320px]' : 'w-[56px]'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-10 relative`}>
                    <button 
                        onClick={() => setLeftOpen(!leftOpen)}
                        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 shadow-sm z-20"
                    >
                        {leftOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </button>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden">
                        {/* Section: Exterior */}
                        <div className="p-4 border-b border-slate-100">
                             <div className="flex items-center gap-3 mb-3">
                                <Palette size={18} className="text-slate-400 shrink-0" />
                                {leftOpen && <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Exterior Color</h3>}
                             </div>
                             {leftOpen && (
                                 <div className="grid grid-cols-4 gap-2">
                                     {EXTERIOR_COLORS.map(c => (
                                         <button 
                                            key={c.id} 
                                            onClick={() => setExtColor(c)}
                                            className={`w-10 h-10 rounded-full border-2 shadow-sm transition-all ${extColor.id === c.id ? 'border-slate-800 scale-110' : 'border-slate-200 hover:scale-105'}`}
                                            style={{ backgroundColor: c.value }}
                                            title={c.name}
                                         />
                                     ))}
                                 </div>
                             )}
                             {leftOpen && <p className="text-xs text-slate-500 mt-2 font-medium">{extColor.name} {extColor.price > 0 && `(+$${extColor.price})`}</p>}
                        </div>

                        {/* Section: Wheels */}
                        <div className="p-4 border-b border-slate-100">
                             <div className="flex items-center gap-3 mb-3">
                                <Circle size={18} className="text-slate-400 shrink-0" />
                                {leftOpen && <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Wheels</h3>}
                             </div>
                             {leftOpen && (
                                 <div className="space-y-2">
                                     {WHEELS.map(w => (
                                         <button 
                                            key={w.id}
                                            onClick={() => setWheel(w)}
                                            className={`w-full text-left p-2 rounded-[6px] border text-xs transition-all ${
                                                wheel.id === w.id 
                                                ? 'bg-slate-900 text-white border-slate-900' 
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                            }`}
                                         >
                                             <div className="flex justify-between">
                                                <span className="font-bold">{w.name}</span>
                                                <span>{w.price === 0 ? 'Std' : `+$${w.price}`}</span>
                                             </div>
                                         </button>
                                     ))}
                                 </div>
                             )}
                        </div>

                         {/* Section: Interior */}
                         <div className="p-4 border-b border-slate-100">
                             <div className="flex items-center gap-3 mb-3">
                                <Layers size={18} className="text-slate-400 shrink-0" />
                                {leftOpen && <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Interior</h3>}
                             </div>
                             {leftOpen && (
                                 <div className="grid grid-cols-3 gap-2">
                                     {INTERIOR_COLORS.map(c => (
                                         <button 
                                            key={c.id} 
                                            onClick={() => setIntColor(c)}
                                            className={`h-10 rounded-[6px] border-2 shadow-sm transition-all relative overflow-hidden ${intColor.id === c.id ? 'border-slate-800 ring-1 ring-slate-800' : 'border-slate-200'}`}
                                            style={{ backgroundColor: c.value }}
                                            title={c.name}
                                         >
                                             {intColor.id === c.id && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><Check size={16} className="text-white drop-shadow-md" /></div>}
                                         </button>
                                     ))}
                                 </div>
                             )}
                             {leftOpen && <p className="text-xs text-slate-500 mt-2 font-medium">{intColor.name} {intColor.price > 0 && `(+$${intColor.price})`}</p>}
                        </div>

                        {/* Section: Packages */}
                        <div className="p-4 border-b border-slate-100">
                             <div className="flex items-center gap-3 mb-3">
                                <Package size={18} className="text-slate-400 shrink-0" />
                                {leftOpen && <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Packages</h3>}
                             </div>
                             {leftOpen && (
                                 <div className="space-y-3">
                                     {PACKAGES.map(p => {
                                         const active = selectedPackages.includes(p.id);
                                         return (
                                            <div 
                                                key={p.id}
                                                onClick={() => togglePackage(p.id)}
                                                className={`p-3 rounded-[6px] border cursor-pointer transition-all ${
                                                    active ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-200 hover:border-slate-300'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`text-xs font-bold ${active ? 'text-indigo-900' : 'text-slate-800'}`}>{p.name}</span>
                                                    <span className={`text-[10px] font-bold ${active ? 'text-indigo-700' : 'text-slate-500'}`}>+${p.price}</span>
                                                </div>
                                                <p className="text-[10px] text-slate-500 leading-snug">{p.description}</p>
                                            </div>
                                         );
                                     })}
                                 </div>
                             )}
                        </div>
                    </div>
                </div>

                {/* 2.2 CENTER VEHICLE DISPLAY */}
                <div className="flex-1 bg-slate-100 relative flex flex-col">
                    {/* Main Visual */}
                    <div className="flex-1 relative flex items-center justify-center p-8">
                        {/* 3D Fallback */}
                        <div className="relative w-full max-w-4xl aspect-video rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                            <span className="text-9xl font-black text-slate-400/20 uppercase tracking-tighter select-none">{model.brand}</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Simulated Vehicle Image Layer */}
                                <div className="text-center">
                                    <p className="text-slate-500 font-bold mb-2">Interactive 3D View</p>
                                    <p className="text-xs text-slate-400">Drag to rotate • Scroll to zoom</p>
                                </div>
                            </div>
                            {/* Color Overlay Simulation */}
                            <div className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-20" style={{ backgroundColor: extColor.value }}></div>
                            
                            {/* Angle Selector */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur rounded-full px-2 py-1 shadow-lg flex gap-1">
                                {(['Front', 'Side', 'Rear', 'Interior'] as const).map(a => (
                                    <button
                                        key={a}
                                        onClick={() => setAngle(a)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                                            angle === a ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2.4 RIGHT SUMMARY PANEL */}
                <div className="w-[320px] bg-white border-l border-slate-200 flex flex-col z-20 shadow-xl relative">
                    
                    {/* Header */}
                    <div className="p-5 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">Summary</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">{model.stockStatus}</span>
                            <span className="text-xs text-slate-400">Stock #K2922</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5">
                        {/* Price Breakdown */}
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-xs text-slate-600">
                                <span>Base Price ({trim.name})</span>
                                <span>${trim.price.toLocaleString()}</span>
                            </div>
                             <div className="flex justify-between text-xs text-slate-600">
                                <span>Options Total</span>
                                <span>${optionsTotal.toLocaleString()}</span>
                            </div>
                             <div className="flex justify-between text-xs text-slate-600">
                                <span>Destination Fee</span>
                                <span>$1,650</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                                <span>Est. Taxes (8.25%)</span>
                                <span>${Math.round(estimatedTax).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                                <span className="text-sm font-bold text-slate-900">Total Price</span>
                                <span className="text-2xl font-bold text-slate-900">${Math.round(grandTotal).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Payment Estimator */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
                            <div className="flex bg-slate-200 p-0.5 rounded-lg mb-4">
                                <button 
                                    onClick={() => setPaymentMode('Loan')}
                                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${paymentMode === 'Loan' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                                >
                                    Loan
                                </button>
                                <button 
                                    onClick={() => setPaymentMode('Lease')}
                                    className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${paymentMode === 'Lease' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
                                >
                                    Lease
                                </button>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                    <span>Down Payment</span>
                                    <span>${downPayment.toLocaleString()}</span>
                                </div>
                                <input type="range" min="0" max="50000" step="1000" defaultValue={downPayment} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" />
                            </div>

                            <div className="text-center">
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Est. Monthly</p>
                                <p className="text-3xl font-black text-slate-900">${monthlyPayment.toLocaleString()}<span className="text-sm font-medium text-slate-400">/mo</span></p>
                            </div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="p-5 border-t border-slate-200 bg-white space-y-3">
                         <button className="w-full py-3 bg-[#424651] hover:bg-slate-800 text-white rounded-[8px] text-sm font-bold shadow-md transition-all active:scale-95">
                             Generate Quote
                         </button>
                         <div className="flex gap-3">
                            <button className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-[8px] text-xs font-bold transition-all">
                                Save Build
                            </button>
                             <button className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-[8px] text-xs font-bold transition-all">
                                Send to Customer
                            </button>
                         </div>
                    </div>
                </div>

                {/* 2.5 AI INSIGHTS PANEL (Overlay) */}
                <div className={`absolute top-4 right-[336px] w-[280px] transition-all duration-500 ease-out z-30 ${aiOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
                    <div className="bg-[#424651] rounded-xl shadow-2xl p-5 border border-slate-600">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={16} className="text-[#B4E975]" />
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Deal Insights</h3>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                    <span>Engagement Score</span>
                                    <span className="text-[#B4E975]">82/100</span>
                                </div>
                                <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#B4E975] w-[82%]"></div>
                                </div>
                            </div>
                            
                            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                                <div className="flex gap-2 items-start">
                                    <AlertTriangle size={14} className="text-orange-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-white mb-1">Upsell Opportunity</p>
                                        <p className="text-[10px] text-slate-300 leading-snug">
                                            Adding the <span className="text-white font-bold">Sport Package</span> increases close probability by <span className="text-emerald-400 font-bold">+12%</span> for this demographic.
                                        </p>
                                    </div>
                                </div>
                                <button className="w-full mt-2 py-1.5 bg-[#B4E975] hover:bg-[#a0d766] text-[#424651] text-[10px] font-bold rounded-[4px]">
                                    Add Sport Package (+$3,200)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* 2.5 AI Toggle Button */}
                 <button 
                    onClick={() => setAiOpen(!aiOpen)}
                    className={`absolute top-4 right-[336px] w-8 h-8 rounded-l-md flex items-center justify-center shadow-md transition-all z-20 ${
                        aiOpen ? 'bg-[#424651] text-[#B4E975]' : 'bg-white text-slate-400 hover:text-indigo-600'
                    }`}
                    style={{ transform: aiOpen ? 'translateX(280px)' : 'translateX(0)' }}
                >
                    <Sparkles size={16} />
                </button>

            </div>

            {/* 2.6 Floating Actions */}
            <div className="absolute bottom-6 right-6 z-40 flex flex-col gap-3">
                 <button className="w-12 h-12 bg-white border border-slate-200 rounded-full shadow-fab hover:scale-105 active:scale-95 flex items-center justify-center text-slate-700 transition-all">
                    <Sliders size={20} />
                </button>
                 <button className="w-14 h-14 bg-[#424651] text-white rounded-full shadow-fab hover:scale-105 active:scale-95 flex items-center justify-center transition-all">
                    <Info size={24} />
                </button>
            </div>

        </div>
    );
};
