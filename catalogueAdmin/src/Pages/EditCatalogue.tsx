
import EditCatalogueDetail from "@/components/Forms/EditCatalogue/EditCatalogueDetail";
import EditCatalogueProducts from "@/components/Forms/EditCatalogue/EditCatalogueProducts";
import EditMetaDetails from "@/components/Forms/EditCatalogue/EditMetaDetails";
import EditOwner from "@/components/Forms/EditCatalogue/EditOwner";

import { useGetSingleCatalogueQuery } from "@/Redux/API/CatalogueApi";
import { catalogueResponse } from "@/validations/CatalogueValidation";
import { addMetaDetailsSchema } from "@/validations/PortfolioValidation";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { z } from "zod";


export default function EditCatalogue() {
    // const [catalogueId, setCatalogueId] = useState('')
    const [catalogueData, setCatalogueData] = useState<catalogueResponse>()
    const navigate = useNavigate()
    const _id = useSelector((state: any) => state?.auth?.user?._id)

    const { data, isLoading } = useGetSingleCatalogueQuery({ authId: _id })

    useEffect(() => {
        if (!isLoading && !data) {
            navigate('/all-catalogue')
        }

        console.log(data)

        if (data) {
            setCatalogueData(data)
        }
    }, [isLoading, data, navigate])

    console.log(data)
    return (
        <Routes>

            <Route path="/profile" element={<EditOwner catalogueOwner={catalogueData?.data?.catalogueOwner} />} />

            <Route path="/detail"
                element={catalogueData?.data && (
                    <EditCatalogueDetail
                        catalogueDetail={catalogueData.data}
                    />)} />

            <Route path="/products" element={<EditCatalogueProducts
                ownerId={catalogueData?.data?.catalogueOwner?._id ?? ""}
                userName={catalogueData?.data?.userName}

            />} />

            <Route path="/meta-data" element={<EditMetaDetails metaDetails={catalogueData?.data?.metaDetails as z.infer<typeof addMetaDetailsSchema>} catalogueId={catalogueData?.data?._id ?? ""} />

            } />
            {/* <p className="bg-[#E11D48] w-full bottom-0 p-1 pr-4 left-0 absolute text-xs text-end text-white" role="region" aria-live="polite">
                <span className="">
                    Powered by <span className="font-semibold">@profilegenie</span>
                </span>
            </p> */}
        </Routes >
    );
}
