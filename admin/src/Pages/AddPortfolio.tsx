import AddContactDetails from "@/components/Forms/AddPortfolio/AddContactDetails";
import AddMetaDetails from "@/components/Forms/AddPortfolio/AddMetaDetails";
import AddOthersDetail from "@/components/Forms/AddPortfolio/AddOthersDetail";
import AddProfileDetail from "@/components/Forms/AddPortfolio/AddProfileDetail";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { HomeLayout } from "@/Layout/HomeLayout";

import { useState } from "react";
import { useParams } from "react-router-dom";

const steps = [
  {
    step: 1,
    title: "Profile",
  },
  {
    step: 2,
    title: "Others",
  },
  {
    step: 3,
    title: "Contact",
  },
  {
    step: 4,
    title: "Meta",
  },
];

export default function AddPortfolio() {
  const [currentStep, setCurrentStep] = useState(1);
  const [portfolioId, setPortfolioId] = useState("");
  const { template } = useParams();

  return (
    <HomeLayout pageName="Add Portfolio">
      <div className="space-y-8 overflow-hidden relative max-w-[50rem] mx-auto bg-[#010101] pb-0 border border-[#3c3c3c] p-4 sm:p-6 lg:p-8 py-8 rounded">
        <Stepper onValueChange={setCurrentStep} value={currentStep}>
          {steps.map(({ step, title }) => (
            <StepperItem
              key={step}
              step={step}
              className="relative flex-1 !flex-col"
            >
              <div className="inline-flex flex-col items-center gap-1 text-white disabled:pointer-events-none disabled:opacity-50">
                <StepperIndicator />
                <div className="px-2">
                  <StepperTitle>{title}</StepperTitle>
                </div>
              </div>
              {step < steps.length && (
                <StepperSeparator className="absolute inset-x-0 left-[calc(50%+0.75rem+0.125rem)] top-3 -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          ))}
        </Stepper>
        {currentStep === 1 && (
          <AddProfileDetail
            template={template ?? ""}
            setId={setPortfolioId}
            setCurrentStep={setCurrentStep}
            stepsLength={steps?.length}
            currentStep={currentStep}
          />
        )}
        {currentStep === 2 && (
          <AddOthersDetail
            portfolioId={portfolioId}
            setCurrentStep={setCurrentStep}
            stepsLength={steps?.length}
            currentStep={currentStep}
          />
        )}
        {currentStep === 3 && (
          <AddContactDetails
            portfolioId={portfolioId}
            setCurrentStep={setCurrentStep}
            stepsLength={steps?.length}
            currentStep={currentStep}
          />
        )}
        {currentStep === 4 && (
          <AddMetaDetails
            portfolioId={portfolioId}
            stepsLength={steps?.length}
            currentStep={currentStep}
          />
        )}

        <p
          className="absolute bottom-0 left-0 w-full p-1 pr-4 text-xs text-white bg-main text-end"
          role="region"
          aria-live="polite"
        >
          <span className="">
            Powered by <span className="font-semibold">@profilegenie</span>
          </span>
        </p>
      </div>
    </HomeLayout>
  );
}
