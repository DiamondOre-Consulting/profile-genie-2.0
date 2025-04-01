
import Catalogue1Hero from '../components/Catalogue1Hero'
import Product from '../components/Product'
import Contact from '../components/Contact'

const Catalogue1 = ({ cart, setCart, data }) => {

    const lightenColor = (color, percent) => {
        const num = parseInt(color?.slice(1), 16),
            amt = Math.round(2.55 * percent * 100),
            r = (num >> 16) + amt,
            g = ((num >> 8) & 0x00ff) + amt,
            b = (num & 0x0000ff) + amt;

        return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`;
    };

    return (
        <div className='' style={{ backgroundColor: lightenColor(data?.data?.backgroundColor, 0.85) }}>
            <Catalogue1Hero catalogueDetail={data?.data} />
            <div id='product'>
                <Product cart={cart} setCart={setCart} data={data} />
            </div>
            <Contact contact={data?.data?.catalogueOwner} bgColor={data?.data?.backgroundColor} />
        </div>
    )
}

export default Catalogue1
