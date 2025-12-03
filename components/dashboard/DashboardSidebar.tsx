// "use client";

// import { useMemo } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   LayoutDashboard, ReceiptText, CreditCard, Send, Globe,
//   PiggyBank, HandCoins, FileSearch, History, Settings, LifeBuoy, LogOut, User2, Bell
// } from "lucide-react";

// const menu = [
//   { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/home" },
//   { label: "Transactions", icon: ReceiptText, href: "/dashboard/transactions" },
//   { label: "Cards", icon: CreditCard, href: "/dashboard/cards" },
// ];

// const transfers = [
//   { label: "Local Transfer", icon: Send, href: "/dashboard/transfer/local" },
//   { label: "International Wire", icon: Globe, href: "/dashboard/transfer/international" },
//   { label: "Deposit", icon: PiggyBank, href: "/dashboard/deposit" },
//   { label: "Save and Invest", icon: HandCoins, href: "/dashboard/save-invest" },
// ];

// const services = [
//   { label: "Loan Request", icon: FileSearch, href: "/dashboard/loan" },
//   { label: "IRS Tax Refund", icon: FileSearch, href: "/dashboard/tax-refund" },
//   { label: "Loan History", icon: History, href: "/dashboard/loan-history" },
// ];

// const account = [
//   { label: "Settings", icon: Settings, href: "/dashboard/settings" },
//   { label: "Support Ticket", icon: LifeBuoy, href: "/dashboard/support" },
// ];

// export function Sidebar() {
//   // mock user — replace with your auth/me call
//   const user = useMemo(() => ({
//     name: "Roland Onyekwere",
//     initials: "RO",
//     id: "8658910686",
//     kyc: "Verify KYC", // show red badge
//   }), []);

//   return (
//     <aside className="hidden lg:block w-[260px] shrink-0 border-r bg-white">
//       <div className="h-dvh flex flex-col">
//         {/* Profile card */}
//         <div className="p-4">
//           <Card className="border rounded-xl">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full grid place-items-center font-semibold"
//                      style={{ background: "var(--lemon)", color: "var(--headtext)" }}>
//                   {user.initials}
//                 </div>
//                 <div className="min-w-0">
//                   <div className="text-sm font-medium truncate">{user.name}</div>
//                   <div className="text-xs text-[var(--ptext)]">ID: {user.id}</div>
//                 </div>
//               </div>

//               <Button variant="secondary"
//                       className="mt-3 w-full justify-start gap-2 bg-[#fee2e2] text-[#991b1b] hover:bg-[#fecaca]">
//                 <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
//                 {user.kyc}
//               </Button>

//               <div className="mt-3 flex gap-2">
//                 <Button variant="outline" className="flex-1">Profile</Button>
//                 <Button variant="destructive" className="flex-1">
//                   <LogOut className="h-4 w-4 mr-1" /> Logout
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Menus */}
//         <ScrollArea className="px-2 pb-2 flex-1">
//           <Section title="MAIN MENU" items={menu} />
//           <Section title="TRANSFERS" items={transfers} />
//           <Section title="SERVICES" items={services} />
//           <Section title="ACCOUNT" items={account} />
//         </ScrollArea>

//         {/* Footer */}
//         <div className="mt-auto p-3 text-xs text-[var(--ptext)] flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="inline-block h-2 w-2 rounded-full bg-[var(--darkgreen)]" />
//             Secure Banking
//           </div>
//           <span>v1.2.0</span>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function Section({
//   title,
//   items,
// }: {
//   title: string;
//   items: { label: string; icon: any; href: string }[];
// }) {
//   return (
//     <div className="mb-4">
//       <div className="px-3 py-2 text-[11px] tracking-wider text-[var(--ptext)]">{title}</div>
//       <div className="space-y-1">
        // {items.map((item) => (
        //   <Link key={item.label} href={item.href}
        //         className="mx-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-[#f3f4f6]">
        //     <item.icon className="h-4 w-4 text-[#63707e]" />
        //     <span>{item.label}</span>
        //   </Link>
        // ))}
//       </div>
//       <Separator className="my-3" />
//     </div>
//   );
// }
"use client";
import {
  LayoutDashboard, ReceiptText, CreditCard, Send, Globe,
  PiggyBank, HandCoins, FileSearch, History, Settings, LifeBuoy, LogOut, User2, Bell
} from "lucide-react";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Transactions", icon: ReceiptText },
  { title: "Cards", icon: CreditCard },

  { title: "Local Transfer", icon: Send, section: "TRANSFERS" },
  { title: "International Wire", icon: Globe },
  { title: "Deposit", icon: PiggyBank },

  { title: "Save and Invest", icon: HandCoins, section: "SERVICES" },
  { title: "Loan Request", icon: FileSearch },
  { title: "IRS Tax Refund", icon: FileSearch },
  { title: "Loan History", icon: History },

  { title: "Settings", icon: Settings, section: "ACCOUNT" },
  { title: "Support Ticket", icon: LifeBuoy },
];

export default function DashboardSidebar() {
  return (
    <div className="h-[100vh] fixed  bg-white overflow-auto  p-4 pb-20 z-45">
      
      {/* User Card */}
      <div className="bg-[#F3F8E6] rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#E4F5BD] rounded-full flex justify-center items-center font-semibold">
            RO
          </div>

          <div>
            <p className="font-semibold text-gray-800">Roland Onyekwere</p>
            <p className="text-xs text-gray-500">ID: 8658910866</p>
          </div>
        </div>

        <button className="mt-3 w-full bg-red-100 text-red-600 py-1 rounded-md text-sm">
          ● Verify KYC
        </button>

        <button className="mt-2 w-full bg-gray-900 text-white py-2 rounded-md text-sm">
          Logout
        </button>
      </div>

      {/* Menu */}
      <div>
        {menu.map((item, i) => (
          <div key={i} className="mb-3">
            {/* Section Title */}
            {item.section && (
              <p className="text-xs text-gray-400 mt-4 mb-1">{item.section}</p>
            )}

            <button className="flex items-center gap-3 w-full text-gray-700 hover:text-black py-2">
             <item.icon size={20} className="text-[var(--headtext)]" />

              {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
