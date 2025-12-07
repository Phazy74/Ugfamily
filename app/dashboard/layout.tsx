 "use client";

import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import MobileMenu from "../../components/dashboard/MobileMenu";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gray-50">
      
      {/* Mobile Menu Drawer */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Top Navbar */}
      <DashboardNavbar onMenuClick={() => setMenuOpen(true)} />

      <div className="flex pt-10"> 
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72">
          <DashboardSidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 pr-6   pt-6  pl-6  pb-30 bg-[var(--bgwhite)]">{children}
          <BottomNav onMenuToggle={() => setMenuOpen(!menuOpen)} />
        </main>
      </div>
    </div>
  );
}
