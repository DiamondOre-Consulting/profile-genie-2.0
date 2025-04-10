import { useGetSingleCatalogueQuery } from '@/Redux/API/CatalogueApi';
import React, { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom';
import Catalogue1 from './Page/Catalogue1';
import Catalogue1Layout from './Layout/Catalogue1Layout';
import Catalogue1Cart from './Page/Catalogue1Cart';
import ProductDetail from './Page/ProductDetail';
import { catalogueResponse, metaDetails } from '@/validations/CatalogueValidation';

const Catalogue1Dashboard = ({ setMetaDetails }: { setMetaDetails: React.Dispatch<React.SetStateAction<metaDetails | undefined>> }) => {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const { userName } = useParams()

    const [catalogueData, setCatalogueData] = useState<catalogueResponse>()

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const { data, isLoading, isFetching, error } = useGetSingleCatalogueQuery({ username: userName })
    useEffect(() => {
        if (!isFetching && !isLoading) {
            if (data?.data?.isPaid === false || data?.data?.isActive === false) {
                window.location.href = "https://profilegenie.store"
            }
            setCatalogueData(data)
            setMetaDetails(data?.data?.metaDetails)
        }
    }, [isFetching, data, isLoading])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!catalogueData && !isFetching && !isLoading) {
        if (error) {
            return (
                window.location.href = "https://profilegenie.store"
            )
        }
    }


    return (
        <>
            {catalogueData && (
                <Catalogue1Layout cart={cart} data={catalogueData}>
                    <Routes>
                        <Route path="/" element={<Catalogue1 cart={cart} setCart={setCart} data={catalogueData} />} />
                        <Route path='/cart' element={<Catalogue1Cart cart={cart} setCart={setCart} data={catalogueData} bgColor={catalogueData?.data?.backgroundColor} />} />
                        <Route path='/product/:productId' element={<ProductDetail userName={userName ?? ''} cart={cart} setCart={setCart} productData={catalogueData} bgColor={catalogueData?.data?.backgroundColor} />} />
                    </Routes>
                </Catalogue1Layout>
            )}
        </>

    )
}

export default Catalogue1Dashboard
