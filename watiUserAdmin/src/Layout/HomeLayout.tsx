import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import InfoMenu from "@/components/info-menu";
import NotificationMenu from "@/components/notification-menu";
import UserMenu from "@/components/user-menu";
import { Home, Wallet, Wallet2 } from "lucide-react";
import { BiBroadcast, BiWallet } from "react-icons/bi";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const navigationLinks = [
  { href: "#", label: "Home", icon: <Home /> },
  { href: "#", label: "Features", icon: <BiBroadcast /> },
  { href: "#", label: "Pricing", icon: "<Home/>" },
  { href: "#", label: "About", icon: "<Home/>" },
];

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      <header className="px-4 text-black bg-white border-b md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-1 w-36 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink href={link.href} className="py-1.5">
                          {link.icon}
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary hover:text-primary/90">
                <img
                  className="rounded-full size-10"
                  src="data:image/png;base64,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"
                  alt="Company Logo"
                />
              </a>
              {/* Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className="text-muted-foreground hover:text-primary text-md py-1.5 font-medium"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-3 text-green-700 rounded-full bg-green-700/10">
                <BiWallet className="size-4.5" />
              </button>
              {/* Info menu */}
              <InfoMenu />
              {/* Notification */}
              <NotificationMenu />
            </div>
            {/* User menu */}
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default HomeLayout;
