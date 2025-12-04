import React, { useState } from "react";
import { ModelSelectionStep } from "./ModelSelectionStep";
import { ConfiguratorStep } from "./ConfiguratorStep";
import { VehicleModel, Trim } from "../types";

interface ConfigScreenProps {
  onNavigate: (view: "dashboard" | "deals" | "config") => void;
}

export const ConfigScreen: React.FC<ConfigScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<"selection" | "configurator">("selection");
  const [selection, setSelection] = useState<{
    model: VehicleModel;
    trim: Trim;
  } | null>(null);

  const handleSelect = (model: VehicleModel, trim: Trim) => {
    setSelection({ model, trim });
    setStep("configurator");
  };

  const handleBack = () => {
    setStep("selection");
    setSelection(null);
  };

  return (
    <div className="h-full w-full bg-slate-950">
      {step === "selection" && (
        <ModelSelectionStep onSelect={handleSelect} onNavigate={onNavigate} />
      )}

      {step === "configurator" && selection && (
        <ConfiguratorStep
          model={selection.model}
          trim={selection.trim}
          onBack={handleBack}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};