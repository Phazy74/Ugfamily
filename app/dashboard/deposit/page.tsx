"use client";

import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { Copy } from "lucide-react";

export default function DepositPage() {
  const [method, setMethod] = useState("usdt");
  const [amount, setAmount] = useState("");
  const [invoice, setInvoice] = useState<any>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const createInvoice = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setInvoice(res.data);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(invoice.address);
    alert("Address copied!");
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Deposit Funds</h1>

      {/* METHOD SELECTION */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setMethod("usdt")}
          className={`p-4 rounded-xl border ${
            method === "usdt" ? "bg-green-100 border-green-500" : "bg-white"
          }`}
        >
          USDT
        </button>
        <button className="p-4 rounded-xl border opacity-50">Bank</button>
        <button className="p-4 rounded-xl border opacity-50">PayPal</button>
      </div>

      {/* AMOUNT INPUT */}
      <div>
        <label className="font-medium">Deposit Amount (USD)</label>
        <input
          type="number"
          className="w-full p-3 border rounded-lg mt-1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button
        onClick={createInvoice}
        className="bg-black text-white w-full py-3 rounded-lg"
      >
        Continue
      </button>

      {/* RESULT UI */}
      {invoice && (
        <div className="mt-6 p-4 border rounded-xl bg-white space-y-4">
          <h2 className="text-xl font-semibold">Send USDT</h2>

          <p className="text-gray-600">
            Amount to Pay:{" "}
            <span className="font-bold">{invoice.payAmount} USDT</span>
          </p>

          <div className="flex justify-center">
            <QRCode value={invoice.address} size={180} />
          </div>

          <div>
            <p className="font-semibold">Wallet Address</p>
            <div className="flex items-center p-3 border rounded-lg bg-gray-50">
              <span className="flex-1 break-all">{invoice.address}</span>
              <Copy className="cursor-pointer" onClick={copyAddress} />
            </div>
          </div>

          <p className="text-yellow-600 text-sm">
            ⚠ Send only **USDT TRC20** to this address.
          </p>
        </div>
      )}
    </div>
  );
}
