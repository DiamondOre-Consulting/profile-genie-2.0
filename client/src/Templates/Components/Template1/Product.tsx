"use client";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { productLists } from "@/validations/PortfolioValidation";

export const Product = ({
  products,
}: {
  products: productLists
}) => {


  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <Header tagline={products?.tagline as string} />
      <motion.div >
        <motion.div>
          <Marquee pauseOnHover loop={0} direction="right" speed={30} >
            {Array.from({ length: 5 }).map(() => (
              products?.productList?.slice(0, 5).map((product) => (
                <ProductCard product={product} key={product.uniqueId} />
              ))
            ))}
          </Marquee>
        </motion.div>
        <motion.div>
          <Marquee pauseOnHover loop={0} direction="left" speed={30} className="">
            {Array.from({ length: 5 }).map(() => (
              products?.productList?.slice(5, 10).map((product) => (
                <ProductCard product={product} key={product.title} />
              ))
            ))}
          </Marquee>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ tagline }: { tagline: string }) => {
  return (
    <div className="relative z-10 px-4 pt-20 pb-6 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold sm:text-5xl md:text-6xl">
        {tagline}
      </h1>

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
          className="object-cover w-full h-56"

        />
        <div className="p-6 pt-2">
          <h2 className="text-[1.2rem] font-semibold">{product.title}</h2>
          <p className="mt-1 text-sm text-gray-300 line-clamp-6">{product?.detail}</p>
        </div>
      </div>
    </motion.div>
  );
};
