import React from "react";

const Stepper = ({ currentStep }) => {
  const steps = [
    { 
      id: 1, 
      label: "Direct Family", 
      icon: 
      <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg> 
      },
    { 
      id: 2, 
      label: "Extended Family",
      icon: 
      <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
      </svg>  
    },
    { 
      id: 3, 
      label: "Calculation",
       
    },
  ];
const totalSteps = steps.length;

console.log(totalSteps); // Output: 3

  return (
    <ol className="flex items-center w-full mb-16 mx-3">
      {steps.map((step, index) => (
        <li
        key={step.id}
        className={`flex items-center ${
          currentStep > step.id 
            ? "text-purple-600 w-full dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 dark:after:border-blue-800"
            : (step.id === totalSteps
              ? "" // Do nothing if it's the last step
              : "after:content-[''] w-full after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 dark:after:border-gray-700")
        }`}
      >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              currentStep === step.id
                ? "bg-purple-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            {currentStep > step.id ? (
              <svg
                className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600 dark:text-blue-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            ) : (
              <span
                className={`${
                  currentStep === step.id
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-500 dark:text-gray-100"
                }`}
              >
                {index + 1}
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
