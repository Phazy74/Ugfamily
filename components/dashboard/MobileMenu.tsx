"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  
  const menuItems = [
    { title: "Home", icon: "🏠" },
    { title: "Activity", icon: "📊" },
    { title: "Cards", icon: "💳" },
    { title: "Transfer", icon: "📨" },
    { title: "Int'l Wire", icon: "🌍" },
    { title: "Deposit", icon: "⬇️" },
    { title: "Save & Invest", icon: "💰" },
    { title: "Loan", icon: "📄" },
    { title: "IRS Refund", icon: "🧾" },
    { title: "Settings", icon: "⚙️" },
    { title: "Support", icon: "🎧" },
    { title: "Logout", icon: "🚪" }
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Background Blur */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Box */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md 
                       bg-white rounded-t-3xl p-6 z-50 shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">Roland Onyekwere</p>
                <p className="text-xs text-gray-500">Account: 8658910866</p>
                <p className="text-red-500 text-xs mt-1">● Verify Account</p>
              </div>

              <button onClick={onClose}>
                <svg width="22" height="22" fill="currentColor">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <h2 className="text-center font-bold mb-1">Banking Menu</h2>
            <p className="text-center text-gray-500 text-sm mb-4">Select an option to continue</p>

            {/* Grid Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {menuItems.map((item, i) => (
                <button
                  key={i}
                  className="bg-[#F6FAD7] hover:bg-[#EAF4B0]
                             rounded-xl px-4 py-6 flex flex-col items-center"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="mt-1 text-sm font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
