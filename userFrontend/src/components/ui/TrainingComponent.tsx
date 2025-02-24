import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Volume2 } from "lucide-react";
import Speaker from "./Speaker";

const TrainingComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const trainingSteps = [
    "Step 1: Stand in a balanced position.",
    "Step 2: Raise your arms to defend.",
    "Step 3: Move forward and strike.",
    "Step 4: Retreat and reset position."
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % trainingSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + trainingSteps.length) % trainingSteps.length);
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center">
      <div className="relative flex justify-center items-center gap-3 mb-6">
        <p className="text-lg font-medium text-gray-700 p-4 bg-blue-100 rounded-lg shadow">
          {trainingSteps[currentStep]}
        </p>
        <div>
          <Speaker message={trainingSteps[currentStep]} />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {trainingSteps.map((_, index) => (
          <div 
            key={index} 
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentStep ? "bg-indigo-500 w-5" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 active:scale-95 transition"
          onClick={prevStep}
        >
          <ChevronLeft size={20} /> Previous Step
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 active:scale-95 transition"
          onClick={nextStep}
        >
          Next Step <ChevronRight size={20} />
        </button>
      </div>
      </div>
    </>
  );
};

export default TrainingComponent;
