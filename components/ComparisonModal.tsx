
import React from 'react';
import { VehicleModel } from '../types';
import { X, ChevronRight } from 'lucide-react';

interface Props {
    selectedModels: VehicleModel[];
    onClose: () => void;
    onConfigure: (model: VehicleModel) => void;
}

export const ComparisonModal: React.FC<Props> = ({ selectedModels, onClose, onConfigure }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                    <h2 className="text-xl font-bold text-slate-900">Compare Models</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>
                
                <div className="overflow-auto flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[800px]">
                        {selectedModels.map(model => (
                            <div key={model.id} className="border border-slate-200 rounded-lg p-4 flex flex-col h-full bg-white hover:border-slate-300 transition-colors">
                                <div className={`h-40 ${model.imageColor} rounded-md mb-4 overflow-hidden relative`}>
                                     {model.imageUrl ? (
                                        <img src={model.imageUrl} alt={model.name} className="w-full h-full object-cover" />
                                     ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/50 font-bold text-2xl bg-slate-200">{model.brand}</div>
                                     )}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{model.brand} {model.name}</h3>
                                <p className="text-sm text-slate-500 mb-4">Starting at ${model.basePrice.toLocaleString()}</p>
                                
                                <div className="space-y-4 flex-1">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">0-60 mph</span>
                                        <span className="text-sm font-semibold text-slate-800">{model.specs?.zeroSixty || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Power</span>
                                        <span className="text-sm font-semibold text-slate-800">{model.specs?.hp || 'N/A'} HP</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">MPG/Range</span>
                                        <span className="text-sm font-semibold text-slate-800">{model.specs?.mpg || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase">Stock</span>
                                        <span className={`text-sm font-bold ${model.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-orange-500'}`}>
                                            {model.stockStatus}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onConfigure(model)}
                                    className="w-full mt-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    Configure <ChevronRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
