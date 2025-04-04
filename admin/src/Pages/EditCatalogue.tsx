
import EditCatalogueDetail from "@/components/Forms/EditCatalogue/EditCatalogueDetail";
import EditCatalogueProducts from "@/components/Forms/EditCatalogue/EditCatalogueProducts";
import EditOwner from "@/components/Forms/EditCatalogue/EditOwner";
import EditMetaDetails from "@/components/Forms/EditPortfolio/EditMetaDetails";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper";
import { HomeLayout } from "@/Layout/HomeLayout";
import { useGetSingleCatalogueQuery } from "@/Redux/API/CatalogueApi";
import { catalogueResponse } from "@/validations/CatalogueValidation";
import { addMetaDetailsSchema } from "@/validations/PortfolioValidation";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";



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


export default function EditCatalogue() {
    const [currentStep, setCurrentStep] = useState(1)
    const [catalogueId, setCatalogueId] = useState('')
    const [catalogueData, setCatalogueData] = useState<catalogueResponse>()
    const navigate = useNavigate()
    const { username } = useParams()
    console.log(username)
    const { data, isLoading } = useGetSingleCatalogueQuery({ username })
    console.log(catalogueId)
    console.log(isLoading)
    useEffect(() => {
        if (!isLoading && !data) {
            navigate('/all-catalogue')
        }

        console.log(data)

        if (data) {
            setCatalogueData(data)
            setCatalogueId(data?.data._id)
        }
    }, [isLoading, data, navigate])

    console.log(catalogueData)
    return (
        <HomeLayout>
            <div className="space-y-8 overflow-hidden relative max-w-[50rem] mx-auto bg-[#010101] pb-0 border border-[#3c3c3c] p-4 sm:p-6 lg:p-8 py-8 rounded">
                <Stepper onValueChange={setCurrentStep} value={currentStep} >
                    {steps.map(({ step, title }) => (
                        <StepperItem key={step} step={step} className="relative flex-1 !flex-col">
                            <StepperTrigger className="flex-col gap-1 text-white">
                                <StepperIndicator />
                                <div className=" px-2">
                                    <StepperTitle>{title}</StepperTitle>
                                </div>
                            </StepperTrigger>
                            {step < steps.length && (
                                <StepperSeparator className="absolute inset-x-0 left-[calc(50%+0.75rem+0.125rem)] top-3 -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                            )}

                        </StepperItem>
                    ))}

                </Stepper>
                {currentStep === 1 &&
                    <EditOwner catalogueOwner={catalogueData?.data?.catalogueOwner} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />}
                {(currentStep === 2 && catalogueData?.data) &&
                    <EditCatalogueDetail
                        catalogueDetail={catalogueData?.data}
                        setCurrentStep={setCurrentStep}
                        stepsLength={steps.length}
                        currentStep={currentStep}
                    />
                }
                {currentStep === 3 &&
                    <EditCatalogueProducts

                        ownerId={catalogueData?.data?.catalogueOwner?._id ?? ""}
                        userName={catalogueData?.data?.userName}
                        setCurrentStep={setCurrentStep}
                        currentStep={currentStep}
                    />
                }
                {currentStep === 4 &&
                    <EditMetaDetails metaDetails={catalogueData?.data?.metaDetails as z.infer<typeof addMetaDetailsSchema>} catalogueId={catalogueData?.data?._id ?? ""} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />
                }
                <p className="bg-[#E11D48] w-full bottom-0 p-1 pr-4 left-0 absolute text-xs text-end text-white" role="region" aria-live="polite">
                    <span className="">
                        Powered by <span className="font-semibold">@profilegenie</span>
                    </span>
                </p>
            </div>
        </HomeLayout>
    );
}
