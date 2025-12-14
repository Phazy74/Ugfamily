"use client";

import { useState, useEffect } from "react";
import { Shield, Landmark, Send } from "lucide-react";

export default function WireTransferPage() {
  const [amount, setAmount] = useState("");
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


      const balance = userData?.balance ?? 0;

  return (
    <div className="pt-6 pb-6 space-y-6 h-screen">

      <h1 className="text-2xl font-bold">Wire Transfer</h1>
      <p className="text-gray-500 text-sm">Send money to international bank accounts</p>

      {/* Available Balance */}
      <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-xl font-bold">${Number(balance).toLocaleString()}</p>
        </div>
        <Landmark size={30} className="text-green-600" />
      </div>

      {/* Amount */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="font-semibold mb-2">Transfer Amount</p>
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full border rounded-lg p-3 text-lg outline-none"
        />
      </div>

      {/* Beneficiary Details */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <p className="font-semibold">Beneficiary Details</p>

        <input className="w-full border p-2 rounded" placeholder="Beneficiary Full Name" />

        <input className="w-full border p-2 rounded" placeholder="Bank Name" />

        <input className="w-full border p-2 rounded" placeholder="SWIFT / BIC Code" />

        <input className="w-full border p-2 rounded" placeholder="IBAN / Account Number" />

        <textarea className="w-full border p-2 rounded" placeholder="Reason for Transfer" />
      </div>

      <button className="bg-black text-white w-full p-3 rounded-lg flex items-center justify-center gap-2">
        <Send /> Continue
      </button>

      {/* Security */}
      <div className="flex items-start gap-3 mt-3 text-gray-500 text-sm">
        <Shield />
        <p>All transactions are secure & encrypted.</p>
      </div>
    </div>
  );
}
