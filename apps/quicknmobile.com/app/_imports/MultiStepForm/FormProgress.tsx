interface FormProgressProps {
  currentStep: number;
  steps: string[];
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-2">
      {/* Step Numbers & Labels */}
      <div className="flex justify-between items-center relative">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-3.5 h-0.5 w-full bg-border -z-10" />

        {/* Active Progress Filling Line */}
        <div
          className="absolute left-0 top-3.5 h-0.5 bg-blue-600 -z-10 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1 group">
              {/* Node Indicator Dot */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border transition-all duration-300 ${
                  isCompleted
                    ? "bg-blue-600 border-blue-700 text-white"
                    : isActive
                      ? "bg-bg-dark border-blue-500 text-primary ring-4 ring-blue-500/20"
                      : "bg-bg-dark border-border text-secondary"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Optional Step Text Label Below */}
              <span
                className={`text-[10px] font-medium tracking-wide mt-1.5 uppercase select-none transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-secondary/60"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
