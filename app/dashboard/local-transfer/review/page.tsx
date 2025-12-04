//  export const dynamic = "force-dynamic";
// export const revalidate = 0;
 
//  "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { Lock, Loader2 } from "lucide-react";

// export default function ReviewTransfer() {
//   const params = useSearchParams();

//   const amount = params.get("amount");
//   const accountNumber = params.get("accountNumber");
//   const name = params.get("name");

//   const [pin, setPin] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const handleConfirm = async () => {
//     setLoading(true);
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/transfer/local`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           accountNumber,
//           amount,
//           pin,
//         }),
//       }
//     );

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) {
//       alert("❌ " + data.error);
//       return;
//     }

//     // Go to success receipt
//     window.location.href = `/dashboard/local-transfer/success?ref=${data.receipt.reference}&amount=${data.receipt.amount}&name=${name}&to=${accountNumber}`;
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto space-y-6">
//       <h1 className="text-2xl font-bold">Review Transfer</h1>

//       <div className="p-4 bg-gray-50 rounded-lg shadow">
//         <p><strong>Sending To:</strong> {name}</p>
//         <p><strong>Account Number:</strong> {accountNumber}</p>
//         <p><strong>Amount:</strong> ${amount}</p>
//       </div>

//       <div>
//         <label>Enter Transaction PIN</label>
//         <input
//           type="password"
//           className="w-full p-3 border rounded-lg mt-1"
//           maxLength={4}
//           value={pin}
//           onChange={(e) => setPin(e.target.value)}
//         />
//       </div>

//       <button
//         onClick={handleConfirm}
//         className="w-full bg-black text-white py-3 rounded-lg flex justify-center items-center gap-2"
//       >
//         {loading ? <Loader2 className="animate-spin" /> : "Confirm Transfer"}
//         <Lock size={18} />
//       </button>
//     </div>
//   );
// }




"use client";

export const dynamic = "force-dynamic";


import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export default function ReviewTransfer() {
  const params = useSearchParams();

  const amount = params.get("amount");
  const accountNumber = params.get("accountNumber");
  const name = params.get("name");

  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleConfirm = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transfer/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accountNumber,
          amount,
          pin,
        }),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("❌ " + data.error);
      return;
    }

    window.location.href = `/dashboard/local-transfer/success?ref=${data.receipt.reference}&amount=${data.receipt.amount}&name=${name}&to=${accountNumber}`;
  };

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Review Transfer</h1>

      <div className="p-4 bg-gray-50 rounded-lg shadow">
        <p><strong>Sending To:</strong> {name}</p>
        <p><strong>Account Number:</strong> {accountNumber}</p>
        <p><strong>Amount:</strong> ${amount}</p>
      </div>

      <div>
        <label>Enter Transaction PIN</label>
        <input
          type="password"
          className="w-full p-3 border rounded-lg mt-1"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-black text-white py-3 rounded-lg flex justify-center items-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Confirm Transfer"}
        <Lock size={18} />
      </button>
    </div>
  );
}
