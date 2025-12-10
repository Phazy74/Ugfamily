// "use client";
// import { useState } from "react";
// import Link from "next/link";
//  import Image from "next/image";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Top Announcement Bar */}
//       <div className="w-full bg-[var(--lemon)] text-[var(--headtext)] text-center py-2 text-sm">
//         World class service from your true international community bank
//       </div>

//       {/* Main Navbar */}
//       <nav className="bg-[var(--darkgreen)] text-white">
//         <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <Image
//   src="https://res.cloudinary.com/dfnt0w2mn/image/upload/v1764679739/Abstract_Alexander_Fencing_and_Gates_Fence_Logo_-_1_-_Edited-removebg-preview_ubhqf6.png"
//   alt="Banking customer"
//   width={200}
//   height={600}
//   priority
// />

//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-10 text-sm">
//             <Link href="/">Home</Link>
//             <Link href="/personal">Personal</Link>
//             <Link href="/cooperate">Cooperate</Link>
//             <Link href="/insurance">Insurance</Link>
            
//             {/* <div className="cursor-pointer">Savings ▾</div> */}
//             <li className="relative">
//             <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
//               Sefton Savings ▼
//             </button>

//             {open && (
//               <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-3">
//                 <Link href="/savings/account1" className="block px-4 py-2 hover:bg-gray-100">Savings Plan 1</Link>
//                 <Link href="/savings/account2" className="block px-4 py-2 hover:bg-gray-100">Savings Plan 2</Link>
//               </div>
//             )}
//           </li>
//             <Link href="/login">Login</Link>
//           </div>

//           {/* Open Account Button */}
//           <Link
//             href="/register"
//             className="hidden md:block bg-[var(--lemon)] text-[var(--darkgreen)] px-6 py-2 rounded-full font-medium"
//           >
//             Open An Account →
//           </Link>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             onClick={() => setOpen(!open)}
//           >
//             <div className="w-7 h-1 bg-white mb-1"></div>
//             <div className="w-7 h-1 bg-white mb-1"></div>
//             <div className="w-7 h-1 bg-white"></div>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="md:hidden bg-[var(--darkgreen)] text-white space-y-4 p-6">
//             <Link href="/">Home</Link><br />
//             <Link href="/personal">Personal</Link><br />
//             <Link href="/cooperate">Cooperate</Link><br />
//             <Link href="/insurance">Insurance</Link><br />
//             <Link href="/mortgages">Mortgages</Link><br />
//             <div>Savings ▾</div>
//             <Link href="/login">Login</Link>
//             <Link
//               href="/register"
//               className="block bg-[var(--lemon)] text-[var(--darkgreen)] text-center py-3 rounded-full"
//             >
//               Open An Account →
//             </Link>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }
// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Announcement Bar */}
//       <div className="w-full bg-[var(--lemon)] text-[var(--headtext)] text-center py-2 text-sm z-50 relative">
//         World class service from your true international community bank
//       </div>

//       {/* MAIN NAVBAR */}
//       <nav className="absolute top-[36px] left-0 w-full z-50 bg-black/0 backdrop-blur-md text-white">
//         <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">

//           {/* LOGO */}
//           <Link href="/" className="flex items-center gap-2">
//             <Image
//               src="https://res.cloudinary.com/dfnt0w2mn/image/upload/v1764679739/Abstract_Alexander_Fencing_and_Gates_Fence_Logo_-_1_-_Edited-removebg-preview_ubhqf6.png"
//               alt="Bank Logo"
//               width={150}
//               height={60}
//               priority
//             />
//           </Link>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex space-x-10 text-sm">
//             <Link href="/">Home</Link>
//             <Link href="/personal">Personal</Link>
//             <Link href="/cooperate">Cooperate</Link>
//             <Link href="/insurance">Insurance</Link>
//             <Link href="/mortgages">Mortgages</Link>

//             {/* Dropdown */}
//             <li className="relative list-none">
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="flex items-center gap-1"
//               >
//                 Sefton Savings ▼
//               </button>

//               {open && (
//                 <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-3 z-50">
//                   <Link href="/savings/account1" className="block px-4 py-2 hover:bg-gray-100">
//                     Savings Plan 1
//                   </Link>
//                   <Link href="/savings/account2" className="block px-4 py-2 hover:bg-gray-100">
//                     Savings Plan 2
//                   </Link>
//                 </div>
//               )}
//             </li>

//             <Link href="/login">Login</Link>
//           </div>

