import { useState } from "react";

export const useSteps = ({ initialStep, totalSteps }) => {
  const [activeStep, setActiveStep] = useState(initialStep ?? 1);

  const nextStep = () => {
    setActiveStep((prev) => (prev += 1));
  };

  const backStep = () => {
    setActiveStep((prev) => (prev -= 1));
  };

  const skip = () => {
    setActiveStep(totalSteps);
  };

  return { nextStep, backStep, skip, activeStep, setStep: setActiveStep };
};
