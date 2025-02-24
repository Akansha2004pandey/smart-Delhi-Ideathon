import React, { useState } from "react";
import { ChevronRight, Volume2 } from "lucide-react";
import Speaker from "./Speaker";

const TrainingComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const trainingSteps = [
    "Step 1: Stand in a balanced position.",
    "Step 2: Raise your arms to defend.",
    "Step 3: Move forward and strike.",
    "Step 4: Retreat and reset position."
  ];

  return (

<>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Training Module</h2>
        
        <div className="relative flex  justify-center items-center gap-3 mb-6">
          <p className="text-lg font-medium text-gray-700 p-4 bg-blue-100 rounded-lg shadow">
            {trainingSteps[currentStep]}
          </p>
          <div className="">
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

        <button
          className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 active:scale-95 transition"
          onClick={() => setCurrentStep((prev) => (prev + 1) % trainingSteps.length)}
        >
          Next Step <ChevronRight size={20} />
        </button>
        </>
      
    
  );
};

export default TrainingComponent;
