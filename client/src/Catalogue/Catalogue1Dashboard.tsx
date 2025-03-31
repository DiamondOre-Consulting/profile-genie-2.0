import { useGetSingleCatalogueQuery } from '@/Redux/API/CatalogueApi';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Catalogue1 from './Page/Catalogue1';
import Catalogue1Layout from './Layout/Catalogue1Layout';
import Catalogue1Cart from './Page/Catalogue1Cart';
import ProductDetail from './Page/ProductDetail';

const Catalogue1Dashboard = () => {

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const { data, isLoading } = useGetSingleCatalogueQuery({ username: "test" })
    console.log(data)
    return (
        <>
            <Catalogue1Layout cart={cart} data={data}>
                <Routes>
                    <Route path="/" element={<Catalogue1 cart={cart} setCart={setCart} data={data} />} />
                    <Route path='/cart' element={<Catalogue1Cart cart={cart} setCart={setCart} data={data} />} />
                    <Route path='/product/:productId' element={<ProductDetail cart={cart} setCart={setCart} productData={data} />} />
                </Routes>
            </Catalogue1Layout>
        </>
    )
}

export default Catalogue1Dashboard
