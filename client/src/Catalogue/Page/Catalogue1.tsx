
import Catalogue1Hero from '../components/Catalogue1Hero'
import Product from '../components/Product'
import Contact from '../components/Contact'
import { lightenColor } from '../Hooks/calculations'
import { catalogueResponse, productDetail } from '@/validations/CatalogueValidation'

const Catalogue1 = ({ cart, setCart, data }: { cart: productDetail[], setCart: React.Dispatch<React.SetStateAction<productDetail[]>>, data: catalogueResponse }) => {

    return (
        <div className='' style={{ backgroundColor: lightenColor(data?.data?.backgroundColor, 0.85) }}>
            <Catalogue1Hero catalogueDetail={data?.data} />
            <Product cart={cart} setCart={setCart} data={data} />
            <Contact contact={data?.data?.catalogueOwner} bgColor={data?.data?.backgroundColor} fullName={data?.data?.name} />
        </div>
    )
}

export default Catalogue1
