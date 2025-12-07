// "use client";

// import { Home, Wallet, BarChart3, User, Scan } from "lucide-react";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function BottomNav({ onMenuToggle }: { onMenuToggle: () => void }) {
//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-40">
//       {/* Background bar */}
//       <div className="bg-white shadow-xl border-t rounded-t-3xl pb-3 pt-4 flex justify-around items-center relative">

//         {/* LEFT ITEMS */}
//         <NavItem icon={<Home size={22} />} href="/dashboard/home" />
//         <NavItem icon={<Wallet size={22} />} href="/dashboard/wallet" />

//         {/* CENTER BUTTON */}
//         <motion.button
//           whileTap={{ scale: 0.85 }}
//           onClick={onMenuToggle}
//           className="absolute -top-6 bg-purple-600 w-14 h-14 rounded-full 
//                      flex items-center justify-center text-white shadow-xl"
//         >
//           <Scan size={28} />
//         </motion.button>

//         {/* RIGHT ITEMS */}
//         <NavItem icon={<BarChart3 size={22} />} href="/dashboard/stats" />
//         <NavItem icon={<User size={22} />} href="/dashboard/profile" />
//       </div>
//     </div>
//   );
// }

// function NavItem({ icon, href }: any) {
//   return (
//     <Link href={href} className="text-gray-700 hover:text-black transition">
//       {icon}
//     </Link>
//   );
// }
"use client";

import { Home, Wallet,  User, Scan,Send } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  onMenuToggle: () => void;
  /** The page background behind the bar. Match your page bg (default gray-50). */
  pageBgClass?: string;
};

export default function BottomNavCurved({
  onMenuToggle,
  pageBgClass = "bg-gray-50",
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="relative h-24">
        {/* Rounded bar background */}
        <div className="absolute inset-x-3 bottom-3 rounded-3xl bg-white  shadow-[0px_-6px_24px_rgba(0,0,0,0.08)] h-[68px]" />

        {/* Notch “cut-out” (same color as your page background) */}
        {/* <div
          className={`absolute left-1/2 -translate-x-1/2 -top-2 ${pageBgClass}
                      w-20 h-10 rounded-b-[40px]`}
          aria-hidden
        /> */}

        {/* Nav content */}
        <div className="absolute inset-x-0 bottom-0 h-24 flex items-end justify-between px-8 pb-5">
          {/* Left icons */}
          <NavItem href="/dashboard/home" icon={<Home size={22} />} label="Home" />
          <NavItem href="/dashboard/deposit" icon={<Wallet size={22} />} label="Deposit" />

          {/* Spacer under the FAB so spacing feels even */}
          <div className="w-16" />

          {/* Right icons */}
          <NavItem href="/dashboard/local-tranfer" icon={<Send size={22} />} label="Transfer" />
          <NavItem href="/dashboard/settings" icon={<User size={22} />} label="Me" />
        </div>

        {/* Center FAB (on top of the notch) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuToggle}
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full
                     bg-[#0D1F17] text-white shadow-xl flex items-center justify-center"
          aria-label="Open menu"
        >
          <Scan size={28} />
        </motion.button>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 text-gray-700 hover:text-black"
    >
      {icon}
      <span className="text-[11px] leading-none">{label}</span>
    </Link>
  );
}
