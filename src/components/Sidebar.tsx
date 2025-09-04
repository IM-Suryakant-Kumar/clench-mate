"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineExplore,
  MdOutlineHome,
  MdOutlinePerson,
  MdOutlineSettings,
} from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarLinks = [
    { name: "Home", href: "/home", icon: MdOutlineHome },
    { name: "Explore", href: "/explore", icon: MdOutlineExplore },
    { name: "Profile", href: "/profile", icon: MdOutlinePerson },
    { name: "Settings", href: "/settings", icon: MdOutlineSettings },
  ];

  return (
    <aside className="bg-secondary text-logo fixed bottom-0 left-0 flex h-16 w-full items-center justify-between px-4 md:top-16 md:h-[calc(100%-4.3125rem)] md:w-40 md:flex-col md:items-start md:justify-start md:gap-4 md:bg-transparent md:pt-2">
      {sidebarLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`flex items-center justify-start gap-4 rounded-full text-xl font-semibold md:px-8 md:py-1 ${pathname === link.href ? "border-logo md:text-primary border-2 md:bg-orange-600" : "border-0 md:bg-transparent"} `} 
        >
          <link.icon size="1.5em" />
          <span className="hidden md:block">{link.name}</span>
        </Link>
      ))}
    </aside>
  );
}
