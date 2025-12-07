// "use client";

// import { useState } from "react";
// import axios from "axios";
// import QRCode from "react-qr-code";
// import { Copy } from "lucide-react";

// export default function DepositPage() {
//   const [method, setMethod] = useState("usdt");
//   const [amount, setAmount] = useState("");
//   const [invoice, setInvoice] = useState<any>(null);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const createInvoice = async () => {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//       { amount },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setInvoice(res.data);
//   };

//   const copyAddress = () => {
//     navigator.clipboard.writeText(invoice.address);
//     alert("Address copied!");
//   };

//   return (
//     <div className="p-6 space-y-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold">Deposit Funds</h1>

//       {/* METHOD SELECTION */}
//       <div className="grid grid-cols-3 gap-3">
//         <button
//           onClick={() => setMethod("usdt")}
//           className={`p-4 rounded-xl border ${
//             method === "usdt" ? "bg-green-100 border-green-500" : "bg-white"
//           }`}
//         >
//           USDT
//         </button>
//         <button className="p-4 rounded-xl border opacity-50">Bank</button>
//         <button className="p-4 rounded-xl border opacity-50">PayPal</button>
//       </div>

//       {/* AMOUNT INPUT */}
//       <div>
//         <label className="font-medium">Deposit Amount (USD)</label>
//         <input
//           type="number"
//           className="w-full p-3 border rounded-lg mt-1"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={createInvoice}
//         className="bg-black text-white w-full py-3 rounded-lg"
//       >
//         Continue
//       </button>

//       {/* RESULT UI */}
//       {invoice && (
//         <div className="mt-6 p-4 border rounded-xl bg-white space-y-4">
//           <h2 className="text-xl font-semibold">Send USDT</h2>

//           <p className="text-gray-600">
//             Amount to Pay:{" "}
//             <span className="font-bold">{invoice.payAmount} USDT</span>
//           </p>

//           <div className="flex justify-center">
//             <QRCode value={invoice.address} size={180} />
//           </div>

//           <div>
//             <p className="font-semibold">Wallet Address</p>
//             <div className="flex items-center p-3 border rounded-lg bg-gray-50">
//               <span className="flex-1 break-all">{invoice.address}</span>
//               <Copy className="cursor-pointer" onClick={copyAddress} />
//             </div>
//           </div>

//           <p className="text-yellow-600 text-sm">
//             ⚠ Send only **USDT TRC20** to this address.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function DepositPage() {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const startDeposit = async () => {
//     if (!amount || Number(amount) <= 0) {
//       alert("Enter a valid amount");
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//         { amount: Number(amount) },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setLoading(false);
//       if (res.data?.paymentUrl) {
//         window.location.href = res.data.paymentUrl; // NOWPayments hosted page (QR, copy, timer)
//       } else {
//         alert("Could not start deposit");
//       }
//     } catch (e: any) {
//       setLoading(false);
//       alert(e?.response?.data?.message || "Failed to create deposit");
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto space-y-4">
//       <h1 className="text-2xl font-bold">Deposit Funds</h1>
//       <p className="text-sm text-gray-500">Choose amount and continue</p>

//       <div>
//         <label className="font-medium">Amount (USD)</label>
//         <input
//           type="number"
//           className="w-full p-3 border rounded-lg mt-2"
//           placeholder="0.00"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={startDeposit}
//         className="w-full bg-black text-white py-3 rounded-lg"
//         disabled={loading}
//       >
//         {loading ? "Creating payment..." : "Continue"}
//       </button>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import axios from "axios";

// export default function DepositPage() {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const startDeposit = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//         { amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       window.location.href = res.data.invoiceUrl;

//     } catch (err) {
//       alert("Could not start deposit");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto space-y-6">
//       <h1 className="text-xl font-bold">Deposit USDT</h1>

//       <input
//         type="number"
//         className="w-full p-3 border rounded-lg"
//         placeholder="Enter amount (USD)"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <button
//         disabled={loading}
//         onClick={startDeposit}
//         className="w-full bg-black text-white py-3 rounded-lg"
//       >
//         {loading ? "Creating Invoice..." : "Continue"}
//       </button>
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import QRCode from "react-qr-code";

// export default function DepositPage() {
//   const [amount, setAmount] = useState("");
//   const [invoice, setInvoice] = useState(null);

//   const startDeposit = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//         { amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setInvoice(res.data.invoice);
//       alert("Invoice created!");
//     } catch (error) {
//       console.log(error);
//       alert("Could not create invoice");
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Deposit USDT</h1>

