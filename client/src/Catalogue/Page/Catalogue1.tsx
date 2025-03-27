import { useGetSingleCatalogueQuery } from '@/Redux/API/CatalogueApi'
import React, { useEffect, useState } from 'react'
import Catalogue1Layout from '../Layout/Catalogue1Layout'
import Catalogue1Hero from '../components/Catalogue1Hero'
import Product from '../components/Product'

const Catalogue1 = ({ cart, setCart, data }) => {

    return (
        <div className='' style={{ backgroundColor: `${data?.data?.backgroundColor}1A` }}>
            <Catalogue1Hero catalogueDetail={data?.data} />
            <Product cart={cart} setCart={setCart} categorisedProducts={data?.categorisedProducts} uncategorisedProducts={data?.uncategorisedProducts} />
        </div>
    )
}

export default Catalogue1
