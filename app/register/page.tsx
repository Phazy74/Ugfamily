// "use client";
// import { useMemo, useState } from "react";
// import AuthLayout from "@/components/auth/AuthLayout";
// import PersonalInfo from "./steps/PersonalInfo";
// import ContactDetails from "./steps/ContactDetails";
// import AccountSetup from "./steps/AccountSetup";
// import SecurityStep from "./steps/SecurityStep";

// type FormState = {
//   // step 1
//   legalFirstName: string; middleName: string; legalLastName: string; username: string;
//   // step 2
//   email: string; phone: string; country: string;
//   // step 3
//   accountType: string; transactionPin: string;
//   // step 4
//   password: string; confirmPassword: string; acceptTerms: boolean;
// };

// const initial: FormState = {
//   legalFirstName: "", middleName: "", legalLastName: "", username: "",
//   email: "", phone: "", country: "Nigeria",
//   accountType: "Checking Account", transactionPin: "",
//   password: "", confirmPassword: "", acceptTerms: false,
// };

// export default function RegisterPage() {
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState<FormState>(initial);
//   const steps = useMemo(() => ["Personal Info", "Contact Details", "Account Setup", "Security"], []);

//   const setField = (k: keyof FormState, v: any) => setData(s => ({ ...s, [k]: v }));

//   const header = (
//     <>
//       <div className="flex items-start justify-between">
//         <h2 className="text-[19px] font-semibold">Create Your Account</h2>
//         <div className="text-sm text-gray-600">Step {step} of 4</div>
//       </div>
//       {/* tabs + progress */}
//       <div className="mt-3">
//         <div className="flex pb-2 justify-between items-center gap-[2px]  text-sm">
//           {steps.map((label, i)=>(
//             <div key={label} className={` ${step===i+1?  "text-[var(--headtext)] text-center font-medium":"text-gray-500 flex  text-center text-[10px] "}`}>
//               {label}
//             </div>
//           ))}
//         </div>
//         <div className="h-1 bg-gray-200 rounded">
//           <div className="h-full bg-[var(--headtext)] rounded" style={{width:`${(step-0.5)/4*100}%`}}/>
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <AuthLayout>
//       <div className="card">
//         {header}

//         {step === 1 && (
//           <PersonalInfo
//             data={data}
//             setField={setField}
//             next={() => setStep(2)}
//           />
//         )}
// {showVerify ? (
//   <EmailVerify
//     tempToken={tempToken}
//     onVerified={(token) => {
//       setNextToken(token);
//       setShowVerify(false);
//       setStep(3); // move to Account Setup
//     }}
//   />
// ) : step === 2 ? (
//   <ContactDetails
//     data={data}
//     setField={setField}
//     prev={() => setStep(1)}
//     next={() => {}}
//     setTempToken={setTempToken}
//     setShowVerify={setShowVerify}
//   />
// ) : null}



//         {step === 3 && (
//           <AccountSetup
//             data={data}
//             setField={setField}
//             prev={() => setStep(2)}
//             next={() => setStep(4)}
//           />
//         )}

//         {step === 4 && (
//          <SecurityStep 
//   data={data} 
//   setField={setField} 
//   prev={() => setStep(3)} 
//   finalToken={finalToken}   // <-- required
// />

//         )}
//       </div>
//     </AuthLayout>
//   );
// }
// "use client";
// import { useMemo, useState } from "react";
// import AuthLayout from "@/components/auth/AuthLayout";
// import PersonalInfo from "./steps/PersonalInfo";
// import ContactDetails from "./steps/ContactDetails";
// import AccountSetup from "./steps/AccountSetup";
// import SecurityStep from "./steps/SecurityStep";
// import EmailVerify from "./steps/EmaiVerify"; // <-- must exist

// type FormState = {
//   legalFirstName: string;
//   middleName: string;
//   legalLastName: string;
//   username: string;
//   email: string;
//   phone: string;
//   country: string;
//   accountType: string;
//   transactionPin: string;
//   password: string;
//   confirmPassword: string;
//   acceptTerms: boolean;
// };

// const initial: FormState = {
//   legalFirstName: "",
//   middleName: "",
//   legalLastName: "",
//   username: "",
//   email: "",
//   phone: "",
//   country: "Nigeria",
//   accountType: "Checking Account",
//   transactionPin: "",
//   password: "",
//   confirmPassword: "",
//   acceptTerms: false,
// };

// export default function RegisterPage() {
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState<FormState>(initial);

//   // NEW STATES for email verification
//   const [showVerify, setShowVerify] = useState(false);
//   const [tempToken, setTempToken] = useState<string | null>(null); // token from /step1
//   const [finalToken, setFinalToken] = useState<string | null>(null); // token from /verify

//   const steps = useMemo(
//     () => ["Personal Info", "Contact Details", "Account Setup", "Security"],
//     []
//   );

//   const setField = (k: keyof FormState, v: any) =>
//     setData((s) => ({ ...s, [k]: v }));

//   const header = (
//     <>
//       <div className="flex items-start justify-between">
//         <h2 className="text-[19px] font-semibold">Create Your Account</h2>
//         <div className="text-sm text-gray-600">Step {step} of 4</div>
//       </div>

