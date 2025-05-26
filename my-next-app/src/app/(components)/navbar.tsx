"use client";

import { Bell, User, Menu, X } from "lucide-react";

export default function Navbar({
  collapsed,
  toggleCollapsed,
}: {
  collapsed: boolean;
  toggleCollapsed: () => void;
}) {

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Mobile Menu Icon */}
      <button
        className="lg:hidden text-gray-600 hover:text-pink-600"
        onClick={toggleCollapsed}
      >
        {collapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </button>

      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="/medblocks.jpg"
          alt="Medblocks Logo"
          className="w-8 h-8 rounded-md object-cover"
        />
        <h1 className="text-xl text-gray-800">MedBlocks</h1>
      </div>

      {/* Search Input */}
      

      {/* User & Notifications */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-pink-600">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-gray-600 hover:text-pink-600">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
