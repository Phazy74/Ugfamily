"use client";

import { useState, useEffect } from "react";
import { Shield, Landmark, Send, Loader2, ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WireTransferPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const[loading, setLoading] = useState(false);
  const [fetchingBalance, setFetchingBalance] = useState(true);
  
  // Controls the animated popup
  const [showPendingModal, setShowPendingModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    amount: "",
    beneficiaryName: "",
    bankName: "",
    swiftCode: "",
    iban: "",
    reason: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 1. FETCH USER'S ACTUAL BALANCE
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!token) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          let foundBalance = 0;
          if (data.account?.balances?.usd?.available !== undefined) {
            foundBalance = data.account.balances.usd.available;
          } else if (data.balances?.usd?.available !== undefined) {
            foundBalance = data.balances.usd.available;
          } else if (data.balance !== undefined) {
            foundBalance = data.balance;
          }
          setBalance(foundBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setFetchingBalance(false);
      }
    };

    fetchBalance();
  }, [token]);

  // 2. HANDLE TRANSACTION SUBMISSION
  const handleTransfer = async () => {
    if (!formData.amount || Number(formData.amount) <= 0) return alert("Please enter a valid amount");
    if (Number(formData.amount) > balance) return alert("Insufficient funds");
    if (!formData.beneficiaryName || !formData.bankName || !formData.iban) return alert("Please fill in all required beneficiary details");

    setLoading(true);

    try {
      // Send transfer to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transfer/wire`, { // <-- Update this URL to match your backend route!
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
          type: "wire transfer",
          direction: "debit",
          status: "pending", // Force status to pending
        }),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        // Success! Show the pending modal
        setShowPendingModal(true);
      } else {
        // Backend rejected it
        alert(data.message || "Error while making transfer");
        
        // 🔴 REMOVE THIS LINE LATER! 
        // We are forcing the modal to show right now just so you can see the animation work!
        setShowPendingModal(true); 
      }
    } catch (error) {
      console.error("Transfer error:", error);
      alert("Error while making transfer");
      
      // 🔴 REMOVE THIS LINE LATER! 
      // Forces the modal to show so you can test the UI
      setShowPendingModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 pb-20 space-y-6 h-full max-w-2xl mx-auto relative">
      <h1 className="text-2xl font-bold">Wire Transfer</h1>
      <p className="text-gray-500 text-sm mt-[-10px]">Send money to international bank accounts</p>

      {/* Available Balance Card */}
      <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">Available USD Balance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {fetchingBalance ? (
              <span className="animate-pulse bg-gray-200 h-6 w-32 block rounded mt-1"></span>
            ) : (
              `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
            )}
          </p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <Landmark size={28} className="text-green-600" />
        </div>
      </div>

      {/* Amount Input */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="font-semibold text-gray-700 mb-3">Transfer Amount</p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl font-medium">$</span>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="0.00"
            className="w-full border-2 border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xl outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Beneficiary Details */}
      <div className="bg-white p-5 rounded-xl shadow-sm border space-y-4">
        <p className="font-semibold text-gray-700 border-b pb-2">Beneficiary Details</p>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 transition-all"
          placeholder="Beneficiary Full Name"
          value={formData.beneficiaryName}
          onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 transition-all"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 transition-all"
          placeholder="SWIFT / BIC Code"
          value={formData.swiftCode}
          onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 transition-all"
          placeholder="IBAN / Account Number"
          value={formData.iban}
          onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
        />

        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500 transition-all resize-none"
          placeholder="Reason for Transfer (Optional)"
          rows={3}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleTransfer}
        disabled={loading || fetchingBalance}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg transition-all"
      >
        {loading ? (
          <><Loader2 className="animate-spin" /> Processing...</>
        ) : (
          <><Send size={20} /> Initiate Transfer</>
        )}
      </button>

      {/* Security Footer */}
      <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm bg-gray-50 py-3 rounded-lg border">
        <Shield size={16} className="text-green-600" />
        <p>All transactions are secure & 256-bit encrypted.</p>
      </div>

      {/* ========================================= */}
      {/* ANIMATED "PENDING" MODAL */}
      {/* ========================================= */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* Card Body */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center transform transition-all animate-in zoom-in-95 duration-300">
            
            {/* Animated Clock Icon for "Pending" */}
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <Clock size={40} className="text-yellow-600 animate-pulse" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Processing</h2>
            
            <p className="text-gray-500 mb-5 leading-relaxed text-sm">
              Your wire transfer of <span className="font-bold text-gray-900">${Number(formData.amount).toLocaleString()}</span> to <span className="font-semibold">{formData.bankName}</span> is on the way. 
            </p>

            {/* Status Badge */}
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 mb-6">
               <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></span>
               Status: Pending Approval
            </div>

            <button
              onClick={() => router.push("/dashboard/transactions")} // Assuming you have a user transactions page!
              className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              View Transactions <ArrowRight size={18} />
            </button>

            {/* Close button for testing purposes */}
            <button 
              onClick={() => setShowPendingModal(false)}
              className="mt-4 text-gray-400 hover:text-gray-600 text-sm underline"
            >
              Close Window
            </button>

          </div>
        </div>
      )}
    </div>
  );
}