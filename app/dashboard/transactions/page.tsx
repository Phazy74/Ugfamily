"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet2,
  Send,
  CreditCard,
} from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTransactions(res.data.transactions || []))
      .catch(console.error);
  }, [token]);

  const filtered = transactions.filter((tx: any) =>
  filter === "all" ? true : tx.type === filter
);

  // Transaction Icon by Type
  const Icon = ({ type }: any) => {
    switch (type) {
      case "deposit":
        return <ArrowDownCircle className="text-green-600" size={22} />;
      case "transfer":
        return <Send className="text-blue-600" size={22} />;
      case "card":
        return <CreditCard className="text-purple-600" size={22} />;
      default:
        return <Wallet2 className="text-gray-600" size={22} />;
    }
  };

  const formatDate = (d: string, year?: string) =>
  `${new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })} • ${year || new Date(d).getFullYear()}`;

  return (
    <div className="pt-6 pb-6 h-screen overflow-y-scroll max-w-3xl mx-auto">

      {/* Page Header */}
      <h1 className="text-2xl font-bold text-[var(--headtext)]">Transactions</h1>
      <p className="text-[var(--ptext)] mb-4">
        View your deposit, transfers, and card transaction history.
      </p>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {["all", "deposit", "transfer", "card"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium 
              ${
                filter === tab
                  ? "bg-[var(--darkgreen)] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-4 overflow-y-scroll ">
        {filtered.length === 0 && (
          <p className="text-center text-[var(--ptext)] mt-10">
            No transactions found.
          </p>
        )}

        {filtered.map((tx: any) => (
          <div
            key={tx._id}
            className="bg-white shadow p-4 rounded-xl flex items-center justify-between"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <Icon type={tx.type} />
              <div>
                <p className="font-semibold text-[var(--headtext)]">
                  {tx.description || tx.type.toUpperCase()}
                </p>
                <p className="text-xs text-[var(--ptext)]">
  {formatDate(tx.createdAt, tx.year)}
</p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p
                className={`font-bold ${
                  tx.direction === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {tx.direction === "credit" ? "+" : "-"}${tx.amount}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full 
                  ${
                    tx.status === "success"
                      ? "bg-green-100 text-green-700"
                      : tx.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
