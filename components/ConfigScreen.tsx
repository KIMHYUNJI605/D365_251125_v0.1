
import React, { useState } from 'react';
import { ModelSelectionStep } from './ModelSelectionStep';
import { ConfiguratorStep } from './ConfiguratorStep';
import { VehicleModel, Trim } from '../types';

export const ConfigScreen: React.FC = () => {
    const [step, setStep] = useState<'selection' | 'configurator'>('selection');
    const [selection, setSelection] = useState<{ model: VehicleModel; trim: Trim } | null>(null);

    const handleSelect = (model: VehicleModel, trim: Trim) => {
        setSelection({ model, trim });
        setStep('configurator');
    };

    const handleBack = () => {
        setStep('selection');
        setSelection(null);
    };

    return (
        <div className="w-full h-full bg-[#FFFFFF]">
            {step === 'selection' && (
                <ModelSelectionStep onSelect={handleSelect} />
            )}
            {step === 'configurator' && selection && (
                <ConfiguratorStep 
                    model={selection.model} 
                    trim={selection.trim} 
                    onBack={handleBack} 
                />
            )}
        </div>
    );
};
