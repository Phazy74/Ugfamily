
// "use client";

// import { useState } from "react";
// import PasswordInput from "@/components/PasswordInput";

// const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

// // Matches keys from FormState in RegisterPage
// type ContactFieldKeys =
//   | "email"
//   | "phone"
//   | "country"
//   | "password"
//   | "confirmPassword"
//   | "legalFirstName"
//   | "middleName"
//   | "legalLastName"
//   | "username";

// type ContactDetailsProps = {
//   data: any;
//   setField: (key: ContactFieldKeys, value: any) => void;
//   prev: () => void;
//   setTempToken: (token: string) => void;
//   setShowVerify: (v: boolean) => void;
// };

// export default function ContactDetails({
//   data,
//   setField,
//   prev,
//   setTempToken,
//   setShowVerify
// }: ContactDetailsProps) {

//   const submitStep1 = async () => {
//     const API = process.env.NEXT_PUBLIC_API_URL;

//     try {
//       const res = await fetch(`${API}/auth/register/step1`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           personalInfo: {
//             legalFirstName: data.legalFirstName,
//             middleName: data.middleName,
//             legalLastName: data.legalLastName,
//             username: data.username,
//           },
//           contactDetail: {
//             email: data.email,
//             phone: data.phone,
//             country: data.country,
//           },
//           password: data.password,
//         }),
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error);

//       // Show verification step
//       setTempToken(json.tempToken);
//       setShowVerify(true);

//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="mt-6">
//       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
//         <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
//           <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
//         </svg>
//       </div>

//       <div className="text-center mt-3">
//         <div className="text-[var(--headtext)] font-medium">Contact Information</div>
//         <p className="text-[var(--ptext)] text-sm">We’ll send you a verification code</p>
//       </div>

//       <div className="mt-6 space-y-4">
//         <input
//           className="input"
//           placeholder="Email Address *"
//           type="email"
//           value={data.email}
//           onChange={(e) => setField("email", e.target.value)}
//         />

//         <input
//           className="input"
//           placeholder="Phone Number *"
//           value={data.phone}
//           onChange={(e) => setField("phone", e.target.value)}
//         />

//         <select
//           className="input"
//           value={data.country}
//           onChange={(e) => setField("country", e.target.value)}
//         >
//           {countries.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>

//         <PasswordInput
//           value={data.password}
//           onChange={(e) => setField("password", e.target.value)}
//           placeholder="Create Password *"
//         />

//         <PasswordInput
//           value={data.confirmPassword}
//           onChange={(e) => setField("confirmPassword", e.target.value)}
//           placeholder="Confirm Password *"
//         />
//       </div>

//       <div className="mt-6 flex justify-between">
//         <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">
//           ← Previous
//         </button>

//         <button
//           onClick={submitStep1}
//           className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white"
//         >
//           Verify Email →
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import PasswordInput from "@/components/PasswordInput";
// import CubeLoader from "@/components/FullPageLoader";

// const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

// type ContactFieldKeys =
//   | "email"
//   | "phone"
//   | "country"
//   | "password"
//   | "confirmPassword"
//   | "legalFirstName"
//   | "middleName"
//   | "legalLastName"
//   | "username";

// type ContactDetailsProps = {
//   data: any;
//   setField: (key: ContactFieldKeys, value: any) => void;
//   prev: () => void;
//   setTempToken: (token: string) => void;
//   setShowVerify: (v: boolean) => void;
// };

// export default function ContactDetails({
//   data,
//   setField,
//   prev,
//   setTempToken,
//   setShowVerify
// }: ContactDetailsProps) {

//   const [loading, setLoading] = useState(false);

//   const submitStep1 = async () => {
//     const API = process.env.NEXT_PUBLIC_API_URL;

//     try {
//       setLoading(true); // SHOW LOADER

//       const res = await fetch(`${API}/auth/register/step1`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           personalInfo: {
//             legalFirstName: data.legalFirstName,
//             middleName: data.middleName,
//             legalLastName: data.legalLastName,
//             username: data.username,
//           },
//           contactDetail: {
//             email: data.email,
//             phone: data.phone,
//             country: data.country,
//           },
//           password: data.password,
//         }),
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error);

//       setTempToken(json.tempToken);
//       setShowVerify(true);

//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false); // HIDE LOADER
//     }
//   };

//   if (loading) return <CubeLoader />; // FULLSCREEN LOADER

//   return (
//     <div className="mt-6">
//       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
//         <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
//           <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
//         </svg>
//       </div>

