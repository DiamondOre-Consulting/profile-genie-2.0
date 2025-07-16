import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";
import { cn } from "@/lib/utils";

const items = [
  {
    id: "1",
    title: "What is Profile Genie?",
    content:
      "Profile Genie is a modern networking tool that combines a smart physical NFC business card with a personal landing page. It helps you share your contact details instantly and turn real-world conversations into high-value business leads.",
  },
  {
    id: "2",
    title: "How does the smart card work?",
    content:
      "The Profile Genie card uses NFC technology. Simply tap the card on any smartphone, and your personalized landing page opens instantly — no app required. You can also share your page with a QR code.",
  },
  {
    id: "3",
    title: "What can I put on my landing page?",
    content:
      "Your landing page can include your contact info, social media links, portfolio, booking links, payment links, and more. It’s fully customizable so you can showcase exactly what you want to share with your connections.",
  },
  {
    id: "4",
    title: "Do I need an app to use Profile Genie?",
    content:
      "No app needed! Once you order your smart card, our team will set up your personalized landing page or portfolio for you. You’ll get a ready-to-share digital profile that works instantly with your card — just tap and connect.",
  },

  {
    id: "5",
    title: "Who can use Profile Genie?",
    content:
      "Profile Genie is perfect for entrepreneurs, freelancers, business owners, and professionals who want to stand out and make every introduction count. Whether you’re networking at events, meetings, or on the go, it’s your modern alternative to paper business cards.",
  },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.4,
    },
  }),
};

export default function Faq1() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-6xl px-4 mx-auto md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-white justify-center max-w-[600px] mx-auto"
        >
          <span className="text-sm font-semibold">Testimonial</span>
          <h1 className="inline-block text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-b from-white to-white/70">
            Frequently Asked Questions
          </h1>

          <p className="mt-5 text-center opacity-75">
            Everything you need to know about Profile Genie.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-3xl mx-auto mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Decorative gradient */}
          <div className="absolute rounded-full -left-4 -top-4 -z-10 h-72 w-72 bg-red-800/50 blur-3xl" />
          <div className="absolute rounded-full -bottom-4 -right-4 -z-10 h-72 w-72 bg-primary/10 blur-3xl" />

          <Accordion
            type="single"
            collapsible
            className="w-full p-2 border rounded-xl border-zinc-600 bg-[#04030674] backdrop-blur-sm"
            defaultValue="1"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={item.id}
                  className={cn(
                    "my-1 overflow-hidden rounded-lg border border-zinc-800 bg-[#18181B] px-2 shadow-sm transition-all",
                    "data-[state=open]:bg-card/80 data-[state=open]:shadow-md"
                  )}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "group flex flex-1 items-center text-zinc-300 justify-between gap-4 py-4 text-left text-base font-medium",
                        "outline-none transition-all duration-300 hover:text-primary",
                        "focus-visible:ring-2 focus-visible:ring-zinc-600",
                        "data-[state=open]:text-zinc-200"
                      )}
                    >
                      {item.title}
                      <PlusIcon
                        size={18}
                        className={cn(
                          "shrink-0 text-zinc-100 transition-transform duration-300 ease-out",
                          "group-data-[state=open]:rotate-45"
                        )}
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent
                    className={cn(
                      "overflow-hidden pb-4 pt-0 text-zinc-200",
                      "data-[state=open]:animate-accordion-down",
                      "data-[state=closed]:animate-accordion-up"
                    )}
                  >
                    <div className="pt-3 border-t border-zinc-600">
                      {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
