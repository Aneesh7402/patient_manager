'use client';

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./(components)/sidebar";
import Navbar from "./(components)/navbar"; // Import the Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar collapsed={sidebarCollapsed} toggleCollapsed={toggleSidebar} />
        
        <div className="font-sans bg-gray-200 text-white h-[100vh] flex overflow-hidden">
  {/* Sidebar */}
  <Sidebar collapsed={sidebarCollapsed} toggleCollapsed={toggleSidebar} />

  {/* Content Area */}
  <div className="flex-1">
    {/* Page Content */}
    {children}
  </div>
</div>

      </body>
    </html>
  );
}
