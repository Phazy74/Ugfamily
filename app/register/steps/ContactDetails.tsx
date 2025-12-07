// "use client";
// import { useState } from "react";

// const countries = ["Nigeria","Ghana","United States","United Kingdom","Canada"];

// export default function ContactDetails({ data, setField, prev, next }: any) {
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState<string | null>(null);

//   const submitStep1 = async () => {
//     setErr(null);
//     setLoading(true);

//     try {
//       const API = process.env.NEXT_PUBLIC_API_URL;

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
//           password: data.password, // TEMP password stored
//         }),
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error);

//       // Store userId temporarily for step2
//       localStorage.setItem("reg_userId", json.userId);

//       // Redirect to “Check email”
//       window.location.href = "/verify-email";

//     } catch (e: any) {
//       setErr(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-6">
//       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
//         {/* mail icon */}
//         <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]"><path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z"/></svg>
//       </div>

//       <div className="text-center mt-3">
//         <div className="text-[var(--headtext)] font-medium">Contact Information</div>
//         <p className="text-[var(--ptext)] text-sm">We’ll use these details to communicate with you about your account</p>
//       </div>

//       <div className="mt-6 space-y-4">
//         <input className="input" placeholder="Email Address *" type="email" value={data.email} onChange={e=>setField("email", e.target.value)} />
//         <input className="input" placeholder="Phone Number *" value={data.phone} onChange={e=>setField("phone", e.target.value)} />
//         <select className="input" value={data.country} onChange={e=>setField("country", e.target.value)}>
//           {countries.map(c => <option key={c} value={c}>{c}</option>)}
//         </select>
//       </div>

//       <div className="mt-6 flex justify-between">
//         <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">← Previous</button>
//         <button
//   onClick={submitStep1}
//   className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white"
// >
//   {loading ? "Sending..." : "Verify Email →"}
// </button>

//       </div>

//       <p className="text-center text-sm mt-4 text-[var(--ptext)]">
//         Already have an account? <a className="underline" href="/login">Sign in instead</a>
//       </p>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import PasswordInput from "@/components/PasswordInput";

// const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

// export default function ContactDetails({
//   data, setField, prev, setTempToken, setShowVerify
// }: {
//   data:any; 
//   setField:(k:any,v:any)=>void; 
//   prev:()=>void; 
//   setTempToken:(v:any)=>void;
//   setShowVerify:(v:boolean)=>void;
// })
//  {
//   const [loading, setLoading] = useState(false);

 
//   const submitStep1 = async () => {
//   const API = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(`${API}/auth/register/step1`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         personalInfo: {
//           legalFirstName: data.legalFirstName,
//           middleName: data.middleName,
//           legalLastName: data.legalLastName,
//           username: data.username,
//         },
//         contactDetail: {
//           email: data.email,
//           phone: data.phone,
//           country: data.country,
//         },
//         password: data.password, // sent now instead of step 4
//       }),
//     });

//     const json = await res.json();
//     if (!res.ok) throw new Error(json.error);

//     // Store temp token & open verification screen
//     setTempToken(json.tempToken);
//     setShowVerify(true);

//   } catch (err: any) {
//     alert(err.message);
//   }
// };


//   return (
//     <div className="mt-6">
//       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
//         <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
//           <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
//         </svg>
//       </div>

//       <div className="text-center mt-3">
//         <div className="text-[var(--headtext)] font-medium">Contact Information</div>
//         <p className="text-[var(--ptext)] text-sm">
//           We’ll send you a verification link to secure your account
//         </p>
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
//             <option key={c} value={c}>
//               {c}
//             </option>
//           ))}
//         </select>

//         {/* PASSWORD NOW MOVED TO STEP 2 */}
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

//         <button onClick={submitStep1} className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white">
//   Verify Email →
// </button>

//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import PasswordInput from "@/components/PasswordInput";

// const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

// export default function ContactDetails({
//   data,
//   setField,
//   prev,
//   setTempToken,
//   setShowVerify,
// }: {
//   data: any;
//   setField: (k: string, v: any) => void;
//   prev: () => void;
//   setTempToken: (token: string) => void;
//   setShowVerify: (value: boolean) => void;
// }) {
//   const [loading, setLoading] = useState(false);

