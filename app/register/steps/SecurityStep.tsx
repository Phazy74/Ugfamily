// "use client";
// import { useState } from "react";
// import PasswordStrength from "@/components/PasswordStrength";
// import PasswordInput from "@/components/PasswordInput";


// export default function SecurityStep({
//   data,
//   setField,
//   prev,
// }: {
//   data: any;
//   setField: (k: any, v: any) => void;
//   prev: () => void;
// }) {
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);
//   const [ok, setOk] = useState<string | null>(null);


// // 
// const submitFinal = async () => {
//   setErr(null);

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   const res = await fetch(`${API}/auth/register/complete`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ finalToken }),
//   });

//   const json = await res.json();

//   if (!res.ok) return setErr(json.error);

//   localStorage.setItem("token", json.token);
//   window.location.href = "/dashboard/home";
// };
//   return (
//     <div className="mt-6">
//       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
//         {/* shield icon */}
//         <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"/></svg>
//       </div>

//       <div className="text-center mt-3">
//         <div className="text-[var(--headtext)] font-medium">Secure Your Account</div>
//         <p className="text-[var(--ptext)] text-sm">Create a strong password to protect your account</p>
//       </div>

//       <div className="mt-6 space-y-4">
//         <PasswordInput
//   value={data.password}
//   onChange={(e) => setField("password", e.target.value)}
//   placeholder="Password *"
// />
//         <PasswordStrength password={data.password} />

//        <PasswordInput
//   value={data.confirmPassword}
//   onChange={(e) => setField("confirmPassword", e.target.value)}
//   placeholder="Confirm Password *"
// />

//         <label className="flex items-start gap-2 text-sm">
//           <input type="checkbox" checked={data.acceptTerms} onChange={e=>setField("acceptTerms", e.target.checked)} />
//           <span>I agree to the <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a></span>
//         </label>
//       </div>

//       {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}
//       {ok && <div className="mt-4 text-green-700 text-sm">{ok}</div>}

//       <div className="mt-6 flex justify-between">
//         <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">← Previous</button>
//        <button
//   onClick={submitFinal}
//   className="px-5 py-3 rounded-lg bg-[var(--darkgreen)] text-white"
// >
//   Create Account
// </button>


//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import PasswordStrength from "@/components/PasswordStrength";
import PasswordInput from "@/components/PasswordInput";

export default function SecurityStep({
  data,
  setField,
  prev,
  finalToken,   // <-- NEW: passed from parent
}: {
  data: any;
  setField: (k: any, v: any) => void;
  prev: () => void;
  finalToken: string | null;  // <-- NEW
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submitFinal = async () => {
    setErr(null);

    if (!finalToken)
      return setErr("Verification step incomplete. Refresh and try again.");

    // Basic FE validation
    if (!data.password || !data.confirmPassword)
      return setErr("Password and confirmation are required.");

    if (data.password !== data.confirmPassword)
      return setErr("Passwords do not match.");

    if (!data.acceptTerms)
      return setErr("You must accept the terms to continue.");

    setLoading(true);

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API}/auth/register/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalToken }),
      });

      const json = await res.json();

      if (!res.ok) return setErr(json.error);

      // Save final authenticated token
      localStorage.setItem("token", json.token);
      window.location.href = "/dashboard/home";

    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
          <path
            fill="currentColor"
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"
          />
        </svg>
      </div>

      <div className="text-center mt-3">
        <div className="text-[var(--headtext)] font-medium">Secure Your Account</div>
        <p className="text-[var(--ptext)] text-sm">
          Create a strong password to protect your account
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <PasswordInput
          value={data.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="Password *"
        />

        <PasswordStrength password={data.password} />

        <PasswordInput
          value={data.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          placeholder="Confirm Password *"
        />

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={data.acceptTerms}
            onChange={(e) => setField("acceptTerms", e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <a className="underline" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="underline" href="#">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">
          ← Previous
        </button>

        <button
          onClick={submitFinal}
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-[var(--darkgreen)] text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </div>
    </div>
  );
}
