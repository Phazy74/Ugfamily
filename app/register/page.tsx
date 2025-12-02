"use client";
import { useMemo, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import PersonalInfo from "./steps/PersonalInfo";
import ContactDetails from "./steps/ContactDetails";
import AccountSetup from "./steps/AccountSetup";
import SecurityStep from "./steps/SecurityStep";

type FormState = {
  // step 1
  legalFirstName: string; middleName: string; legalLastName: string; username: string;
  // step 2
  email: string; phone: string; country: string;
  // step 3
  accountType: string; transactionPin: string;
  // step 4
  password: string; confirmPassword: string; acceptTerms: boolean;
};

const initial: FormState = {
  legalFirstName: "", middleName: "", legalLastName: "", username: "",
  email: "", phone: "", country: "Nigeria",
  accountType: "Checking Account", transactionPin: "",
  password: "", confirmPassword: "", acceptTerms: false,
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const steps = useMemo(() => ["Personal Info", "Contact Details", "Account Setup", "Security"], []);

  const setField = (k: keyof FormState, v: any) => setData(s => ({ ...s, [k]: v }));

  const header = (
    <>
      <div className="flex items-start justify-between">
        <h2 className="text-[19px] font-semibold">Create Your Account</h2>
        <div className="text-sm text-gray-600">Step {step} of 4</div>
      </div>
      {/* tabs + progress */}
      <div className="mt-3">
        <div className="flex pb-2 justify-between items-center gap-[2px]  text-sm">
          {steps.map((label, i)=>(
            <div key={label} className={` ${step===i+1?  "text-[var(--headtext)] text-center font-medium":"text-gray-500 flex  text-center text-[10px] "}`}>
              {label}
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-200 rounded">
          <div className="h-full bg-[var(--headtext)] rounded" style={{width:`${(step-0.5)/4*100}%`}}/>
        </div>
      </div>
    </>
  );

  return (
    <AuthLayout>
      <div className="card">
        {header}

        {step === 1 && (
          <PersonalInfo
            data={data}
            setField={setField}
            next={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <ContactDetails
            data={data}
            setField={setField}
            prev={() => setStep(1)}
            next={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <AccountSetup
            data={data}
            setField={setField}
            prev={() => setStep(2)}
            next={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <SecurityStep
            data={data}
            setField={setField}
            prev={() => setStep(3)}
          />
        )}
      </div>
    </AuthLayout>
  );
}
