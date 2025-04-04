
import AddCatalogueDetail from "@/components/Forms/AddCatalogue/AddCatalogueDetail";
import AddCatalogueProducts from "@/components/Forms/AddCatalogue/AddCatalogueProducts";
import AddMetaDetails from "@/components/Forms/AddCatalogue/AddMetaDetails";
import AddOwner from "@/components/Forms/AddCatalogue/AddOwner";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
} from "@/components/ui/stepper";
import { HomeLayout } from "@/Layout/HomeLayout";

import { useState } from "react";

const steps = [
    {
        step: 1,
        title: "Owner",
    },
    {
        step: 2,
        title: "Catalogue",
    },
    {
        step: 3,
        title: "Product",
    },
    {
        step: 4,
        title: "Meta",
    },
];



export default function AddCatalogue() {
    const [currentStep, setCurrentStep] = useState(1)
    const [ownerId, setOwnerId] = useState('')
    const [userName, setUserName] = useState('')


    return (
        <HomeLayout>
            <div className="space-y-8  relative max-w-[50rem] mx-auto bg-[#010101] pb-0 border border-[#3c3c3c] p-4 sm:p-6 lg:p-8 py-8 rounded">
                <Stepper onValueChange={setCurrentStep} value={currentStep} >
                    {steps.map(({ step, title }) => (
                        <StepperItem key={step} step={step} className="relative flex-1 !flex-col">
                            <div className="flex-col gap-1 text-white inline-flex items-center  disabled:pointer-events-none disabled:opacity-50">
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
                {currentStep === 1 &&
                    <AddOwner setOwnerId={setOwnerId} setCurrentStep={setCurrentStep} stepsLength={steps?.length} currentStep={currentStep} />}
                {currentStep === 2 &&
                    <AddCatalogueDetail setUserName={setUserName} ownerId={ownerId} setCurrentStep={setCurrentStep} stepsLength={steps?.length} currentStep={currentStep} />}
                {currentStep === 3 &&
                    <AddCatalogueProducts userName={userName} ownerId={ownerId} setCurrentStep={setCurrentStep} currentStep={currentStep} />}
                {currentStep === 4 &&
                    <AddMetaDetails ownerId={ownerId} stepsLength={steps?.length} currentStep={currentStep} />}

                <p className="bg-[#E11D48] w-full bottom-0 p-1 pr-4 left-0 absolute text-xs text-end text-white" role="region" aria-live="polite">
                    <span className="">
                        Powered by <span className="font-semibold">@profilegenie</span>
                    </span>
                </p>
            </div>
        </HomeLayout>
    );
}
