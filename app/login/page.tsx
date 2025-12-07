// "use client";
// import { useState } from "react";
// import AuthLayout from "@/components/auth/AuthLayout";
// import PasswordInput from "@/components/PasswordInput";
// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [stay, setStay] = useState(true);
//   const [err, setErr] = useState<string|null>(null);

//   const submit = async () => {
//     setErr(null);
//     try {
//       const API = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${API}/auth/login`, {
//         method:"POST",
//         headers:{ "Content-Type":"application/json" },
//         body: JSON.stringify({ email: username, password })
//       });
//       const json = await res.json();
//       if(!res.ok) throw new Error(json?.error || "Login failed");
//       localStorage.setItem("token", json.token);
//       window.location.href = "/dashboard/home";
//     } catch(e:any){ setErr(e.message); }
//   };

//   return (
//     <AuthLayout>
//       <div className="card max-w-xl">
//         <h2 className="text-2xl font-semibold mb-6">Sign In to UnionGate Bank</h2>

//         <div className="space-y-4">
//           <input className="input" placeholder="Enter Username" value={username} onChange={e=>setUsername(e.target.value)} />
//           {/* <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /> */}
//          <PasswordInput
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   placeholder="Password"
// />


//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2">
//               <input type="checkbox" checked={stay} onChange={e=>setStay(e.target.checked)} />
//               <span>Stay signed in for 30 days</span>
//             </label>
//             <a href="#" className="underline">Forgot Password?</a>
//           </div>
//         </div>

//         {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}

//         <button onClick={submit} className="w-full mt-6 py-3 rounded-lg bg-[var(--headtext)] text-white">Sign In</button>

//         <button onClick={()=>location.href="/register"} className="w-full mt-3 py-3 rounded-lg bg-gray-100">Not enrolled? Create Account</button>

//         <p className="text-xs text-gray-600 mt-6">
//           By signing in, you agree to our <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
//         </p>
//       </div>
//     </AuthLayout>
//   );
// }
// "use client";
// import { useState } from "react";
// import AuthLayout from "@/components/auth/AuthLayout";
// import PasswordInput from "@/components/PasswordInput";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [pin, setPin] = useState("");
//   const [tempToken, setTempToken] = useState("");

//   const [err, setErr] = useState<string | null>(null);
//   const [pinErr, setPinErr] = useState<string | null>(null);

//   const [showPinPanel, setShowPinPanel] = useState(false);

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   // -------------------------
//   // STEP 1 — EMAIL + PASSWORD
//   // -------------------------
//   const handleLoginStep1 = async () => {
//     setErr(null);

//     try {
//       const res = await fetch(`${API}/auth/login-step1`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: username,
//           password,
//         }),
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error || "Login failed");

//       // Save temporary token and show PIN panel
//       setTempToken(json.tempToken);
//       setShowPinPanel(true);

//     } catch (e: any) {
//       setErr(e.message);
//     }
//   };

//   // -------------------------
//   // STEP 2 — PIN SUBMISSION
//   // -------------------------
//   const handlePinSubmit = async () => {
//     setPinErr(null);

//     try {
//       const res = await fetch(`${API}/auth/login-step2`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tempToken}`,
//         },
//         body: JSON.stringify({ pin }),
//       });

//       const json = await res.json();
//       if (!res.ok) throw new Error(json.error || "Invalid PIN");

//       // Save final token
//       localStorage.setItem("token", json.token);

//       window.location.href = "/dashboard/home";
//     } catch (e: any) {
//       setPinErr(e.message);
//     }
//   };

//   return (
//     <AuthLayout>
//       <div className="card max-w-xl">

//         {/* LOGIN FORM */}
//         <h2 className="text-2xl font-semibold mb-6">Sign In to UnionGate Bank</h2>

//         <div className="space-y-4">
//           <input
//             className="input"
//             placeholder="Email Address"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <PasswordInput
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//         </div>

//         {err && <div className="mt-4 text-red-600 text-sm">{err}</div>}

//         <button
//           onClick={handleLoginStep1}
//           className="w-full mt-6 py-3 rounded-lg bg-[var(--headtext)] text-white"
//         >
//           Continue
//         </button>

//         <button
//           onClick={() => (window.location.href = "/register")}
//           className="w-full mt-3 py-3 rounded-lg bg-gray-100"
//         >
//           Not enrolled? Create Account
//         </button>

//         <p className="text-xs text-gray-600 mt-6">
//           By signing in, you agree to our{" "}
//           <a className="underline" href="#">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a className="underline" href="#">
//             Privacy Policy
//           </a>
//           .
//         </p>
//       </div>

//       {/* ---------------------- */}
//       {/* PIN SLIDE-OVER PANEL   */}
//       {/* ---------------------- */}
//       {showPinPanel && (
//         <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
//           <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg">

//             <h3 className="font-semibold text-lg mb-3 text-center">
//               Enter Transaction PIN
//             </h3>
//             <p className="text-center text-gray-500 text-sm mb-4">
//               For your security, please verify your 4-digit transaction PIN.
//             </p>

//             <input
//               type="password"
//               maxLength={4}
//               value={pin}
//               onChange={(e) => setPin(e.target.value)}
//               className="w-full border p-3 rounded-lg text-center tracking-widest text-xl"
//             />

//             {pinErr && <p className="text-red-600 text-sm mt-2">{pinErr}</p>}

