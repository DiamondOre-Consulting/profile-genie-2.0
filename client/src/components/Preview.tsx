import { useState } from "react";
import { Badge } from "./ui/badge";
import Hero from "@/Templates/Components/Template1/Hero";
import { Controller, useForm } from "react-hook-form";
import {
  addPortfolioSchema,
  portfolioSchema,
  addPreviewSchema,
  previewDetail,
} from "../validations/PortfolioValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import previewImage from "../assets/previewImage.png";
import { ButtonColorful } from "./ui/button-colorful";
import { IconMan, IconShare3, IconWoman } from "@tabler/icons-react";
import { Link } from "react-scroll";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { scroller } from "react-scroll";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = () => {
    scroller.scrollTo("preview", {
      smooth: true,
      duration: 500,
    });
  };

  const {
    register: previewRegister,
    watch: previewWatch,
    handleSubmit,
    formState: { errors },
  } = useForm<previewDetail>({
    resolver: zodResolver(addPreviewSchema),
  });

  const { watch, setValue, control } = useForm<portfolioSchema>({
    resolver: zodResolver(addPortfolioSchema),
    defaultValues: {
      fullName: "Profile Genie",
      tagline: "Business Development Manager",
      shortDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      image: {
        publicId: "",
        url: previewImage,
      },
      gender: previewWatch("gender"),
      contactData: {
        whatsappNo: 918529457530,
      },
    },
  });

  const formValues = watch();

  const onSubmit = (data: previewDetail) => {
    setValue("fullName", data.fullName);
    setValue("tagline", data.tagline);
    setValue("shortDescription", data.shortDescription);
    setIsOpen(false);
    setTimeout(() => {
      handleScroll();
    }, 100);
  };

  return (
    <div
      id="demo"
      className="min-h-screen mx-auto text-white w-[97.5%] relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute top-0 w-full h-[39rem] productBg z-0"></div>
      <div className="relative z-[10] h-full max-w-[45rem] mt-20">
        <div className="flex w-[98%] mx-auto flex-col items-center gap-4 text-center">
          <Badge className="bg-[#1b1638] border border-[#2e2e2e]">
            Preview Portfolio
          </Badge>
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="inline-block pb-2 text-transparent bg-clip-text lg:pb-3 bg-gradient-to-b from-white to-white/70">
              Ditch the Paper
            </span>
            <br />
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
              )}
            >
              Elevate Your Networking!
            </span>
          </h1>

          <p className="text-muted-foreground">
            Ready to elevate your networking game? Take a demo of your portfolio
            today and see how it can help you stand out from the crowd.
          </p>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger onClick={() => setIsOpen(true)} asChild>
              <ButtonColorful label="Try Demo!" />
            </DrawerTrigger>
            <DrawerContent>
              <form
                className="w-full max-w-sm mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                <DrawerHeader>
                  <DrawerTitle>Add Task</DrawerTitle>
                  <DrawerDescription>
                    Add details to get portfolio demo.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="grid gap-2 p-4">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      {...previewRegister("fullName")}
                      id="name"
                      placeholder="Enter task name here"
                    />
                    {errors.fullName && (
                      <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="name">Tagline</Label>
                    <Input
                      {...previewRegister("tagline")}
                      placeholder="Enter task name here"
                    />
                    {errors.tagline && (
                      <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                        {errors.tagline.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="name">About</Label>
                    <Textarea
                      {...previewRegister("shortDescription")}
                      placeholder="Enter task name here"
                    />
                    {errors.shortDescription && (
                      <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                        {errors.shortDescription.message}
                      </p>
                    )}
                  </div>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={previewWatch("gender")}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label htmlFor="gender" className="text-gray-500">
                          Gender
                        </Label>
                        <RadioGroup
                          id="gender"
                          className="grid grid-cols-2 gap-2"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <RadioGroupItem
                            value="male"
                            className={`flex items-center justify-center px-4 py-2  text-sm font-semibold transition-colors border rounded-md border-zinc-200 ${
                              field.value === "male"
                                ? "bg-zinc-200 text-black"
                                : "text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center justify-center w-5 h-5 mr-2 ">
                              <IconMan />
                            </div>
                            <span className="text-sm font-semibold">Male</span>
                          </RadioGroupItem>

                          <RadioGroupItem
                            value="female"
                            className={`flex items-center justify-center px-4 py-2 text-sm font-semibold transition-colors border rounded-md border-zinc-200 ${
                              field.value === "female"
                                ? "bg-zinc-200 text-black"
                                : "text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center justify-center w-5 h-5 mr-2 ">
                              <IconWoman />
                            </div>
                            <span className="text-sm font-semibold">
                              Female
                            </span>
                          </RadioGroupItem>
                        </RadioGroup>
                        {errors.gender && (
                          <p className="text-[#ff3f69] tracking-wide text-sm font-semibold">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                  <Button
                    type="submit"
                    className="w-full p-0 font-semibold text-center text-black bg-white border rounded-md hover:text-white hover:bg-neutral-800 border-neutral-600"
                  >
                    Preview
                  </Button>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div
        id="preview"
        className={`mx-auto rounded-2xl sm:w-[90%] p-2 mt-5 bg-purple-900/40 border border-gray-700`}
      >
        <div className=" z-[100] mx-auto rounded-xl overflow-hidden bg-white shadow">
          <div className="flex items-center justify-between gap-4 p-2 text-white bg-black rounded-t-lg">
            <div className="flex gap-2 px-4">
              <div className="bg-red-500 rounded-full size-3"></div>
              <div className="bg-yellow-500 rounded-full size-3"></div>
              <div className="bg-green-500 rounded-full size-3"></div>
            </div>
            <p className="w-fit">Portfolio Preview</p>
            {/* <div className="relative z-10 flex gap-2 p-1 border border-gray-700 rounded cursor-pointer bg-neutral-950">
              <Edit />
            </div> */}
          </div>
          <nav className="bg-[#101828] text-white backdrop-blur-md  top-0 left-0 w-full z-1000  ">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
              <Link
                to={"/portfolio/preview/template1"}
                className="flex items-center justify-center space-x-1 rtl:space-x-reverse"
              >
                <div className="flex items-center">
                  <div className="bg-[#0891B2] relative left-2 size-8 rounded-full"></div>
                  <div className="bg-[#F43F5E]  size-6 rounded-full"></div>
                </div>
              </Link>
              <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-[#F43F5E] hover:bg-[#F43F5E]/90 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center "
                >
                  <IconShare3 />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 transition duration-300 relative z-[100] ease-in-out ${
                  isOpen ? " top-0 left-0 right-0 bottom-0 flex-col" : "hidden"
                }`}
                id="navbar-cta"
              >
                <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg cursor-pointer md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <Link
                    to="home"
                    smooth={true}
                    duration={500}
                    className="hover:underline"
                  >
                    Home
                  </Link>
                  <Link
                    to="about"
                    smooth={true}
                    duration={500}
                    className="hover:underline"
                  >
                    About
                  </Link>
                  <Link
                    to="services"
                    smooth={true}
                    duration={500}
                    className="hover:underline"
                  >
                    Services
                  </Link>
                  <Link
                    to="product"
                    smooth={true}
                    duration={500}
                    className="hover:underline"
                  >
                    Product
                  </Link>
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="hover:underline"
                  >
                    Contact
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
          <Hero portfolio={formValues} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
