"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Lock, Loader2, ArrowLeft, AlertCircle } from "lucide-react";

function ReviewTransferContent() {
  const params = useSearchParams();
  const router = useRouter();

  const amount = params.get("amount") || "0";
  const accountNumber = params.get("accountNumber") || "";
  const name = params.get("name") || "Unknown User";

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleConfirm = async () => {
    setError("");
    
    if (!pin || pin.length < 4) {
      setError("Please enter your full 4-digit Transaction PIN.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transfer/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          accountNumber, 
          amount: Number(amount), 
          pin 
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Success! Push to the success receipt page smoothly
        router.push(
          `/dashboard/local-transfer/success?ref=${data.receipt.reference}&amount=${data.receipt.amount}&name=${encodeURIComponent(name)}&to=${accountNumber}`
        );
      } else {
        // Show the error from the backend (e.g., "Incorrect PIN" or "Insufficient Balance")
        setError(data.error || data.message || "Transfer failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Transfer Error:", err);
      setError("A network error occurred. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 pb-20 max-w-lg mx-auto space-y-6">
      
      {/* HEADER & BACK BUTTON */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => router.back()} 
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Review Transfer</h1>
      </div>

      {/* TRANSFER SUMMARY CARD */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider">Amount to Send</p>
        <h2 className="text-4xl font-bold text-center text-gray-900 pb-4 border-b">
          ${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Recipient Name</span>
            <span className="font-bold text-gray-900 text-right">{name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Account Number</span>
            <span className="font-bold text-gray-900">{accountNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">Transfer Fee</span>
            <span className="font-bold text-green-600">Free</span>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 text-sm">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* PIN INPUT */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4 text-center">
        <label className="block text-gray-700 font-semibold mb-2">
          Enter Transaction PIN
        </label>
        <input
          type="password"
          inputMode="numeric" // Forces number keyboard on mobile
          className="w-full max-w-[200px] mx-auto text-center tracking-[1em] text-2xl p-4 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setError(""); // Clear error when typing
            setPin(e.target.value.replace(/[^0-9]/g, '')); // Only allow numbers
          }}
          placeholder="••••"
        />
        <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Lock size={12} /> Your PIN is securely encrypted
        </p>
      </div>

      {/* CONFIRM BUTTON */}
      <button
        onClick={handleConfirm}
        disabled={loading || pin.length < 4}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center gap-2 transition-all"
      >
        {loading ? (
          <><Loader2 className="animate-spin" /> Authorizing...</>
        ) : (
          "Confirm & Send"
        )}
      </button>

    </div>
  );
}

// 🔴 NEXT.JS REQUIREMENT: Wrap useSearchParams components in Suspense!
export default function ReviewTransfer() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500 flex justify-center"><Loader2 className="animate-spin" size={30}/></div>}>
      <ReviewTransferContent />
    </Suspense>
  );
}