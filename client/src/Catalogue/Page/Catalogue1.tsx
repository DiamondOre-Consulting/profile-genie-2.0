import { useGetSingleCatalogueQuery } from '@/Redux/API/CatalogueApi'
import React from 'react'
import Catalogue1Layout from '../Layout/Catalogue1Layout'
import Catalogue1Hero from '../components/Catalogue1Hero'

const Catalogue1 = () => {

    const { data, isLoading } = useGetSingleCatalogueQuery({ username: "test" })
    console.log(data)
    return (
        <div className='' style={{ backgroundColor: `${data?.data?.backgroundColor}1A` }}>
            <Catalogue1Layout bgColor={data?.data?.backgroundColor} logo={data?.data?.logo?.url} name={data?.data?.name} />
            <Catalogue1Hero catalogueDetail={data?.data} />
        </div>
    )
}

export default Catalogue1
