"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const navItems =[
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Users", href: "/admin/dashboard/user" },
    { name: "Transactions", href: "/admin/dashboard/transactions" },
    { name: "Settings", href: "/admin/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* 1. MOBILE HEADER (Only visible on phones) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b shadow-sm z-30 flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 2. MOBILE BACKDROP (Darkens background when sidebar is open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 3. SIDEBAR (Slides in on mobile, permanently visible on desktop) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r shadow-sm flex flex-col z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          
          {/* Close button inside sidebar (Mobile only) */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            // Logic to highlight the active menu item
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Auto-close sidebar on mobile when a link is clicked
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 text-red-600 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-semibold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT */}
      {/* "pt-20" adds space at the top so the mobile header doesn't cover the content */}
      <main className="flex-1 w-full max-w-full overflow-hidden pt-20 lg:pt-0">
        <div className="p-4 md:p-8 h-full overflow-y-auto">
          {children}
        </div>
      </main>

    </div>
  );
}