//       <div className="text-center mt-3">
//         <div className="text-[var(--headtext)] font-medium">Contact Information</div>
//         <p className="text-[var(--ptext)] text-sm">We’ll send you a verification code</p>
//       </div>

//       <div className="mt-6 space-y-4">
//         <input
//           className="input"
//           placeholder="Email Address *"
//           type="email"
//           value={data.email}
//           onChange={(e) => setField("email", e.target.value)}
//         />

//         <input
//           className="input"
//           placeholder="Phone Number *"
//           value={data.phone}
//           onChange={(e) => setField("phone", e.target.value)}
//         />

//         <select
//           className="input"
//           value={data.country}
//           onChange={(e) => setField("country", e.target.value)}
//         >
//           {countries.map((c) => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>

//         <PasswordInput
//           value={data.password}
//           onChange={(e) => setField("password", e.target.value)}
//           placeholder="Create Password *"
//         />

//         <PasswordInput
//           value={data.confirmPassword}
//           onChange={(e) => setField("confirmPassword", e.target.value)}
//           placeholder="Confirm Password *"
//         />
//       </div>

//       <div className="mt-6 flex justify-between">
//         <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">
//           ← Previous
//         </button>

//         <button
//           onClick={submitStep1}
//           className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white"
//         >
//           Verify Email →
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useMemo } from "react";
import PasswordInput from "@/components/PasswordInput";
import CubeLoader from "@/components/FullPageLoader";

const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

type ContactFieldKeys =
  | "email"
  | "phone"
  | "country"
  | "password"
  | "confirmPassword"
  | "legalFirstName"
  | "middleName"
  | "legalLastName"
  | "username";

type ContactDetailsProps = {
  data: any;
  setField: (key: ContactFieldKeys, value: any) => void;
  prev: () => void;
  setTempToken: (token: string) => void;
  setShowVerify: (v: boolean) => void;
};

export default function ContactDetails({
  data,
  setField,
  prev,
  setTempToken,
  setShowVerify,
}: ContactDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -------------------------------------------------
     VALIDATION
  -------------------------------------------------- */
  const isFormValid = useMemo(() => {
    return (
      data.legalFirstName?.trim() &&
      data.legalLastName?.trim() &&
      data.username?.trim() &&
      data.email?.trim() &&
      data.phone?.trim() &&
      data.country?.trim() &&
      data.password?.trim() &&
      data.confirmPassword?.trim() &&
      data.password === data.confirmPassword
    );
  }, [data]);

  /* -------------------------------------------------
     SUBMIT
  -------------------------------------------------- */
  const submitStep1 = async () => {
    if (!isFormValid) {
      setError("Please fill all required fields correctly.");
      return;
    }

    const API = process.env.NEXT_PUBLIC_API_URL;

    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${API}/auth/register/step1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: {
            legalFirstName: data.legalFirstName,
            middleName: data.middleName,
            legalLastName: data.legalLastName,
            username: data.username,
          },
          contactDetail: {
            email: data.email,
            phone: data.phone,
            country: data.country,
          },
          password: data.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Registration failed");

      setTempToken(json.tempToken);
      setShowVerify(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CubeLoader />;

  return (
    <div className="mt-6">
      {/* ICON */}
      <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
          <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
        </svg>
      </div>

      {/* HEADER */}
      <div className="text-center mt-3">
        <div className="text-[var(--headtext)] font-medium">
          Contact Information
        </div>
        <p className="text-[var(--ptext)] text-sm">
          We’ll send you a verification code
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* FORM */}
      <div className="mt-6 space-y-4">
        <input
          className="input"
          placeholder="Email Address *"
          type="email"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
        />

        <input
          className="input"
          placeholder="Phone Number *"
          value={data.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />

        <select
          className="input"
          value={data.country}
          onChange={(e) => setField("country", e.target.value)}
        >
          <option value="">Select Country *</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <PasswordInput
          value={data.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="Create Password *"
        />

        <PasswordInput
          value={data.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          placeholder="Confirm Password *"
        />

        {data.password &&
          data.confirmPassword &&
          data.password !== data.confirmPassword && (
            <p className="text-xs text-red-600">
              Passwords do not match
            </p>
          )}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prev}
          className="px-5 py-3 rounded-lg border border-gray-300"
        >
          ← Previous
        </button>

        <button
          onClick={submitStep1}
          disabled={!isFormValid}
          className={`px-5 py-3 rounded-lg text-white transition
            ${
              isFormValid
                ? "bg-[var(--headtext)] hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Verify Email →
        </button>
      </div>
    </div>
  );
}
