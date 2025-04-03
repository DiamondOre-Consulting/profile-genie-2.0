import { ReactNode, useState } from "react";
import {
    IconDatabaseImport,
    IconFileCvFilled,
    IconFingerprint,
    IconKey,
    IconLayoutDashboardFilled,
    IconLayoutSidebarRightCollapse,
    IconLogout,
    IconSettings,
    IconTrash
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";

const tabs = [
    { link: "/", label: "Dashboard", icon: IconLayoutDashboardFilled },
    { link: "/all-portfolio", label: "All Portfolio", icon: IconFileCvFilled },
    { link: "/select-template", label: "Add Portfolio", icon: IconFingerprint },
    { link: "/portfolio-recycle-bin", label: "Portfolio Bin", icon: IconTrash },
    { link: "/all-catalogue", label: "All Catalogue", icon: IconKey },
    { link: "/add-catalogue", label: "Add Catalogue", icon: IconDatabaseImport },
    { link: "/catalogue-recycle-bin", label: "Catalogue Bin", icon: IconTrash },
    { link: "/other-settings", label: "Other Settings", icon: IconSettings },
];

export function HomeLayout({ children }: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(
        window.innerWidth >= 768 ? false : true
    );

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const handleLogout = async () => {

        const res = await dispatch(logout() as any)


        if (res?.payload?.success) navigate('/login')
    }

    const { pathname } = useLocation();

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

                <div className={`px-1.5  border-t border-gray-700 flex flex-col w-full py-1 space-y-2`}>{
                    tabs.map((item) => {
                        return (<div
                            className={`flex items-center cursor-pointer w-full overflow-hidden space-y-2  space-x-2 h-[2.3rem]  rounded transition-all duration-300 
                ${pathname === item.link ? "bg-[#E11D48] text-white" : "text-gray-300 hover:bg-gray-700"} 
                ${collapsed ? "justify-center " : " items-center px-2"}`}
                            key={item.label}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate(item.link)
                            }}
                        >
                            <item.icon className={`${collapsed ? "w-5 h-5" : "min-w-5 min-h-5"}  my-auto`} />
                            {!collapsed && <span className="min-w-[15rem] text-sm">{item.label}</span>}
                        </div>)
                    })
                }</div>

                <div className="px-1.5  border-t pt-1 border-gray-700">
                    {/* <a
                        href="#"
                        className={`${collapsed ? "p-2" : "p-3"} flex items-center space-x-2  rounded-md hover:bg-gray-700`}
                        onClick={(event) => event.preventDefault()}
                    >
                        <IconSwitchHorizontal className="w-5 h-5" stroke={1.5} />
                        {!collapsed && <span>Change account</span>}
                    </a> */}

                    <div
                        className={`p-2  flex items-center space-x-2 w-full  rounded-md hover:bg-gray-700`}
                        onClick={(event) => {
                            event.preventDefault();
                            handleLogout()
                        }}
                    >
                        <IconLogout className={`min-w-5 min-h-5 `} stroke={1.5} />
                        {!collapsed && <span className="min-w-[15rem]">Logout</span>}
                    </div>
                </div>
            </nav>
            <div className={`${collapsed ? "ml-13" : "ml-54"} py-6 px-2  min-h-screen transition-all bg-[#171717] duration-300`}>
                {children}
            </div>
        </>
    );
}
