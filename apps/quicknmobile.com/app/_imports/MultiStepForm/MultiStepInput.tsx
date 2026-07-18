"use client";

import { useState } from "react";
import { StepSectionProps } from "./StepSection";
import { FormProgress } from "./FormProgress";

interface MultiStepInputProps {
  initIndex: number;
  steps: string[];
  renderStep: (prop: StepSectionProps) => React.ReactNode;
}
export default function MultiStepInput(props: MultiStepInputProps) {
  const [currentStep, setCurrentStep] = useState(props.initIndex);
  return (
    <>
      <FormProgress currentStep={currentStep} steps={props.steps} />
      {props.steps.map((step, index) =>
        props.renderStep({ step: step, render: currentStep === index })
      )}
    </>
  );
}
