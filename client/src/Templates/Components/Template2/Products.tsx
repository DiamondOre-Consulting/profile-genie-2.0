import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioResponse } from '@/validations/PortfolioValidation';

gsap.registerPlugin(ScrollTrigger);

interface Product {
    title?: string;
    detail?: string;
    image?: {
        url?: string;
        publicId?: string;
    };
}

const Products = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
    const productsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        productsRef.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            end: 'top 30%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: index * 0.2,
                        duration: 1,
                    }
                );
            }
        });
    }, []);

    return (
        <>
            {portfolioData?.otherDetails?.products?.productList && portfolioData.otherDetails.products.productList.length > 0 && (
                <div className="w-full max-w-screen-xl px-4 pt-20 mx-auto md:px-10" id='products'>
                    <div className='w-full mb-20 md:w-fit'>
                        <h1 className="text-4xl font-bold text-left md:text-5xl md:text-6xl">
                            {portfolioData?.otherDetails?.products?.tagline || "Our Products"}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioData.otherDetails.products.productList.map((product: Product, index: number) => (
                            <div
                                key={index}
                                ref={el => {
                                    if (el) productsRef.current[index] = el;
                                }}
                                className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
                            >
                                {product?.image?.url && (
                                    <img
                                        src={product.image.url}
                                        alt={product?.title || 'Product Image'}
                                        className="object-cover w-full h-54"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="mb-2 text-xl font-bold md:text-2xl">{product?.title || ''}</h2>
                                    <p className="text-sm md:text-base" dangerouslySetInnerHTML={{ __html: product?.detail || '' }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