//       <input
//         type="number"
//         className="w-full p-3 border rounded"
//         placeholder="Enter amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <button
//         onClick={startDeposit}
//         className="w-full bg-black text-white py-3 rounded"
//       >
//         Continue
//       </button>

//       {invoice && (
//         <div className="p-4 bg-white rounded shadow mt-6 text-center">
//           <p className="font-semibold">Scan to Pay</p>

//           <div className="flex justify-center my-4">
//             <QRCode value={invoice.pay_address} size={180} />
//           </div>

//           <p className="text-sm text-gray-500">{invoice.pay_address}</p>

//           <button
//             onClick={() => navigator.clipboard.writeText(invoice.pay_address)}
//             className="mt-3 bg-gray-900 text-white px-4 py-2 rounded"
//           >
//             Copy Address
//           </button>

//           <a
//             href={invoice.invoice_url}
//             target="_blank"
//             className="block mt-4 text-blue-600 underline"
//           >
//             Open Invoice Page
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";
// import axios from "axios";
// import QRCode from "react-qr-code";

// export default function DepositPage() {
//   const [amount, setAmount] = useState("");
//   const [invoice, setInvoice] = useState<any>(null);

//   const startDeposit = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//         { amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setInvoice(res.data.invoice);
//       alert("Invoice created!");
//     } catch (error) {
//       console.log(error);
//       alert("Could not start deposit");
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Deposit USDT</h1>

//       <input
//         type="number"
//         className="w-full p-3 border rounded"
//         placeholder="Enter amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <button
//         onClick={startDeposit}
//         className="w-full bg-black text-white py-3 rounded"
//       >
//         Continue
//       </button>

//       {invoice && (
//         <div className="p-4 bg-white rounded shadow mt-6 text-center">
          
//           <p className="font-semibold mb-2">Scan Invoice Link</p>

//           {/* 🎯 FIXED — QR now uses invoice_url (NEVER undefined) */}
//           <div className="flex justify-center my-4">
//             <QRCode value={invoice.invoice_url} size={180} />
//           </div>

//           <p className="text-sm text-gray-500 break-all">
//             {invoice.invoice_url}
//           </p>

//           <button
//             onClick={() => navigator.clipboard.writeText(invoice.invoice_url)}
//             className="mt-3 bg-gray-900 text-white px-4 py-2 rounded"
//           >
//             Copy Invoice Link
//           </button>

//           <a
//             href={invoice.invoice_url}
//             target="_blank"
//             className="block mt-4 text-blue-600 underline"
//           >
//             Open Invoice Page
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import axios from "axios";
import { DollarSign, Landmark, CreditCard, Bitcoin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DepositPage() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!amount || Number(amount) < 1) {
      return alert("Enter a valid amount");
    }
    router.push(`/dashboard/deposit/confirm?amount=${amount}`);
  };

  return (
    <div className="pt-6 pb-6 max-w-3xl mx-auto space-y-8">

      <h1 className="text-2xl font-bold text-[var(--headtext)]">Deposit Funds</h1>
      <p className="text-[var(--ptext)]">Choose your preferred deposit method</p>

      {/* Banner */}
      <div className="bg-[var(--darkgreen)] text-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Fund Your Account</h2>
        <p className="text-sm opacity-80">Secure & encrypted deposits</p>
      </div>

      {/* Payment Method Cards */}
      <div className="grid grid-cols-3 gap-4">

        {/* USDT — ACTIVE */}
        <div className="p-4 rounded-xl border cursor-pointer bg-[var(--lemon)] border-gray-200 shadow-md">
          <div className="flex items-center gap-3">
            <Bitcoin className="text-[var(--headtext)]" />
            <p className="font-semibold text-[var(--headtext)]">USDT (TRC20)</p>
          </div>
          <p className="text-xs mt-1 text-[var(--headtext)]">Instant crediting</p>
        </div>

        {/* Other disabled options */}
        <div className="p-4 rounded-xl border bg-gray-100 opacity-40 cursor-not-allowed">
          <Landmark />
          <p className="font-semibold mt-1">Bank Transfer</p>
        </div>

        <div className="p-4 rounded-xl border bg-gray-100 opacity-40 cursor-not-allowed">
          <CreditCard />
          <p className="font-semibold mt-1">PayPal</p>
        </div>

      </div>

      {/* Amount Input */}
      <div>
        <label className="text-[var(--headtext)] font-medium">Deposit Amount (USD)</label>
        <input
          type="number"
          className="w-full p-3 mt-2 rounded-lg border"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-3 rounded-lg text-white font-semibold bg-[var(--darkgreen)]"
      >
        Continue
      </button>
    </div>
  );
}
