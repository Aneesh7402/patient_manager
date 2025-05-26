"use client";

import { useState } from "react";
import { LayoutDashboard, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter,usePathname} from "next/navigation";

// Assuming you're using react-feather for icons

interface SidebarSectionProps {
  title: string;
  icon: React.ComponentType<any>;
  headings: { name: string; href: string }[]; // headings now include 'name' and 'href'
  defaultOpen?: boolean;
}


interface SidebarSectionProps {
  title: string;
  icon: React.ComponentType<any>;
  headings: { name: string; href: string }[]; // headings now include 'name' and 'href'
  defaultOpen?: boolean;
}

function SidebarSection({
  title,
  icon: Icon,
  headings,
  defaultOpen = false,
}: SidebarSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter(); // Use useRouter to navigate

  const handleNavigation = (href: string) => {
  
    router.push(href); // Navigate to the new route using useRouter
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-gray-700 font-medium mb-2 hover:text-pink-600"
      >
        <span className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {title}
        </span>
        {open ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      <div
        className={`ml-6 overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          maxHeight: open ? "500px" : "0px", // adjust maxHeight as needed
        }}
      >
        <ul className="space-y-2 text-sm">
          {headings.map(({ name, href }) => (
            <li
              key={href}
              onClick={() => handleNavigation(href)} // Handle navigation on click
              className={`cursor-pointer text-gray-600 hover:text-pink-600 ${
                pathname === href // Compare the pathname with the href
                  ? "text-pink-600 font-semibold border-l-2 border-pink-600 pl-2"
                  : ""
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



export default function Sidebar({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 bg-white border-r border-gray-200 text-gray-800 flex flex-col p-6`}
    >
      <button
        onClick={toggleCollapsed}
        className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
      >
        {collapsed ? (
          "➤"
        ) : (
          <div className="flex items-center gap-2 justify-between mb-6">
            <h1 className="text-xl text-gray-600">Patient Data</h1>
            <div className="text-gray-600 ml-5 cursor-pointer">⮜ Collapse</div>
          </div>
        )}
      </button>

      {!collapsed && (
        <>
          {/* Collapsible Dashboard Section */}
          <SidebarSection
            title="Dashboard"
            icon={LayoutDashboard}
            headings={[
              { name: "Listing", href: "/" },
              { name: "Create", href: "/create" },
            ]}
            defaultOpen
          />
        </>
      )}
    </aside>
  );
}
