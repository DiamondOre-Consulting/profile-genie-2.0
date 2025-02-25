import AddContactDetails from "@/components/Forms/AddPortfolio/AddContactDetails";
import AddMetaDetails from "@/components/Forms/AddPortfolio/AddMetaDetails";
import AddOthersDetail from "@/components/Forms/AddPortfolio/AddOthersDetail";
import AddProfileDetail from "@/components/Forms/AddPortfolio/AddProfileDetail";
import EditOthersDetail from "@/components/Forms/EditPortfolio/EditOthersDetail";
import EditProfileDetail from "@/components/Forms/EditPortfolio/EditProfileDetail";
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper";
import { HomeLayout } from "@/Layout/HomeLayout";
import { useGetSinglePortfolioQuery } from "@/Redux/API/PortfolioApi";
import { apiRes } from "@/validations/PortfolioValidation";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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


export default function EditPortfolio() {
    const [currentStep, setCurrentStep] = useState(1)
    const [portfolioId, setPortfolioId] = useState('')
    const [portfolioData, setPortfolioData] = useState<apiRes>()
    const navigate = useNavigate()
    const { username } = useParams()
    console.log(username)
    const { data, isLoading } = useGetSinglePortfolioQuery({ username })
    console.log(portfolioData)
    console.log(isLoading)
    useEffect(() => {
        if (!isLoading && !data) {
            // toast.error("No data found!")
            navigate('/all-portfolio')
        }

        console.log(data)

        if (data) {
            setPortfolioData(data)
            setPortfolioId(data._id)
        }
    }, [isLoading, data, navigate])

    console.log(data)
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
                    <EditProfileDetail setId={setPortfolioId} portfolioDetail={portfolioData} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />}
                {currentStep === 2 &&
                    portfolioData?.data?.otherDetails && (
                        <EditOthersDetail
                            othersDetail={portfolioData.data.otherDetails}
                            portfolioId={portfolioId}
                            setCurrentStep={setCurrentStep}
                            stepsLength={steps.length}
                            currentStep={currentStep}
                        />
                    )
                }
                {currentStep === 3 &&
                    <AddContactDetails portfolioId={portfolioId} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />}
                {currentStep === 4 &&
                    <AddMetaDetails portfolioId={portfolioId} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />}

                <p className="bg-[#E11D48] w-full bottom-0 p-1 pr-4 left-0 absolute text-xs text-end text-white" role="region" aria-live="polite">
                    <span className="">
                        Powered by <span className="font-semibold">@profilegenie</span>
                    </span>
                </p>
            </div>
        </HomeLayout>
    );
}
