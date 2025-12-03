"use client";

import { useEffect, useState } from "react";
import { Wallet, ArrowDown, ArrowUp, RefreshCw, Calendar, Smartphone } from "lucide-react";

export default function DashboardHome() {
  const [data, setData] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  if (!data) return <div className="p-6">Loading dashboard...</div>;

  const user = data.user;
  const account = data.account;

  const usd = data?.account?.balances?.usd?.available ?? 0;
  const usdt = data?.account?.balances?.usdt?.available ?? 0;


  return (
    <div className="p-6 space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Current Balance" value={`$${usd}`} color="bg-yellow-100" />
        <SummaryCard title="Monthly Income" value={`$${account.analytics.monthlyIncome}`} color="bg-green-100" />
        <SummaryCard title="Monthly Outgoing" value={`$${account.analytics.monthlySpending}`} color="bg-red-100" />
        <SummaryCard title="Transaction Limit" value={`$${account.limits.monthlyTransferLimit}`} color="bg-purple-100" />
      </div>

      {/* Main Balance Card */}
      <div className="bg-[#0D1F17] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-20">
          <Wallet size={130} />
        </div>

        <p className="text-xl font-medium">Good Morning</p>
        <h2 className="text-2xl font-semibold">{user.fullName}</h2>

        <div className="mt-6">
          <p className="text-gray-300 text-sm">Available Balance</p>
          <h1 className="text-4xl font-bold">${usd} USD</h1>
        </div>

        <div className="mt-4">
          <p className="text-gray-300 text-sm">USDT Balance</p>
          <h2 className="text-xl">{usdt} USDT</h2>
        </div>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <ActionButton icon={<ArrowDown />} text="Receive" />
          <ActionButton icon={<ArrowUp />} text="Send" />
          <ActionButton icon={<RefreshCw />} text="Swap" />
        </div>

        <div className="mt-6 text-sm">
          <p>Your Account Number</p>
          <p className="font-semibold text-green-300">{account.accountNumber}</p>
          <span className="text-xs bg-green-700 px-2 py-1 rounded-full ml-2">Active</span>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Account Statistics</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <StatItem label="Transaction Limit" value={`$${account.limits.monthlyTransferLimit}`} icon={<Smartphone />} />
          <StatItem label="Pending Transactions" value="$0.00" icon={<RefreshCw />} />
          <StatItem label="Transaction Volume" value={`$${(usd / 1).toLocaleString()}`} icon={<ArrowUp />} />
          <StatItem label="Account Age" value={`2 weeks`} icon={<Calendar />} />
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SummaryCard({ title, value, color }: any) {
  return (
    <div className={`p-4 rounded-xl shadow ${color}`}>
      <p className="text-sm text-gray-700">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function ActionButton({ icon, text }: any) {
  return (
    <button className="bg-white/10 backdrop-blur text-white py-3 rounded-lg flex flex-col items-center hover:bg-white/20 transition">
      {icon}
      <span className="mt-1">{text}</span>
    </button>
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
