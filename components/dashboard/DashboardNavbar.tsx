// "use client";

// import dayjs from "dayjs";
// import { Bell, Wallet } from "lucide-react";
// // import { Badge } from "@/components/ui/badge";

// export function Topbar() {
//   return (
//     <header className="sticky top-0 z-30 bg-[#f6f7f9]/80 backdrop-blur border-b">
//       <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between">
//         <div className="text-sm text-[var(--ptext)]">
//           {dayjs().format("dddd, MMMM D, YYYY")}
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2 rounded-full bg-[var(--lemon)]/70 px-3 py-1 text-sm">
//             <Wallet className="h-4 w-4 text-[var(--headtext)]" />
//             <span className="text-[var(--headtext)]">$0</span>
//           </div>

//           <button className="relative rounded-full p-2 hover:bg-white">
//             <Bell className="h-5 w-5 text-[#63707e]" />
//             <span className="absolute -top-0.5 -right-0.5 inline-block h-2 w-2 rounded-full bg-[#ef4444]" />
//           </button>

//           <div className="h-8 w-8 rounded-full grid place-items-center font-semibold text-sm"
//                style={{ background: "var(--lemon)", color: "var(--headtext)" }}>
//             RO
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

export default function DashboardNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="
      fixed top-0 left-0 right-0
      bg-white shadow-sm z-40
      h-16 flex items-center justify-between
      px-4 lg:px-8
    ">
      
      {/* Mobile Menu Button */}
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded hover:bg-gray-100">
        <svg width="26" height="26" fill="currentColor">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
      </button>

      {/* Left empty space for desktop layout symmetry */}
      <div className="hidden lg:block w-6"></div>

      {/* Center Date */}
      <span className="text-sm text-gray-500 hidden md:block">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      {/* Right Controls */}
      <div className="flex items-center gap-4">

        {/* Balance Tile */}
        <div className="bg-[#E4F5BD] px-4 py-1 rounded-full flex items-center gap-2">
          <svg width="20" height="20" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/>
          </svg>
          <span className="font-semibold">$0</span>
        </div>

        {/* Notification */}
        <button className="relative">
          <svg width="23" height="23" fill="currentColor" className="text-gray-600">
            <path d="M12 2a6 6 0 00-6 6v4l-2 3v1h16v-1l-2-3V8a6 6 0 00-6-6z"/>
          </svg>
        </button>

        {/* Profile Circle */}
        <div className="w-10 h-10 bg-[#E4F5BD] rounded-full flex items-center justify-center font-semibold">
          RO
        </div>

      </div>
    </nav>
  );
}
