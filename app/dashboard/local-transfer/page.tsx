"use client";

import { useEffect, useState } from "react";
import { SendHorizonal, User, ArrowRight, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import CubeLoader from "@/components/FullPageLoader";

export default function LocalTransferPage() {
  const router = useRouter(); // <-- Used Next.js router for smooth navigation
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const[accountNumber, setAccountNumber] = useState<string>("");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");
  const [verifying, setVerifying] = useState(false);
  const[verifyError, setVerifyError] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // LOAD BALANCE
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (res.ok) {
          // Smart balance fetching
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
      } catch {
        console.error("Failed to load balance");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const presets = [100, 500, 1000];

  // VERIFY ACCOUNT NUMBER
  const verifyBeneficiary = async () => {
    setVerifying(true);
    setVerifyError("");
    setBeneficiaryName("");
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transfer/verify-beneficiary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accountNumber }),
        }
      );
      
      const data = await res.json();
      
      // Check if backend returned success
      if (res.ok && data.success && data.name) {
        setBeneficiaryName(data.name);
      } else {
        setVerifyError(data.error || data.message || "Account not found");
      }
    } catch {
      setVerifyError("Network error. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const amountNum = Number(amount || 0);
  const amountValid = amountNum > 0 && amountNum <= balance;
  const canContinue = amountValid && beneficiaryName && !verifying;

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <CubeLoader/>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-6 space-y-6 max-w-2xl mx-auto">
      {/* HEADER BANNER */}
      <div className="bg-[#0D1F17] text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <SendHorizonal size={40} className="opacity-80" />
          <div>
            <h2 className="text-xl font-semibold">Local Bank Transfer</h2>
            <p className="text-gray-300 text-sm">
              Send money to any local bank account securely.
            </p>
          </div>
        </div>
      </div>

      {/* BALANCE */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center border">
        <div>
          <p className="text-gray-500 text-sm font-medium">Available Balance</p>
          <h2 className="text-2xl font-bold mt-1 text-gray-900">
            ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <span className="text-green-700 font-semibold bg-green-100 px-4 py-1.5 rounded-full text-sm">
          Available
        </span>
      </div>

      {/* BENEFICIARY */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <User size={20} /> Beneficiary Details
        </h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-xl p-3 outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setBeneficiaryName(""); // Reset name if they change the number
              setVerifyError("");
            }}
          />
          <button
            onClick={verifyBeneficiary}
            disabled={!accountNumber || verifying}
            className="px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-black disabled:opacity-50 transition-colors whitespace-nowrap"
            type="button"
          >
            {verifying ? "Verifying..." : "Verify Account"}
          </button>
        </div>

        {verifyError && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {verifyError}
          </div>
        )}

        {beneficiaryName && (
          <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm border border-green-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Verified Name: <span className="font-bold text-base">{beneficiaryName}</span>
          </div>
        )}
      </div>

      {/* AMOUNT */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4 border">
        <p className="text-gray-700 font-semibold">Transfer Amount</p>

        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-lg">
            <DollarSign size={20} />
          </span>
          <input
            type="number"
            className={`w-full border-2 rounded-xl p-3 pl-11 text-xl outline-none transition-colors
            ${amount && !amountValid ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-blue-500"}`}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
          />
        </div>

        {!amountValid && amount !== "" && (
          <p className="text-red-600 text-sm font-medium">
            Amount must be greater than $0 and not exceed your available balance.
          </p>
        )}

        {/* PRESETS */}
        <div className="flex flex-wrap gap-2 mt-2">
          {presets.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 font-medium text-sm transition-colors"
              type="button"
            >
              ${a}
            </button>
          ))}
          <button
            onClick={() => setAmount(String(balance))}
            className="px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium text-sm transition-colors"
            type="button"
          >
            Send Max
          </button>
        </div>
      </div>

      {/* CONTINUE */}
      <button
        disabled={!canContinue}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none flex items-center justify-center gap-2 transition-all mt-6"
        type="button"
        onClick={() => {
          // Save to session storage for the review page
          sessionStorage.setItem(
            "localTransferDraft",
            JSON.stringify({ amount: Number(amount), accountNumber, beneficiaryName })
          );

          // Use Next.js Router to push to the next page smoothly
          // encodeURIComponent ensures names with spaces don't break the URL!
          router.push(`/dashboard/local-transfer/review?amount=${amount}&accountNumber=${accountNumber}&name=${encodeURIComponent(beneficiaryName)}`);
        }}
      >
        Continue to Review <ArrowRight size={20} />
      </button>
    </div>
  );
}