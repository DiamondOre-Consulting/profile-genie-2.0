import { ReactNode, useState } from "react";
import {
    Icon2fa,
    IconDatabaseImport,
    IconFileCvFilled,
    IconFingerprint,
    IconKey,
    IconLayoutDashboardFilled,
    IconLayoutSidebarRightCollapse,
    IconLogout,
    IconSettings
} from "@tabler/icons-react";

const tabs = [
    { link: "/", label: "Dashboard", icon: IconLayoutDashboardFilled },
    { link: "/all-portfolio", label: "All Portfolio", icon: IconFileCvFilled },
    { link: "/add-portfolio", label: "Add Portfolio", icon: IconFingerprint },
    { link: "", label: "SSH Keys", icon: IconKey },
    { link: "", label: "Databases", icon: IconDatabaseImport },
    { link: "", label: "Authentication", icon: Icon2fa },
    { link: "", label: "Other Settings", icon: IconSettings },
];

export function NavbarSegmented({ children }: { children: ReactNode }) {
    const [active, setActive] = useState("Dashboard");
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const links = tabs.map((item) => (
        <a
            className={`flex items-center overflow-hidden space-y-2 space-x-2 h-[2.3rem]  rounded transition-all duration-300 
                ${active === item.label ? "bg-[#E11D48] text-white" : "text-gray-300 hover:bg-gray-700"} 
                ${collapsed ? "justify-center " : " items-center px-2"}`}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={`${collapsed ? "w-5 h-5" : "min-w-5 min-h-5"}  my-auto`} />
            {!collapsed && <span className="min-w-[15rem] text-sm">{item.label}</span>}
        </a>
    ));

    const ToggleButton = ({ opened, onClick, ariaLabel }: { opened: boolean, onClick: () => void, ariaLabel: string }) => {
        return (
            <IconLayoutSidebarRightCollapse
                className={`${opened ? "rotate-180" : "mx-auto"} min-w-5 min-h-5 duration-500 transition-all`}
                onClick={onClick}
                aria-label={ariaLabel}
            />
        );
    };

    return (
        <>

            <nav
                className={`fixed top-0 left-0 h-screen bg-[#010101] text-white shadow-lg transition-all duration-300 
                ${collapsed ? "w-13" : "w-54"} `}
            >
                <div className={`relative items-center flex left-${collapsed ? "w-13" : "w-54"} transition-all p-3 duration-300 z-50`}>
                    <ToggleButton opened={!collapsed} onClick={toggleSidebar} ariaLabel="Toggle sidebar" />
                    {!collapsed && <span className="ml-4 text-sm min-w-[10rem] font-semibold uppercase tracking-wide">Profile Genie</span>}
                </div>


                <div className={`px-1.5  border-t border-gray-700 flex flex-col  py-1 space-y-2`}>{links}</div>

                <div className="px-1.5  border-t pt-1 border-gray-700">
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
                        className={`p-2  flex items-center space-x-2 w-full  rounded-md hover:bg-gray-700`}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconLogout className={`min-w-5 min-h-5 `} stroke={1.5} />
                        {!collapsed && <span className="min-w-[15rem]">Logout</span>}
                    </a>
                </div>
            </nav>
            <div className={`${collapsed ? "ml-13" : "ml-54"} py-6 px-2  min-h-screen transition-all bg-[#171717] duration-300`}>
                {children}
            </div>
        </>
    );
}
