// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import {
//   LayoutDashboard, ReceiptText, CreditCard, Send, Globe,
//   PiggyBank, HandCoins, FileSearch, History, Settings, LifeBuoy, LogOut, User2, Bell
// } from "lucide-react";
// import Link from "next/link";

// export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  
//  const menuItems = [
//     { title: "Home", icon: LayoutDashboard, href: "/dashboard/home" },
//     { title: "Activity", icon: ReceiptText, href: "/dashboard/activity" },
//     { title: "Cards", icon: CreditCard, href: "/dashboard/cards" },
//     { title: "Transfer", icon: Send, href: "/dashboard/local-transfer" },
//     { title: "Int'l Wire", icon: Globe, href: "/dashboard/wire-transfer" },
//     { title: "Deposit", icon: PiggyBank, href: "/dashboard/deposit" },
//     { title: "Save & Invest", icon: HandCoins, href: "/dashboard/savings" },
//     { title: "Loan", icon: FileSearch, href: "/dashboard/loan" },
//     { title: "IRS Refund", icon: FileSearch, href: "/dashboard/refund" },
//     { title: "Settings", icon: Settings, href: "/dashboard/settings" },
//     { title: "Support", icon: LifeBuoy, href: "/dashboard/support" },
//     { title: "Logout", icon: LogOut, href: "/logout" }
//   ];


//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Background Blur */}
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Menu Box */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 120 }}
//             className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md 
//                        bg-white rounded-t-3xl p-6 z-50 shadow-lg"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <p className="font-semibold">Roland Onyekwere</p>
//                 <p className="text-xs text-gray-500">Account: 8658910866</p>
//                 <p className="text-red-500 text-xs mt-1">● Verify Account</p>
//               </div>

//               <button onClick={onClose}>
//                 <svg width="22" height="22" fill="currentColor">
//                   <path d="M18 6L6 18M6 6l12 12"/>
//                 </svg>
//               </button>
//             </div>

//             <h2 className="text-center font-bold mb-1">Banking Menu</h2>
//             <p className="text-center text-gray-500 text-sm mb-4">Select an option to continue</p>

//             {/* Grid Buttons */}
//             <div className="grid grid-cols-3 gap-3">
//               {menuItems.map((item, i) => (
//                  <Link key={item.title} href={item.href}
//                  className="bg-[#F6FAD7] hover:bg-[#EAF4B0]
//                              rounded-xl px-4 py-6 flex flex-col items-center">
                
//                   <item.icon size={20} className="text-[var(--headtext)]" />
//                   <span className="mt-1 text-sm font-medium">{item.title}</span>
               
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ReceiptText, CreditCard, Send, Globe,
  PiggyBank, HandCoins, FileSearch, Settings, LifeBuoy,
  LogOut, X
} from "lucide-react";
import Link from "next/link";

export default function MobileMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const menuItems = [
    { title: "Home", icon: LayoutDashboard, href: "/dashboard/home" },
    { title: "Activity", icon: ReceiptText, href: "/dashboard/transactions" },
    { title: "Cards", icon: CreditCard, href: "/dashboard/cards" },
    { title: "Transfer", icon: Send, href: "/dashboard/local-transfer" },
    { title: "Int'l Wire", icon: Globe, href: "/dashboard/wire-transfer" },
    { title: "Deposit", icon: PiggyBank, href: "/dashboard/deposit" },
   
    { title: "Loan", icon: FileSearch, href: "/dashboard/loans" },
    { title: "IRS Refund", icon: FileSearch, href: "/dashboard/refund" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
    { title: "Support", icon: LifeBuoy, href: "/dashboard/support" },
    { title: "Logout", icon: LogOut, href: "/" }
  ];




  const [data, setData] = useState<any>(null);
  
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
  
    useEffect(() => {
      if (!token) return;
  
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setData)
        .catch(console.error);
    }, [token]);
  
    if (!data) return null;
  
    // const user = data.user;
    // const account = data.account;
  
    // // Generate initials (e.g., Roland Onyekwere → RO)
    // const initials = user.fullName
    //   .split(" ")
    //   .map((n: string) => n[0])
    //   .join("")
    //   .toUpperCase();
    const user = data?.user || {};
  const account = data?.account || {};
  
  const fullName =
    user.fullName ||
    `${user?.personalInfo?.legalFirstName || ""} ${
      user?.personalInfo?.middleName || ""
    } ${user?.personalInfo?.legalLastName || ""}`.trim();
  
      const initials = fullName
       .split(" ")
        .map((n: string) => n[0])
       .join("")
       .toUpperCase();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SLIDE-UP MENU */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md 
                       bg-white rounded-t-3xl p-6 z-50 shadow-xl border-t"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="font-semibold text-gray-800">{data.fullName}</p>
                  <p className="text-xs text-gray-500">Account: {data.accountNumber}</p>
                {/* <p className="text-red-500 text-xs mt-1">● Verify Account</p> */}
                 {data.kycCompleted ? (
                     <p className="text-green-100 text-xs mt-1">
                       ✓ KYC Verified
                       </p>
                     ) : (
                     <p className="text-red-500 text-xs mt-1">
                       ● Verify KYC
                     </p>
                  )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={22} />
              </button>
            </div>

            <h2 className="text-center font-semibold mb-1 text-lg">
              Banking Menu
            </h2>
            <p className="text-center text-gray-500 text-sm mb-4">
              Select an option to continue
            </p>

            {/* GRID BUTTONS */}
            <div className="grid grid-cols-3 gap-3">
              {menuItems.map((item, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onClose();
                    window.location.href = item.href;
                  }}
                  className="bg-[#F6FAD7] hover:bg-[#EAF4B0] active:scale-95 transition
                             rounded-xl px-4 py-6 flex flex-col items-center"
                >
                  <item.icon size={22} className="text-[var(--headtext)]" />
                  <span className="mt-1 text-sm font-medium">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