//           {/* CTA BUTTON */}
//           <Link
//             href="/register"
//             className="hidden md:block bg-[var(--lemon)] text-[var(--darkgreen)] px-6 py-2 rounded-full font-medium"
//           >
//             Open An Account →
//           </Link>

//           {/* MOBILE MENU BUTTON */}
//           <button onClick={() => setOpen(!open)} className="md:hidden">
//             <div className="w-7 h-1 bg-white mb-1"></div>
//             <div className="w-7 h-1 bg-white mb-1"></div>
//             <div className="w-7 h-1 bg-white"></div>
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {open && (
//           <div className="md:hidden bg-black/70 backdrop-blur-md text-white space-y-4 p-6">
//             <Link href="/">Home</Link><br />
//             <Link href="/personal">Personal</Link><br />
//             <Link href="/cooperate">Cooperate</Link><br />
//             <Link href="/insurance">Insurance</Link><br />
//             <Link href="/mortgages">Mortgages</Link><br />
            
//             <Link href="/login">Login</Link>
//             <Link
//               href="/register"
//               className="block bg-[var(--lemon)] text-[var(--darkgreen)] text-center py-3 rounded-full"
//             >
//               Open An Account →
//             </Link>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar background after scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-[var(--lemon)] text-[var(--headtext)] text-center py-2 text-sm z-50 relative">
        World class service from your true international community bank
      </div>

      {/* NAVBAR WRAPPER */}
      <nav
        className={`absolute top-[36px] left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? ""
            : "backdrop-blur-md text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://res.cloudinary.com/dfnt0w2mn/image/upload/v1764679739/Abstract_Alexander_Fencing_and_Gates_Fence_Logo_-_1_-_Edited-removebg-preview_ubhqf6.png"
              alt="Logo"
              width={100}
              height={60}
              priority
              className={`${scrolled ? "" : "invert-0"}`}
            />
          </Link>

          {/* Desktop Menu */}
          <ul className={`hidden md:flex space-x-10 text-sm font-medium`}>
            <Link href="/">Home</Link>
            <Link href="/personal">Personal</Link>
            <Link href="/cooperate">Cooperate</Link>
            <Link href="/insurance">Insurance</Link>
        

            {/* Dropdown */}
            <li className="relative cursor-pointer">
              <button onClick={() => setOpenDropdown(!openDropdown)}>Sefton Savings ▼</button>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-[var(--lemon)] text-black rounded-lg shadow-lg py-3 z-50"
                  >
                    <Link href="/loans" className="block px-4 py-2 hover:bg-gray-100">
                      Business loan
                    </Link>
                    <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">
                      About us
                    </Link>
                    <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">
                      Contact us
                    </Link>
                    <Link href="/terms" className="block px-4 py-2 hover:bg-gray-100">
                      Privacy & Policy
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <Link href="/login">Login</Link>
                 <LanguageSwitcher />
          </ul>

          {/* CTA Button */}
          <Link
            href="/register"
            className={`hidden md:block px-6 py-2 rounded-full font-medium transition ${
              scrolled
                ? "bg-[var(--darkgreen)] text-white"
                : "bg-[var(--lemon)] text-[var(--darkgreen)]"
            }`}
          >
            Open An Account →
          </Link>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden flex flex-col gap-1">
            <span className="w-7 h-1 bg-current"></span>
            <span className="w-7 h-1 bg-current"></span>
            <span className="w-7 h-1 bg-current"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40"
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 bg-[var(--lemon)] w-72 h-full text-black p-6 z-50 shadow-xl"
            >
              <button
                className="text-xl mb-6"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>

              <div className="space-y-4  flex flex-col text-lg">
                <Link href="/">Home</Link>
                <Link href="/personal">Personal</Link>
                <Link href="/cooperate">Cooperate</Link>
                <Link href="/insurance">Insurance</Link>
               

                <div className="font-semibold mt-4">Sefton Savings</div>
                <Link href="/loans">Business Loan</Link>
                
                <Link href="/about" >
                      About us
                    </Link>
                    <Link href="/contact" >
                      Contact us
                    </Link>
                    <Link href="/terms" >
                      Privacy & Policy
                    </Link>

                <Link href="/login "
                className="block  bg-[var(--darkgreen)]  text-[var(--lemon)] text-center py-3 rounded-full font-medium">Login</Link>

                <Link
                  href="/register"
                  className="block  bg-[var(--darkgreen)]  text-[var(--lemon)] text-center py-3 rounded-full font-medium"
                >
                  Open An Account →
                </Link>
                <LanguageSwitcher />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
