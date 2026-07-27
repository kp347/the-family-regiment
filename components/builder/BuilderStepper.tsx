// components/builder/BuilderStepper.tsx

export type BuilderStep = {
  number: string;
  name: string;
  description: string;
};

type BuilderStepperProps = {
  steps: BuilderStep[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
};

export default function BuilderStepper({
  steps,
  currentStep,
  onStepChange,
}: BuilderStepperProps) {
  return (
    <div className="mb-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
      {steps.map((step, index) => {
        const active = index === currentStep;
        const complete = index < currentStep;

        return (
          <button
            key={step.name}
            type="button"
            onClick={() => onStepChange(index)}
            className={`rounded-2xl border p-4 text-left transition ${
              active
                ? "border-[#B08D57] bg-[#B08D57]/10"
                : complete
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/10 bg-white/[0.02]"
            }`}
          >
            <p
              className={`text-[10px] uppercase tracking-[0.3em] ${
                active || complete
                  ? "text-[#B08D57]"
                  : "text-[#615E58]"
              }`}
            >
              {complete ? "Complete" : step.number}
            </p>

            <p className="mt-3 text-sm">{step.name}</p>
          </button>
        );
      })}
    </div>
  );
}