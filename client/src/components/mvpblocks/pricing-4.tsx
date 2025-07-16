import { Check } from "lucide-react";

import { useState } from "react";
import { ButtonColorful } from "../ui/button-colorful";

const plan = {
  name: "NFC enabled QR Embedded Card",
  price: 300,
  description: "For your company of any size",
  features: [
    "5 x Profile Genie Smart Cards/Metallic Card/Metallic Keychain",
    "Black/White/Grey",
    "Premium PolyCard (PVC Alternative) with NFC chip & QR print",
  ],
  includes:
    "Security, Unlimited Storage, Payment, Search engine, and all features",
  companies: [
    {
      name: "Nvidia",
      logo: "https://html.tailus.io/blocks/customers/nvidia.svg",
      height: 20,
    },
    {
      name: "Column",
      logo: "https://html.tailus.io/blocks/customers/column.svg",
      height: 16,
    },
    {
      name: "GitHub",
      logo: "https://html.tailus.io/blocks/customers/github.svg",
      height: 16,
    },
    {
      name: "Nike",
      logo: "https://html.tailus.io/blocks/customers/nike.svg",
      height: 20,
    },
  ],
};

export default function ProductSection() {
  const button = [
    {
      name: "Pack of 5 PolyCards",
      href: "https://profilegenie.store/products/pvc-card?variant=44970930110652",
      img: "https://profilegenie.store/cdn/shop/files/metal_card.webp?v=1751955783&width=713",
      priceBefore: 3999,
      priceAfter: 2499,
    },
    {
      name: "Metallic Card + Keychain",
      href: "https://profilegenie.store/products/pvc-card?variant=44970940793020",
      img: "https://profilegenie.store/cdn/shop/files/Metal_Card_Keychain.jpg?v=1751966608&width=713",
      priceBefore: 3999,
      priceAfter: 3799,
    },
    {
      name: "Metallic Card",
      href: "https://profilegenie.store/products/pvc-card?variant=44970943119548",
      img: "https://profilegenie.store/cdn/shop/files/Metal_Card.png?v=1751966656&width=713",
      priceBefore: 3999,
      priceAfter: 3499,
    },
    {
      name: "5 PolyCards + Keychain",
      href: "https://profilegenie.store/products/pvc-card?variant=44970940825788",
      img: "https://profilegenie.store/cdn/shop/files/Metal_Card_Keychain.jpg?v=1751966608&width=713",
      priceBefore: 3999,
      priceAfter: 2999,
    },
  ];

  const [activeProduct, setActiveProduct] = useState<{
    name: string;
    href: string;
    img: string;
    priceBefore: number;
    priceAfter: number;
  }>(button[0]);
  return (
    <div className=" mx-auto text-white w-[97.5%] pt-16 md:pt-24 p-4 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-0 z-0 w-full productBg h-[35rem]"></div>
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] left-[50%] h-[40%] w-[60%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative h-full max-w-5xl px-6 mx-auto z-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-balance md:text-4xl lg:text-5xl">
            STILL RELYING ON BUSINESS CARDS?{" "}
            <span className="font-bold">STOP</span>.
          </h2>
        </div>
        <div className="mt-6">
          <div className="relative border shadow-xl rounded-3xl rd shadow-zinc-950/5 backdrop-blur-sm border-zinc-700/50 bg-zinc-900/70">
            <div className="grid items-center gap-12 p-4 divide-y divide-zinc-700 md:grid-cols-2 md:gap-x-2 md:divide-x-0 md:divide-y-0">
              {/* Left Side */}
              <div className="pb-8 overflow-hidden text-center md:pb-0  md:w-[90%]">
                <img
                  className="rounded-xl"
                  src={activeProduct?.img}
                  alt={activeProduct?.name}
                />
              </div>

              {/* Right Side */}
              <div className="relative w-full text-zinc-100">
                <div className="text-left ">
                  <h2 className="mb-4 text-2xl font-medium md:text-3xl">
                    {plan.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-lg">
                    <span className="text-sm line-through text-zinc-400">
                      Rs. {activeProduct?.priceBefore.toLocaleString("en-IN")}
                    </span>
                    <span className="font-semibold text-zinc-200">
                      Rs. {activeProduct?.priceAfter.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-custom-radial-full text-white text-xs font-medium px-4 py-0.5 rounded-full">
                      Sale
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-zinc-300">Taxes included.</p>

                  {/* <h4 className="mb-4 text-lg font-medium">What’s included:</h4> */}
                  <ul role="list" className="mt-4 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className=" size-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-x-3">
                  {button.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProduct(button)}
                      className={`inline-flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-white border rounded-lg cursor-pointer ${
                        button.name === activeProduct.name
                          ? "bg-custom-radial-full"
                          : ""
                      } bg-zinc-800 border-zinc-600`}
                    >
                      {button.name}
                    </button>
                  ))}
                </div>
                <ButtonColorful
                  className="w-full mt-6"
                  label="View"
                  onClick={() => window.open(activeProduct?.href, "_blank")}
                >
                  View
                </ButtonColorful>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
