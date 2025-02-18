import { useState } from "react";
import {
    Icon2fa,
    IconBellRinging,
    IconDatabaseImport,
    IconFileAnalytics,
    IconFingerprint,
    IconKey,
    IconLicense,
    IconLogout,
    IconMessage2,
    IconMessages,
    IconReceipt2,
    IconReceiptRefund,
    IconSettings,
    IconShoppingCart,
    IconSwitchHorizontal,
    IconUsers,
} from "@tabler/icons-react";
import { SegmentedControl, Text, Burger } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const tabs = {
    account: [
        { link: "", label: "Notifications", icon: IconBellRinging },
        { link: "", label: "Billing", icon: IconReceipt2 },
        { link: "", label: "Security", icon: IconFingerprint },
        { link: "", label: "SSH Keys", icon: IconKey },
        { link: "", label: "Databases", icon: IconDatabaseImport },
        { link: "", label: "Authentication", icon: Icon2fa },
        { link: "", label: "Other Settings", icon: IconSettings },
    ],
    general: [
        { link: "", label: "Orders", icon: IconShoppingCart },
        { link: "", label: "Receipts", icon: IconLicense },
        { link: "", label: "Reviews", icon: IconMessage2 },
        { link: "", label: "Messages", icon: IconMessages },
        { link: "", label: "Customers", icon: IconUsers },
        { link: "", label: "Refunds", icon: IconReceiptRefund },
        { link: "", label: "Files", icon: IconFileAnalytics },
    ],
};

export function NavbarSegmented() {
    const [section, setSection] = useState<"account" | "general">("account");
    const [active, setActive] = useState("Billing");
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const links = tabs[section].map((item) => (
        <a
            className={`flex items-center overflow-hidden space-x-2 p-2.5 rounded-md transition-all duration-300 
                ${active === item.label ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700"} 
                ${collapsed ? "justify-center" : ""}`}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={`min-w-5.5 min-h-5.5  `} stroke={1.5} />
            {!collapsed && <span className="min-w-[15rem] ">{item.label}</span>}
        </a>
    ));

    return (
        <>
            {/* Burger Button moves along with the sidebar */}


            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg transition-all duration-300 
                ${collapsed ? "w-15" : "w-64"} `}
            >
                <div className={`relative  left-${collapsed ? "w-16" : "w-64"} transition-all p-3 duration-300 z-50`}>
                    <Burger opened={!collapsed} onClick={toggleSidebar} aria-label="Toggle sidebar" />
                </div>


                <div className={`${collapsed ? "px-2" : "px-3"} border-t border-gray-700 flex flex-col  py-1 space-y-1`}>{links}</div>

                <div className="p-2.5 mt-auto border-t border-gray-700">
                    {/* <a
                        href="#"
                        className={`${collapsed ? "p-2" : "p-3"} flex items-center space-x-2  rounded-md hover:bg-gray-700`}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconSwitchHorizontal className="w-5 h-5" stroke={1.5} />
                        {!collapsed && <span>Change account</span>}
                    </a> */}

                    <a
                        href="#"
                        className={`${collapsed ? "px-2" : "px-3"} py-2.5 flex items-center space-x-2  rounded-md hover:bg-gray-700`}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconLogout className={`min-w-5.5 min-h-5.5  `} stroke={1.5} />
                        {!collapsed && <span className="min-w-[15rem]">Logout</span>}
                    </a>
                </div>
            </nav>
        </>
    );
}
