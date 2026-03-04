
"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  ArrowDown,
  ArrowUp,
  RefreshCw,
  Calendar,
  Smartphone,
  PiggyBank,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import CubeLoader from "@/components/FullPageLoader";

export default function DashboardHome() {
  const [data, setData] = useState<any>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  if (!data) return <div className="p-6"><CubeLoader/></div>;

  const user = data.user;
  const account = data.account;

  const usd = data?.account?.balances?.usd?.available ?? 0;
  const usdt = data?.account?.balances?.usdt?.available ?? 0;


  function BuildingIcon() {
  return (
    <svg width="28" height="28" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M3 21h18M6 21V10h12v11M10 21V6h4v15" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="28" height="28" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="28" height="28" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="28" height="28" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M3 12a9 9 0 1 1 9 9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}


  return (
    <div className="flex-1 pt-6 pb-6 space-y-6">

      {/* ------------------- TOP SUMMARY CARDS ------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <SummaryCard
          title="Current Balance"
          value={`$${usd}`}
          gradient="from-yellow-400 to-yellow-600"
          icon={<Wallet size={22} />}
        />

        <SummaryCard
          title="Monthly Income"
          value={`$${account.analytics.monthlyIncome ?? 0}`}
          gradient="from-green-400 to-green-600"
          icon={<TrendingUp size={22} />}
        />

        <SummaryCard
          title="Monthly Outgoing"
          value={`$${account.analytics.monthlySpending ?? 0}`}
          gradient="from-red-400 to-red-600"
          icon={<ArrowUp size={22} />}
        />

        <SummaryCard
          title="Transaction Limit"
          value={`$${account.limits.monthlyTransferLimit ?? 0}`}
          gradient="from-purple-400 to-purple-700"
          icon={<ShieldCheck size={22} />}
        />
      </div>

      {/* ------------------- MAIN CONTENT ROW ------------------- */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* -------- LEFT: MAIN BALANCE CARD -------- */}
        <div>
        <div className="flex-1 bg-[#0D1F17] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-20">
            <Wallet size={130} />
          </div>

          <p className="text-xl font-medium">Welcome</p>
          <h2 className="text-2xl font-semibold">{user.fullName}</h2>

          <div className="mt-6">
            <p className="text-gray-300 text-sm">Available Balance</p>
            <h1 className="text-4xl font-bold">${usd} USD</h1>
          </div>

          <div className="mt-4">
            <p className="text-gray-300 text-sm">USDT Balance</p>
            <h2 className="text-xl">{usdt} USDT</h2>
          </div>

          {/* --- ACTION BUTTONS --- */}
          <div className="mt-6 grid grid-cols-3 gap-3">
           
            <ActionButton icon={<ArrowDown />} text="Transfer" link="/dashboard/local-transfer" />
            
            <ActionButton icon={<ArrowUp />} text="Send" link="/dashboard/wire-transfer"/>
            
            
            <ActionButton icon={<PlusIcon />} text="Deposit" link="/dashboard/deposit" />
            
          </div>

          {/* --- ACCOUNT NUMBER --- */}
          <div className="mt-6 text-sm">
            <p>Your Account Number</p>
            <p className="font-semibold text-green-300">
              {account.accountNumber}
            </p>
            <span className="text-xs bg-green-700 px-2 py-1 rounded-full ml-2">
              Active
            </span>
          </div>
        </div>
        {/* Quick Actions Section */}
<div className="mt-6 bg-white rounded-xl p-6 shadow">
  <h2 className="text-lg font-semibold">What would you like to do today?</h2>
  <p className="text-sm text-gray-500 mb-4">
    Choose from our popular actions below
  </p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Link href="/dashboard/settings">
    <ActionTile 
      icon={<BuildingIcon />} 
      label="Account Info" 
      gradient="from-gray-100 to-gray-200"
      
    />
    </Link>
    <Link href="/dashboard/local-transfer">
    <ActionTile 
      icon={<SendIcon />} 
      label="Send Money" 
      gradient="from-yellow-300 to-yellow-400"
    />
    </Link>
    <Link href="/dashboard/deposit">
    <ActionTile 
      icon={<PlusIcon />} 
      label="Deposit" 
      gradient="from-green-200 to-green-300"
    />
    </Link>
    <Link href="/dashboard/transactions">
    <ActionTile 
      icon={<HistoryIcon />} 
      label="History" 
      gradient="from-purple-200 to-purple-300"
    />
    </Link>
  </div>
</div>
</div>


        {/* -------- RIGHT: ACCOUNT STATISTICS -------- */}
        {/* <div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Account Statistics</h3>

            <div className="grid  gap-4">
              <StatItem
                label="Transaction Limit"
                value={`$${account.limits.monthlyTransferLimit}`}
                icon={<Smartphone />}
              />
              <StatItem label="Pending Transactions" value="$0.00" icon={<RefreshCw />} />
              <StatItem
                label="Transaction Volume"
                value={`$${(usd / 1).toLocaleString()}`}
                icon={<ArrowUp />}
              />
              <StatItem label="Account Age" value={`2 weeks`} icon={<Calendar />} />
            </div>
          </div>
          </div>

          {/* QUICK TRANSFER SECTION */}
  {/*<div className="bg-white rounded-xl shadow p-6">
    <h3 className="font-semibold text-lg mb-4">Quick Transfer</h3>

    <div className="space-y-4">
      <QuickTransferItem 
        title="Local Transfer"
        subtitle="0% Handling charges"
        icon={<UserIcon />}
      />
      <QuickTransferItem 
        title="International Transfer"
        subtitle="Global reach, 0% fee"
        icon={<GlobeIcon />}
      />
    </div>
  </div>
        </div> */}
        <div className="w-full lg:w-1/3 space-y-6">
  {/* ACCOUNT STATS */}
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="font-semibold text-lg mb-4">Account Statistics</h3>

    <div className="grid  gap-4">
      <StatItem label="Transaction Limit" value={`$${account.limits.monthlyTransferLimit}`} icon={<Smartphone />} />
      <StatItem label="Pending Transactions" value="$0.00" icon={<RefreshCw />} />
      <StatItem label="Transaction Volume" value={`$${usd.toLocaleString()}`} icon={<ArrowUp />} />
      
    </div>
  </div>

  {/* QUICK TRANSFER SECTION */}
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="font-semibold text-lg mb-4">Quick Transfer</h3>

    <div className="space-y-4">
      <Link href="/dashboard/local-transfer">
      <QuickTransferItem 
        title="Local Transfer"
        subtitle="0% Handling charges"
        icon={<UserIcon />}
      />
      </Link>
      <Link href="/dashboard/wire-transfer">
      <QuickTransferItem 
      
        title="International Transfer"
        subtitle="Global reach, 0% fee"
        icon={<GlobeIcon />}
      />
      </Link>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- */
/* ----------------------- COMPONENTS -------------------------------- */
/* ------------------------------------------------------------------- */

function QuickTransferItem({ title, subtitle, icon }: any) {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* RIGHT ARROW */}
      <svg width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
        <path d="M8 4l8 8l-8 8" />
      </svg>
    </div>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
      <circle cx="11" cy="7" r="4" />
      <path d="M4 20c1.5-4 13.5-4 15 0" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
      <circle cx="11" cy="11" r="9" />
      <path d="M2 11h18M11 2a15 15 0 010 18M11 2a15 15 0 000 18" />
    </svg>
  );
}


function ActionTile({ icon, label, gradient }: any) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 rounded-xl 
      bg-gradient-to-br ${gradient} cursor-pointer hover:opacity-90 
      transition shadow-sm`}
    >
      <div className="text-gray-700 mb-2">{icon}</div>
      <p className="font-medium text-gray-800">{label}</p>
    </div>
  );
}


function SummaryCard({ title, value, gradient, icon }: any) {
  return (
    <div
      className={`p-4 rounded-xl shadow text-white bg-gradient-to-r ${gradient} flex items-center justify-between`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>

      <div className="bg-white/20 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}

function ActionButton({ icon, text,link }: any) {
  return (
    <Link href={link} className="bg-white/10 backdrop-blur text-white py-3 rounded-lg flex flex-col items-center hover:bg-white/20 transition">
    <button >
      {icon}
      <span className="mt-1">{text}</span>
    </button>
    </Link>
  );
}

function StatItem({ label, value, icon }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <div className="p-3 bg-gray-200 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
