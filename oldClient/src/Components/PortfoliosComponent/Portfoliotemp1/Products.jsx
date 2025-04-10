import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Products = ({ portfolioData }) => {
    const productsRef = useRef([]);

    useEffect(() => {
        productsRef.current.forEach((el, index) => {
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
        });
    }, []);


    const primaryTextColor = portfolioData.primaryTextColor;
    const buttonBgColor = portfolioData.buttonColor;
    const secondaryTextColor = portfolioData.secondaryTextColor;
    const backgroundColor = portfolioData.bgColor || '#000000';

    const shouldRender = portfolioData.products && portfolioData.products.length > 0;
    const logoUrl = portfolioData.productImage;
    return (
        <>
            {shouldRender && (
                <div className="  text-gray-800 " id='products'>
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="text-5xl md:text-6xl font-bold text-left text-gray-800  mb-20 px-4">
                            Our Products
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-0 px-6">
                            {portfolioData.products.map((product, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (productsRef.current[index] = el)}
                                    className="bg-white  shadow-lg rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={product.productImage}
                                        alt="Headless UI"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4 md:p-6">
                                        <h3 className="text-xl font-semibold  mb-2" style={{ color: portfolioData.secondaryTextColor }}>
                                            {product.productName}
                                        </h3>
                                        <p className="  mb-2 two-lines" style={{ color: portfolioData.primaryTextColor }}>
                                            {product.productDescription}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
