
// "use client";

// import { useEffect, useState } from "react";

// export default function DashboardNavbar({ onMenuClick }: { onMenuClick: () => void }) {
//   const [userData, setUserData] = useState<any>(null);
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   useEffect(() => {
//     if (!token) return;

//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(setUserData)
//       .catch(console.error);
//   }, [token]);

//   const initials = userData?.initials || "??";
//   const balance = userData?.balance ?? 0;

//   return (
//     <nav className="
//       fixed top-0 left-0 right-0
//       bg-white shadow-sm z-40
//       h-16 flex items-center justify-between
//       px-4 lg:px-8
//     ">
      
//       {/* Mobile Menu Button */}
//       <button onClick={onMenuClick} className="lg:hidden p-2 rounded hover:bg-gray-100">
//         <svg 
//           width="26" 
//           height="26" 
//           stroke="currentColor" 
//           strokeWidth="2" 
//           className="text-gray-600"
//           fill="none"
//           strokeLinecap="round"
//         >
//           <path d="M3 6h18M3 12h18M3 18h18"/>
//         </svg>
//       </button>

//       {/* Desktop spacer */}
//       <div className="hidden lg:block w-6"></div>

//       {/* Date */}
//       <span className="text-sm text-gray-500 hidden md:block">
//         {new Date().toLocaleDateString("en-US", {
//           weekday: "long",
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         })}
//       </span>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">

//         {/* Balance Bubble */}
//         <div className="bg-[#E4F5BD] px-4 py-1 rounded-full flex items-center gap-2">
//           <svg width="20" height="20" fill="currentColor">
//             <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/>
//           </svg>
//           <span className="font-semibold">
//             ${Number(balance).toLocaleString()}
//           </span>
//         </div>

//         {/* Notification Icon */}
//         <button className="relative">
//           <svg width="23" height="23" fill="currentColor" className="text-gray-600">
//             <path d="M12 2a6 6 0 00-6 6v4l-2 3v1h16v-1l-2-3V8a6 6 0 00-6-6z"/>
//           </svg>
//         </button>

//         {/* Profile Initials */}
//         <div className="w-10 h-10 bg-[#E4F5BD] rounded-full flex items-center justify-center font-semibold text-gray-800">
//           {initials}
//            {profileImage ? (
//   <img
//     src={profileImage}
//     className="w-16 h-16 rounded-full object-cover shadow"
//   />
// ) : (
//   <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-xl font-bold">
//     {initials}
//   </div>
// )}
//         </div>

//       </div>
//     </nav>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function DashboardNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [userData, setUserData] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setUserData)
      .catch(console.error);
  }, [token]);

  const initials = userData?.initials || "??";
  const balance = userData?.balance ?? 0;
  const profileImage = userData?.profileImage || null;

  return (
    <nav className="
      fixed top-0 left-0 right-0
      bg-white shadow-sm z-40
      h-16 flex items-center justify-between
      px-4 lg:px-8
    ">
      
      {/* Mobile Menu Button */}
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded hover:bg-gray-100">
        <svg 
          width="26"
          height="26"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-600"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
      </button>

      {/* Desktop spacer */}
      <div className="hidden lg:block w-6"></div>

      {/* Date */}
      <span className="text-sm text-gray-500 hidden md:block">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </span>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Balance Bubble */}
        <div className="bg-[#E4F5BD] px-4 py-1 rounded-full flex items-center gap-2">
          <svg width="20" height="20" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/>
          </svg>
          <span className="font-semibold">
            ${Number(balance).toLocaleString()}
          </span>
        </div>

        {/* Notification Icon */}
        <button className="relative">
          <svg width="23" height="23" fill="currentColor" className="text-gray-600">
            <path d="M12 2a6 6 0 00-6 6v4l-2 3v1h16v-1l-2-3V8a6 6 0 00-6-6z"/>
          </svg>
        </button>

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-gray-800 font-semibold">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-full h-full object-cover"
              alt="profile"
            />
          ) : (
            initials
          )}
        </div>

      </div>
    </nav>
  );
}
