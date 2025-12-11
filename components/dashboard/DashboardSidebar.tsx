
"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard, ReceiptText, CreditCard, Send, Globe,
  PiggyBank, HandCoins, FileSearch, History, Settings,
  LifeBuoy, LogOut
} from "lucide-react";
import Link from "next/link";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard/home" },
  { title: "Transactions", icon: ReceiptText, href: "/dashboard/transactions" },
  { title: "Cards", icon: CreditCard, href: "/dashboard/cards" },

  { title: "Local Transfer", icon: Send, section: "TRANSFERS", href: "/dashboard/local-transfer" },
  { title: "International Wire", icon: Globe, href: "/dashboard/wire-transfer" },
  { title: "Deposit", icon: PiggyBank, href: "/dashboard/deposit" },

  { title: "Loan Request", icon: FileSearch, href: "/dashboard/loans" },
  { title: "IRS Tax Refund", icon: FileSearch, href: "/dashboard/refund" },
 

  { title: "Settings", icon: Settings, section: "ACCOUNT", href: "/dashboard/settings" },
  { title: "Support Ticket", icon: LifeBuoy, href: "/dashboard/support" }
];

export default function DashboardSidebar() {
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
    <div className="h-[100vh] fixed bg-white overflow-auto p-4 pb-20 z-45 w-64 border-r">
      
      {/* User Card */}
      <div className="bg-[#F3F8E6] rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          {data.profileImage ? (
  <img
    src={data.profileImage}
    className="w-16 h-16 rounded-full object-cover shadow"
  />
) : (
  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-xl font-bold">
    {data.initials}
  </div>
)}




          <div>
            <p className="font-semibold text-gray-800">{data.fullName}</p>
<p className="text-xs text-gray-500">Account: {data.accountNumber}</p>
<div className="w-12 h-12 ...">{data.initials}</div>
          </div>
        </div>

        {/* KYC Status Button */}
        {data.kycCompleted ? (
  <button className="mt-3 w-full bg-green-100 text-green-700 py-1 rounded-md text-sm">
    ✓ KYC Verified
  </button>
) : (
  <Link href="/verify-account" className="mt-3 w-full bg-red-200 text-red-400  py-1 rounded-md text-sm">
    ● Verify KYC
  </Link>
)}


        <button
          className="mt-2 w-full bg-gray-900 text-white py-2 rounded-md text-sm"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {/* Menu */}
      <div>
        {menu.map((item, i) => (
          <div key={i} className="mb-3">
            {/* Section Header */}
            {item.section && (
              <p className="text-xs text-gray-400 mt-4 mb-1">{item.section}</p>
            )}

            <Link href={item.href}>
              <button className="flex items-center gap-3 w-full text-gray-700 hover:text-black py-2">
                <item.icon size={20} className="text-[var(--headtext)]" />
                {item.title}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
