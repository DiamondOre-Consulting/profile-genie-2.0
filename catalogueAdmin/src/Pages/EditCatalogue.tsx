
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
import { addContactDetailSchema, addMetaDetailsSchema, addOthersDetailSchema, apiRes } from "@/validations/PortfolioValidation";

import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
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
    const [catalogueData, setCatalogueData] = useState<apiRes>()
    const navigate = useNavigate()
    const { username } = useParams()
    console.log(username)
    const { data, isLoading } = useGetSingleCatalogueQuery({ username: "test" })
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

    console.log(data)
    return (
        <Routes>

            <Route path="/profile" element={<EditOwner catalogueOwner={catalogueData?.data?.catalogueOwner} catalogueId={catalogueId} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />} />

            <Route path="/detail"
                element={<EditCatalogueDetail
                    catalogueDetail={catalogueData?.data}
                    setCurrentStep={setCurrentStep}
                    stepsLength={steps.length}
                    currentStep={currentStep}
                />} />

            <Route path="/products" element={<EditCatalogueProducts
                categorisedProduct={catalogueData?.categorisedProducts}
                uncategorisedProduct={catalogueData?.uncategorisedProducts}
                ownerId={catalogueData?.data?.catalogueOwner?._id}
                userName={catalogueData?.data?.userName}
                setCurrentStep={setCurrentStep}
                stepsLength={steps.length}
                currentStep={currentStep}
            />} />

            <Route path="/meta-details" element={<EditMetaDetails metaDetails={catalogueData?.data?.metaDetails as z.infer<typeof addMetaDetailsSchema>} catalogueId={catalogueData?.data?._id} setCurrentStep={setCurrentStep} stepsLength={steps.length} currentStep={currentStep} />

            } />
            {/* <p className="bg-[#E11D48] w-full bottom-0 p-1 pr-4 left-0 absolute text-xs text-end text-white" role="region" aria-live="polite">
                <span className="">
                    Powered by <span className="font-semibold">@profilegenie</span>
                </span>
            </p> */}
        </Routes >
    );
}
