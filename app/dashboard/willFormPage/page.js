"use client";

import React, { useState, Suspense } from "react"; // Add the import for React
import Stepper from "@/app/components/dashboard-comp/EstateForm/Stepper";

// Lazy load form components
const DirectFamily = React.lazy(() =>
  import("@/app/components/dashboard-comp/EstateForm/DirectFamily")
);
const ExtendedFamily = React.lazy(() =>
  import("@/app/components/dashboard-comp/EstateForm/ExtendedFamily")
);
const Calculation = React.lazy(() =>
  import("@/app/components/dashboard-comp/EstateForm/Calculation")
);

export default function WillFormPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const goToPreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <DirectFamily onNext={goToNextStep} />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ExtendedFamily onNext={goToNextStep} onBack={goToPreviousStep} />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Calculation onBack={goToPreviousStep} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Wrapper div with white background */}
      <div className="w-full max-w-3xl mx-auto">
        <Stepper currentStep={currentStep} />
        <div className="mt-6">{renderFormStep()}</div>
      </div>
    </div>
  );
}
