// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function VerifyAccount() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const [ok, setOk] = useState<string | null>(null);

//   const acceptTerms = async () => {
//     setLoading(true);
//     setErr(null);

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/user/accept-kyc-terms`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const json = await res.json();

//       if (json.kycRequired) {
//     router.push("/dashboard/kyc");
//   }
//       if (!res.ok) throw new Error(json.error || "Failed to accept terms");

//       setOk("Terms accepted! Redirecting…");
//       setTimeout(() => {
//         router.push("/dashboard/kyc");
//       }, 1200);
//     } catch (e: any) {
//       setErr(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold text-[var(--headtext)]">
//         Account Verification
//       </h1>

//       <div className="mt-6 p-6 bg-white rounded-xl shadow-sm">
//         <h2 className="text-lg font-medium text-[var(--headtext)] flex items-center gap-2">
//           <svg width="26" height="26" viewBox="0 0 24 24">
//             <path fill="var(--darkgreen)" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/>
//           </svg>
//           Verify Your Identity
//         </h2>

//         <p className="mt-3 text-[var(--ptext)]">
//           Before you proceed, please accept our Terms & Conditions to complete your account verification.
//         </p>

//         {/* TERMS CARD */}
//         <div className="mt-6 border rounded-xl p-6 bg-white shadow-sm">
//           <h3 className="font-semibold text-[var(--headtext)] mb-4">
//             Terms and Conditions
//           </h3>

//           <div className="max-h-64 overflow-y-auto pr-3 text-[var(--ptext)] text-sm leading-relaxed">
//             <p>
//               Before you can start using our online service, you must agree to the conditions below.
//               You must read the conditions before you decide whether to accept them…
//             </p>

//             <p className="mt-3 font-semibold">1. DEFINITIONS</p>
//             <ul className="list-disc ml-5 mt-2 space-y-1">
//               <li><b>ACCOUNT</b>: any account which you hold and access via our online service.</li>
//               <li><b>ADDITIONAL SECURITY DETAILS</b>: information used to help us identify you…</li>
//               <li><b>IDENTITY DETAILS</b>: access code we provide to you…</li>
//               <li><b>Password & PIN</b> used to identify yourself when accessing your account.</li>
//             </ul>
//           </div>

//           {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}
//           {ok && <div className="mt-4 text-green-700 text-sm">{ok}</div>}

//           <div className="mt-6 flex gap-4">
//             <button
//               onClick={acceptTerms}
//               disabled={loading}
//               className="px-5 py-3 rounded-lg bg-[var(--darkgreen)] text-white flex items-center gap-2 disabled:opacity-50"
//             >
//               {loading ? "Processing..." : "✓ I Accept & Proceed to Verification"}
//             </button>

//             <button className="px-5 py-3 rounded-lg border border-gray-300">
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  // const onAccept = async () => {
  //   try {
  //     setErr(null);
  //     setLoading(true);
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/accept-kyc-terms`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  //       },
  //     });
  //     const json = await res.json();
  //     if (!res.ok) throw new Error(json?.error || "Failed to accept terms");
  //     router.push("/dashboard/kyc");
  //   } catch (e:any) {
  //     setErr(e.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onAccept = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setErr("You are not logged in.");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/accept-kyc-terms`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error || "Failed to accept terms");

    router.push("/dashboard/kyc");

  } catch (e:any) {
    setErr(e.message);
  }
};


  const onDecline = () => {
    router.push("/");
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Account Verification</h1>

      <Card className="mt-6 rounded-xl bg-[var(--white)] ">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-[var(--darkgreen)]" />
            Verify Your Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Card className="border rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full grid place-items-center"
                     style={{ background: "var(--lemon)" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/></svg>
                </div>
                <div>
                  <div className="font-semibold">Welcome to Swiss Community Bank</div>
                  <p className="text-sm text-[var(--ptext)]">
                    Complete your account verification to access all features.
                  </p>
                  <div className="mt-3 text-sm leading-relaxed text-[var(--headtext)]/80">
                    <p><b>Dear Roland Onyekwere david,</b></p>
                    <p className="mt-2">
                      Welcome Onboard! ... Please review our terms and conditions below before proceeding.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 3h10v2H7V3Zm0 4h10v2H7V7Zm0 4h10v2H7v-2Zm0 4h10v2H7v-2Z"/></svg>
                Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] overflow-y-auto pr-2 text-sm text-[var(--ptext)] leading-relaxed">
                {/* Put your T&C content here */}
                <p>
                  Before you can start using our online service you must agree...
                </p>
                <p className="mt-3 font-semibold">1. DEFINITIONS</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><b>ACCOUNT</b>: any account which you hold...</li>
                  <li><b>ADDITIONAL SECURITY DETAILS</b>: ...</li>
                  <li><b>IDENTITY DETAILS</b>: ...</li>
                </ul>
              </div>

              {err && <div className="mt-4 text-sm text-red-600">{err}</div>}

              <div className="mt-6 flex gap-3">
                <Button onClick={onAccept} disabled={loading}
                        className="bg-[var(--headtext)] hover:bg-[#0d3a34] text-[var(--white)]">
                  {loading ? "Processing..." : "✓ I Accept & Proceed to Verification"}
                </Button>
                <Button variant="outline" onClick={onDecline}>Decline</Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