//             <button
//               onClick={handlePinSubmit}
//               className="w-full mt-5 bg-[var(--headtext)] text-white py-3 rounded-lg"
//             >
//               Verify PIN
//             </button>

//             <button
//               onClick={() => setShowPinPanel(false)}
//               className="w-full mt-3 py-2 text-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </AuthLayout>
//   );
// }
"use client";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const [tempToken, setTempToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  //-------------------------------------
  // STEP 1 — VERIFY PASSWORD
  //-------------------------------------
  const loginStep1 = async () => {
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login-step1`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(json.error || "Invalid login");

      setTempToken(json.tempToken); // trigger PIN slide-over
    } catch (e: any) {
      setErr(e.message);
      setLoading(false);
    }
  };

  //-------------------------------------
  // STEP 2 — VERIFY PIN
  //-------------------------------------
//   const loginStep2 = async () => {
//     if (!tempToken) return;
//     setErr(null);
//     setLoading(true);

//     try {
//       const res = await fetch(`${API}/auth/login-step2`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tempToken}`,
//         },
//         body: JSON.stringify({ pin }),
//       });

//       const json = await res.json();
//       setLoading(false);

//       if (!res.ok) throw new Error(json.error || "Invalid PIN");

//       localStorage.setItem("token", json.token);

//       window.location.href = "/dashboard/home";
//     } catch (e: any) {
//       setErr(e.message);
//       setLoading(false);
//     }
//   };
const handlePinPress = async (value: any) => {
  if (value === "⌫") {
    setPin(pin.slice(0, -1));
    return;
  }

  if (pin.length >= 4) return;

  const newPin = pin + value;
  setPin(newPin);

  // When 4 digits entered → auto submit
  if (newPin.length === 4) {
    await loginStep2WithPIN(newPin);
  }
};

const loginStep2WithPIN = async (enteredPin: string) => {
  setErr(null);
  setLoading(true);

  try {
    const res = await fetch(`${API}/auth/login-step2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tempToken}`,
      },
      body: JSON.stringify({ pin: enteredPin }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) throw new Error(json.error || "Invalid PIN");

    localStorage.setItem("token", json.token);
    window.location.href = "/dashboard/home";

  } catch (e: any) {
    setErr(e.message);
    setPin(""); // Reset PIN after error
    setLoading(false);
  }
};

  //-------------------------------------
  // UI COMPONENT
  //-------------------------------------
  return (
    <AuthLayout>
      {/* MAIN LOGIN FORM */}
      <div className="card max-w-xl relative">

        <h2 className="text-2xl font-semibold mb-6">Sign In to UnionGate Bank</h2>

        <div className="space-y-4">
          <input
            className="input"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        {err && !tempToken && (
          <div className="mt-4 text-red-600 text-sm">{err}</div>
        )}

        <button
          onClick={loginStep1}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg bg-[var(--headtext)] text-white"
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        <button
          onClick={() => (window.location.href = "/register")}
          className="w-full mt-3 py-3 rounded-lg bg-gray-100"
        >
          Not enrolled? Create Account
        </button>

        {/* TERMS */}
        <p className="text-xs text-gray-600 mt-6">
          By signing in, you agree to our{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </div>

      {/* PIN SLIDE-OVER PANEL */}
      {/* {tempToken && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-sm bg-white rounded-xl p-6 shadow-xl animate-slide-up">

            <h3 className="text-xl font-semibold text-center mb-3">
              Enter Transaction PIN
            </h3>

            <p className="text-center text-gray-500 mb-5">
              For security, please confirm your 4-digit PIN.
            </p>

            <input
              type="password"
              maxLength={4}
              className="input text-center text-xl tracking-widest"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />

            {err && (
              <p className="text-red-500 text-center mt-2 text-sm">{err}</p>
            )}

            <button
              onClick={loginStep2}
              className="w-full bg-[var(--headtext)] text-white py-3 rounded-lg mt-4"
            >
              Verify PIN
            </button>

            <button
              onClick={() => setTempToken(null)}
              className="w-full text-gray-500 py-3 mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
      {tempToken && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl animate-slide-up">

      <h3 className="text-xl font-semibold text-center mb-1">Enter Transaction PIN</h3>
      <p className="text-center text-gray-500 mb-6">
        Confirm login using your secure 4-digit PIN
      </p>

      {/* PIN DOTS */}
      <div className="flex justify-center gap-4 mb-6">
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border 
              ${pin.length > i ? "bg-[var(--headtext)] border-[var(--headtext)]" 
                               : "border-gray-400"}`}
          ></div>
        ))}
      </div>

      {/* ERROR MESSAGE */}
      {err && <p className="text-red-500 text-center mb-3">{err}</p>}

      {/* NUMPAD */}
      <div className="grid grid-cols-3 gap-4 text-xl font-semibold select-none">
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((item) => (
          <button
            key={item}
            disabled={item === ""}
            onClick={() => handlePinPress(item)}
            className="
              h-14 flex items-center justify-center 
              rounded-xl border bg-gray-50 active:bg-gray-200 
              disabled:bg-transparent disabled:border-none
            "
          >
            {item}
          </button>
        ))}
      </div>

      {/* Cancel */}
      <button
        onClick={() => { setTempToken(null); setPin(""); }}
        className="w-full text-gray-500 py-3 mt-4"
      >
        Cancel
      </button>

    </div>
  </div>
)}

    </AuthLayout>
  );
}