//   const submitStep1 = async () => {
//     const API = process.env.NEXT_PUBLIC_API_URL;

//     try {
//       setLoading(true);

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

//       // Store the token and open the email verification UI
//       setTempToken(json.tempToken);
//       setShowVerify(true);
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
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
//         <p className="text-[var(--ptext)] text-sm">
//           We’ll send you a verification code to secure your account.
//         </p>
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
//           disabled={loading}
//           className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white disabled:opacity-50"
//         >
//           {loading ? "Sending..." : "Verify Email →"}
//         </button>
//       </div>

//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import PasswordInput from "@/components/PasswordInput";

// const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

// type ContactDetailsProps = {
//   data: {
//     email: string;
//     phone: string;
//     country: string;
//     legalFirstName: string;
//     middleName: string;
//     legalLastName: string;
//     username: string;
//     password: string;
//     confirmPassword: string;
//   };
//   setField: (key: string, value: any) => void;
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
//     }
//   };

//   return (
//     <div className="mt-6">

      // <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
      //   <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
      //     <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
      //   </svg>
      // </div>

      // <div className="text-center mt-3">
      //   <div className="text-[var(--headtext)] font-medium">Contact Information</div>
      //   <p className="text-[var(--ptext)] text-sm">We’ll send you a verification code</p>
      // </div>

      // <div className="mt-6 space-y-4">
      //   <input
      //     className="input"
      //     placeholder="Email Address *"
      //     type="email"
      //     value={data.email}
      //     onChange={(e) => setField("email", e.target.value)}
      //   />

      //   <input
      //     className="input"
      //     placeholder="Phone Number *"
      //     value={data.phone}
      //     onChange={(e) => setField("phone", e.target.value)}
      //   />

      //   <select
      //     className="input"
      //     value={data.country}
      //     onChange={(e) => setField("country", e.target.value)}
      //   >
      //     {countries.map((c) => (
      //       <option key={c} value={c}>{c}</option>
      //     ))}
      //   </select>

      //   <PasswordInput
      //     value={data.password}
      //     onChange={(e) => setField("password", e.target.value)}
      //     placeholder="Create Password *"
      //   />

      //   <PasswordInput
      //     value={data.confirmPassword}
      //     onChange={(e) => setField("confirmPassword", e.target.value)}
      //     placeholder="Confirm Password *"
      //   />
      // </div>

//       <div className="mt-6 flex justify-between">
//         <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">
//           ← Previous
//         </button>

//         <button onClick={submitStep1} className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white">
//           Verify Email →
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import PasswordInput from "@/components/PasswordInput";

const countries = ["Nigeria", "Ghana", "United States", "United Kingdom", "Canada"];

type ContactDetailsProps = {
  data: any;
  setField: (key: string, value: any) => void;
  prev: () => void;
  next: () => void;                   
  setTempToken: (token: string) => void;
  setShowVerify: (v: boolean) => void;
};

export default function ContactDetails({
  data,
  setField,
  prev,
  next,
  setTempToken,
  setShowVerify
}: ContactDetailsProps) {

  const submitStep1 = async () => {
    const API = process.env.NEXT_PUBLIC_API_URL;

    try {
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
      if (!res.ok) throw new Error(json.error);

      setTempToken(json.tempToken);
      setShowVerify(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="mt-6">
       <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]">
          <path fill="currentColor" d="M20 8v8H4V8l8 5zM4 6h16l-8 5z" />
        </svg>
      </div>

      <div className="text-center mt-3">
        <div className="text-[var(--headtext)] font-medium">Contact Information</div>
        <p className="text-[var(--ptext)] text-sm">We’ll send you a verification code</p>
      </div>

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
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
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
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={prev} className="px-5 py-3 rounded-lg border border-gray-300">
          ← Previous
        </button>

        <button onClick={submitStep1} className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white">
          Verify Email →
        </button>
      </div>
    </div>
  );
}
