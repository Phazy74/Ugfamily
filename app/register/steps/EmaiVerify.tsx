// "use client";
// import { useState } from "react";

// export default function EmailVerify({ tempToken, onVerified }: any) {
//   const [code, setCode] = useState("");
//   const [err, setErr] = useState("");

//   const verify = async () => {
//     const API = process.env.NEXT_PUBLIC_API_URL;

//     const res = await fetch(`${API}/auth/register/verify`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tempToken, code }),
//     });

//     const json = await res.json();

//     if (!res.ok) return setErr(json.error);

//     // Send next token upward
//     onVerified(json.nextToken);
//   };

//   return (
//     <div className="mt-6 text-center">
//       <h2 className="text-xl font-semibold">Verify Your Email</h2>
//       <p className="text-gray-500 text-sm mt-1">
//         Enter the 6-digit code we sent to your email.
//       </p>

//       <input
//         className="input mt-4 text-center tracking-widest text-2xl"
//         maxLength={6}
//         value={code}
//         onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//       />

//       {err && <p className="text-red-600 text-sm mt-2">{err}</p>}

//       <button
//         onClick={verify}
//         className="w-full mt-5 py-3 rounded-lg bg-[var(--headtext)] text-white"
//       >
//         Verify Email
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function EmailVerify({
  tempToken,
  onVerified,
}: {
  tempToken: string;
  onVerified: (token: string) => void;
}) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const verify = async () => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API}/auth/register/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tempToken, code }),
    });

    const json = await res.json();

    if (!res.ok) {
      setErr(json.error);
      return;
    }

    // Pass nextToken back to RegisterPage
    onVerified(json.nextToken);
  };

  return (
    <div className="mt-6 text-center">

      <h2 className="text-xl font-semibold">Verify Your Email</h2>
      <p className="text-gray-500 text-sm mt-1">Enter the 6-digit code we sent to your email.</p>

      <input
        className="input mt-4 text-center tracking-widest text-2xl"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
      />

      {err && <p className="text-red-600 text-sm mt-2">{err}</p>}

      <button
        onClick={verify}
        className="w-full mt-5 py-3 rounded-lg bg-[var(--headtext)] text-white"
      >
        Verify Email
      </button>
    </div>
  );
}
