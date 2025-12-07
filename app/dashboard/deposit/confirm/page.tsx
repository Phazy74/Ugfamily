// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import axios from "axios";

// export default function ConfirmDeposit() {
//   const params = useSearchParams();
//   const amount = params.get("amount");

//   const [loading, setLoading] = useState(false);

//   const startDeposit = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/deposit/create`,
//         { amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const invoiceUrl = res.data.invoice.invoice_url;
//       window.location.href = invoiceUrl;

//     } catch (e) {
//       console.log(e);
//       alert("Deposit could not be initialized");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto space-y-6">

//       <h1 className="text-2xl font-bold text-[var(--headtext)]">Confirm Deposit</h1>

//       <div className="bg-white shadow p-6 rounded-xl border">
//         <p className="text-[var(--ptext)]">You're about to deposit:</p>

//         <h2 className="text-3xl font-bold text-[var(--darkgreen)] mt-2">
//           ${amount}
//         </h2>

//         <p className="text-[var(--ptext)] mt-3">
//           Deposit Method: <strong>USDT (TRC20)</strong>
//         </p>

//         <p className="text-[var(--ptext)] text-sm mt-2">
//           You will be redirected to a secure payment page to complete your deposit.
//         </p>
//       </div>

//       <button
//         onClick={startDeposit}
//         disabled={loading}
//         className="w-full py-3 rounded-lg text-white font-semibold bg-[var(--darkgreen)] disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Proceed to Payment"}
//       </button>

//       <button
//         onClick={() => history.back()}
//         className="w-full py-3 rounded-lg text-[var(--headtext)] border mt-2"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }
import { Suspense } from "react";
import ReviewConfirm from "./ReviewConfirm";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ReviewConfirm />
    </Suspense>
  );
}
