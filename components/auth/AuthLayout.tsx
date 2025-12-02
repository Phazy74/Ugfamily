"use client";
import LeftPanel from "./LeftPanel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#f7f7f9] flex">
      <LeftPanel />
      <div className="flex-1 flex items-center lg:items-center justify-center p-6 lg:p-10">
        {children}
      </div>
    </div>
  );
}