//       <div className="mt-3">
//         <div className="flex pb-2 justify-between items-center gap-[2px] text-sm">
//           {steps.map((label, i) => (
//             <div
//               key={label}
//               className={`${
//                 step === i + 1
//                   ? "text-[var(--headtext)] text-center font-medium"
//                   : "text-gray-500 flex text-center text-[10px]"
//               }`}
//             >
//               {label}
//             </div>
//           ))}
//         </div>
//         <div className="h-1 bg-gray-200 rounded">
//           <div
//             className="h-full bg-[var(--headtext)] rounded"
//             style={{ width: `${((step - 1) / 3) * 100}%` }}
//           />
//         </div>
//       </div>
//     </>
//   );

//   return (
//     <AuthLayout>
//       <div className="card">
//         {header}

//         {/* Step 1 */}
//         {step === 1 && (
//           <PersonalInfo data={data} setField={setField} next={() => setStep(2)} />
//         )}

//         {/* Step 2 - Email verification */}
//         {showVerify ? (
//           <EmailVerify
//             tempToken={tempToken}
//             onVerified={(token) => {
//               setFinalToken(token);
//               setShowVerify(false);
//               setStep(3);
//             }}
//           />
//         ) : step === 2 ? (
//           <ContactDetails
//             data={data}
//             setField={setField}
//             prev={() => setStep(1)}
//             next={() => {}}
//             setTempToken={setTempToken}
//             setShowVerify={setShowVerify}
//           />
//         ) : null}

//         {/* Step 3 */}
//         {step === 3 && (
//           <AccountSetup
//             data={data}
//             setField={setField}
//             prev={() => setStep(2)}
//             next={() => setStep(4)}
//           />
//         )}

//         {/* Step 4 */}
//         {step === 4 && (
//           <SecurityStep
//             data={data}
//             setField={setField}
//             prev={() => setStep(3)}
//             finalToken={finalToken}
//           />
//         )}
//       </div>
//     </AuthLayout>
//   );
// }
"use client";
import { useMemo, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import PersonalInfo from "./steps/PersonalInfo";
import ContactDetails from "./steps/ContactDetails";
import AccountSetup from "./steps/AccountSetup";
import SecurityStep from "./steps/SecurityStep";
import EmailVerify from "./steps/EmaiVerify"; // <-- you will create this

type FormState = {
  legalFirstName: string;
  middleName: string;
  legalLastName: string;
  username: string;

  email: string;
  phone: string;
  country: string;

  accountType: string;
  transactionPin: string;

  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const initial: FormState = {
  legalFirstName: "",
  middleName: "",
  legalLastName: "",
  username: "",

  email: "",
  phone: "",
  country: "Nigeria",

  accountType: "Checking Account",
  transactionPin: "",

  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
const [nextToken, setNextToken] = useState<string | null>(null);

  // NEW STATES REQUIRED FOR EMAIL VERIFICATION
  const [showVerify, setShowVerify] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [finalToken, setFinalToken] = useState<string | null>(null);

  const steps = ["Personal Info", "Contact Details", "Account Setup", "Security"];

  const setField = (key: keyof FormState, value: any) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return (
    <AuthLayout>
      <div className="card">
        {/* TOP HEADER WITH STEPS */}
        <div>
          <div className="flex items-start justify-between">
            <h2 className="text-[19px] font-semibold">Create Your Account</h2>
            <div className="text-sm text-gray-600">Step {step} of 4</div>
          </div>

          <div className="mt-3">
            <div className="flex pb-2 justify-between items-center gap-[2px] text-sm">
              {steps.map((label, i) => (
                <div
                  key={label}
                  className={
                    step === i + 1
                      ? "text-[var(--headtext)] text-center font-medium"
                      : "text-gray-500 text-[10px]"
                  }
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="h-1 bg-gray-200 rounded">
              <div
                className="h-full bg-[var(--headtext)] rounded"
                style={{ width: `${(step - 0.5) / 4 * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* STEP SCREENS */}
        {step === 1 && (
          <PersonalInfo
            data={data}
            setField={setField}
            next={() => setStep(2)}
          />
        )}

        {/* {step === 2 && !showVerify && (
          <ContactDetails
  data={data}
  setField={setField}
  prev={() => setStep(1)}
  next={() => setStep(2)}
  setTempToken={setTempToken}
  setShowVerify={setShowVerify}
/>

        )} */}
      {step === 2 && !showVerify && (
  <ContactDetails
  data={data}
  setField={setField}
  prev={() => setStep(1)}
  next={() => setStep(2)}
  setTempToken={setTempToken}
  setShowVerify={setShowVerify}
/>

)}

        {showVerify && (
  <EmailVerify
    tempToken={tempToken!}
    onVerified={(token) => {
      setNextToken(token);   // ✔ Save nextToken for AccountSetup
      setShowVerify(false);
      setStep(3);
    }}
  />
)}


       {step === 3 && (
  <AccountSetup
    data={data}
    setField={setField}
    prev={() => setStep(2)}
    next={() => setStep(4)}
    nextToken={nextToken}          // ✔ COMING FROM EMAIL VERIFY
    setFinalToken={setFinalToken}  // ✔ Saves final token for step 4
  />
)}


        {step === 4 && (
          <SecurityStep
            data={data}
            setField={setField}
            prev={() => setStep(3)}
            finalToken={finalToken}
          />
        )}
      </div>
    </AuthLayout>
  );
}
