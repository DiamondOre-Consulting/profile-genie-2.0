import { cn } from "@/lib/utils";
import { IconAdjustments, IconChartBar, IconClick, IconCloud, IconCurrencyDollar, IconLeaf, IconMessageCircle, IconShare, IconSmartHome, IconUsers } from "@tabler/icons-react";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Convenience",
            description: "Always accessible on your phone.",
            icon: <IconSmartHome />,
        },
        {
            title: "Contact Sharing",
            description: "Instantly saves contact card with image and social media links on one scan.",
            icon: <IconShare />,
        },

        {
            title: "Eco-Friendliness",
            description: "100% digital, sustainable & eco-friendly.",
            icon: <IconLeaf />,
        },
        {
            title: "Networking Efficiency",
            description: "One tap or scan for instant connections.",
            icon: <IconUsers />,
        },
        {
            title: "Follow-ups",
            description: "Direct WhatsApp integration for instant communication.",
            icon: <IconMessageCircle />,
        },
        {
            title: "Storage & Accessibility",
            description: "Stored digitally, accessible anytime.",
            icon: <IconCloud />,
        },
        {
            title: "Cost-Effectiveness",
            description: "One-time setup, unlimited modifications.",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "Interactivity",
            description: "Clickable links, videos, social profiles & portfolio.",
            icon: <IconClick />,
        },

    ];

    return (
        <div className="flex items-center justify-center flex-col py-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">
                Why Choose Us?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  relative z-10  max-w-7xl mx-auto">

                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col border py-10 bg-[#010102] relative group/feature border-neutral-800",

            )}
        >
            {index < 2 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#6738e7]/80 via-[#4826A7]/20  to-transparent pointer-events-none" />
            )}
            {index >= 2 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#6738e7]/80 via-[#4826A7]/20  to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-[#6E3DEF] transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
