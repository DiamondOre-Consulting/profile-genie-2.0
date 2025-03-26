import { useGetSingleCatalogueQuery } from '@/Redux/API/CatalogueApi'
import React, { useEffect, useState } from 'react'
import Catalogue1Layout from '../Layout/Catalogue1Layout'
import Catalogue1Hero from '../components/Catalogue1Hero'
import Product from '../components/Product'

const Catalogue1 = () => {

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
        <div className='' style={{ backgroundColor: `${data?.data?.backgroundColor}1A` }}>
            <Catalogue1Layout bgColor={data?.data?.backgroundColor} logo={data?.data?.logo?.url} name={data?.data?.name} />
            <Catalogue1Hero catalogueDetail={data?.data} />
            <Product cart={cart} setCart={setCart} categorisedProducts={data?.categorisedProducts} uncategorisedProducts={data?.uncategorisedProducts} />
        </div>
    )
}

export default Catalogue1
