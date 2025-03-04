"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Marquee from "react-fast-marquee";
import { productLists } from "@/validations/PortfolioValidation";

export const Product = ({
  products,
}: {
  products: productLists
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 200, damping: 30, bounce: 0 };


  const [initialMargin, setInitialMargin] = React.useState(240);

  React.useEffect(() => {
    const updateMargin = () => {
      setInitialMargin(window.innerWidth < 768 ? 500 : 380);
    };

    updateMargin();
    window.addEventListener("resize", updateMargin);

    return () => window.removeEventListener("resize", updateMargin);
  }, []);

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0], [0, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [20, 0]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [-1100, 0]),
    springConfig
  );

  const marginTop = useSpring(
    useTransform(scrollYProgress, [0, 2], [initialMargin, 0]),
    springConfig
  );

  console.log(products?.productList)

  return (
    <div ref={ref} style={{ perspective: 1000 }} className="h-full overflow-hidden  relative flex flex-col">
      <Header />
      <motion.div style={{ marginTop, rotateX, rotateZ, translateY, opacity }} >
        <motion.div>
          <Marquee pauseOnHover loop={0} direction="right" speed={30} >
            {products?.productList?.slice(0, 5).map((product) => (
              <ProductCard product={product} key={product.uniqueId} />
            ))}
          </Marquee>
        </motion.div>
        <motion.div>
          <Marquee pauseOnHover loop={0} direction="left" speed={30} className="">
            {products?.productList?.slice(5, 10).map((product) => (
              <ProductCard product={product} key={product.title} />
            ))}
          </Marquee>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative z-10 mx-auto py-20 md:py-40 px-4">
      <h1 className="text-2xl md:text-7xl font-bold">
        Products
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, harum repudiandae! Asperiores, incidunt veritatis reiciendis sint perspiciatis mollitia consequatur dolor velit cupiditate!
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
}: {
  product: {
    uniqueId?: string | undefined;
    title?: string | undefined;
    detail?: string | undefined;
    image?: {
      publicId?: string | undefined;
      url?: string | undefined;
    } | undefined;
  }
}) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="group/product m-3   flex-shrink-0 min-h-[28rem] sm:min-h-[25.5rem] text-white rounded-2xl overflow-hidden  h-full relative shadow-lg bg-gray-900  max-w-[19rem] sm:max-w-[26rem]"
      style={{ height: '100%' }}
    >
      <div className="">
        <img
          src={product?.image?.url}
          alt={product.title}
          className="w-full h-56 object-cover"

        />
        <div className="p-6 pt-2">
          <h2 className="text-[1.2rem] font-semibold">{product.title}</h2>
          <p className="text-gray-300 mt-1 text-sm line-clamp-6">{product?.detail}</p>
        </div>
      </div>
    </motion.div>
  );
};
