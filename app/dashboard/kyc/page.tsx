"use client";

import { useState, useMemo ,useEffect} from "react";
import { useRouter } from "next/navigation";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import {
  ShieldCheck, User, Mail, Phone, ChevronDown, CalendarDays, MapPin, IdCard,
  Landmark, Briefcase, DollarSign, Users, UploadCloud, FileCheck2
} from "lucide-react";

type KycForm = {
  // Personal
  fullName: string;
  phone: string;
  email: string;
  title: "Mr" | "Mrs" | "Miss" | "Ms" | "Dr" | "Prof" | "Other" | "";
  gender: "Male" | "Female" | "Other" | "";
  zipcode: string;
  dob: string; // yyyy-mm-dd
  // Address (shown in your UI)
  addressLine: string;
  city: string;
  state: string;
  nationality: string;

  // Employment
  idType: "SSN" | "NIN" | "SIN" | "BVN" | "Other" | "";
  idNumber: string;
  accountType: string;
  employmentType: "Employed" | "Self Employed" | "Student" | "Unemployed" | "Retired" | "Other" | "";
  salaryRange: string;

  // Next of kin
  nokName: string;
  nokAddress: string;
  nokAge: string;
  nokRelationship: string;

  // Docs
  docType: "International Passport" | "National ID" | "Driver License" | "";
  frontFile?: File | null;
  backFile?: File | null;
  selfieFile?: File | null; // you showed “passport photograph”
};

const ACCOUNT_TYPES = [
  "Checking Account",
  "Savings Account",
  "Fixed Deposit Account",
  "Current Account",
  "Crypto Currency Account",
  "Business Account",
  "Non Resident Account",
  "Cooperate Business Account",
  "Investment Account",
];

const SALARY_RANGES = [
  "$0 – $1,000",
  "$1,001 – $5,000",
  "$5,001 – $10,000",
  "$10,001 – $25,000",
  "$25,001 – $50,000",
  "$50,001+",
];

export default function KycPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [f, setF] = useState<KycForm>({
    fullName: "",
    phone: "",
    email: "",
    title: "",
    gender: "",
    zipcode: "",
    dob: "",
    addressLine: "",
    city: "",
    state: "",
    nationality: "Nigeria",

    idType: "",
    idNumber: "",
    accountType: "",
    employmentType: "",
    salaryRange: "",

    nokName: "",
    nokAddress: "",
    nokAge: "",
    nokRelationship: "",

    docType: "International Passport",
    frontFile: null,
    backFile: null,
    selfieFile: null,
  });

  const API = process.env.NEXT_PUBLIC_API_URL;

  const token = useMemo(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("token") || "";
  }, []);

  const set = (k: keyof KycForm, v: any) => setF(prev => ({ ...prev, [k]: v }));

  const saveAll = async () => {
    setErr(null); setMsg(null);
    // Minimal client validation (friendly)
    if (!f.fullName || !f.phone || !f.email || !f.gender || !f.zipcode || !f.dob) {
      return setErr("Please complete the required Personal Details fields.");
    }
    if (!f.idType || !f.idNumber || !f.accountType || !f.employmentType || !f.salaryRange) {
      return setErr("Please complete the Employment Information section.");
    }
    if (!f.nokName || !f.nokAddress || !f.nokAge || !f.nokRelationship) {
      return setErr("Please complete the Registered Next of Kin section.");
    }

    setSaving(true);
    try {
      const res = await fetch(`${API}/kyc/save`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          personal: {
            fullName: f.fullName,
            phone: f.phone,
            email: f.email,
            title: f.title,
            gender: f.gender,
            zipcode: f.zipcode,
            dob: f.dob,
            // extra address fields (optional in backend)
            addressLine: f.addressLine,
            city: f.city,
            state: f.state,
            nationality: f.nationality,
          },
          employment: {
            idType: f.idType,
            idNumber: f.idNumber,
            accountType: f.accountType,
            employmentType: f.employmentType,
            salaryRange: f.salaryRange,
          },
          nextOfKin: {
            beneficiaryLegalName: f.nokName,
            address: f.nokAddress,
            age: Number(f.nokAge || "0"),
            relationship: f.nokRelationship,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to save KYC");
      setMsg("Details saved.");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const uploadDocs = async () => {
    setErr(null); setMsg(null);
    if (!f.frontFile) return setErr("Please upload the front side document.");
    // back is required in your screenshot, but you can relax it if needed
    if (!f.backFile) return setErr("Please upload the back side document.");
    if (!f.selfieFile) return setErr("Please upload your passport photograph.");

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("docType", f.docType);
      fd.append("front", f.frontFile as File);
      if (f.backFile) fd.append("back", f.backFile);
      // if you also want to send selfie to same endpoint, add “selfie”
      // or create another route. For now we just send the document.
      // fd.append("selfie", f.selfieFile as File);

      const res = await fetch(`${API}/kyc/upload-docs`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to upload documents");

      setMsg("Documents uploaded.");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  };

//   const submitKyc = async () => {
//     setErr(null); setMsg(null);
//     setSubmitting(true);
//     try {
//       const res = await fetch(`${API}/kyc/submit`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.error || "KYC submission failed");

//       setMsg("KYC submitted successfully. Redirecting to dashboard…");
//       setTimeout(() => router.push("/dashboard/home"), 1200);
//     } catch (e: any) {
//       setErr(e.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

// const submitKyc = async () => {
//   setErr(null);
//   setMsg(null);

//   // VALIDATION BEFORE SUBMIT
//   if (!f.gender || !f.zipcode || !f.dob) 
//     return setErr("Please complete all Personal Details.");

//   if (!f.idType || !f.idNumber || !f.employmentType || !f.salaryRange)
//     return setErr("Please complete all Employment Details.");

//   if (!f.nokName || !f.nokAddress || !f.nokAge || !f.nokRelationship)
//     return setErr("Please complete Next of Kin section.");

//   if (!f.frontFile || !f.backFile || !f.selfieFile)
//     return setErr("Please upload all required documents.");

//   setSubmitting(true);
//   try {
//     const res = await fetch(`${API}/kyc/submit`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const json = await res.json();
//     if (!res.ok) throw new Error(json?.error || "KYC submission failed");

//     setMsg("KYC Completed! Redirecting...");
//     setTimeout(() => router.push("/dashboard/home"), 1500);
//   } catch (e: any) {
//     setErr(e.message);
//   } finally {
//     setSubmitting(false);
//   }
// };
const submitKyc = async () => {
  setErr(null);
  setMsg(null);
  setSubmitting(true);

  try {
    const res = await fetch(`${API}/kyc/submit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();

    console.log("🔥 SUBMIT KYC RESPONSE:", json);  // <--- SEE EXACT ERROR

    if (!res.ok) {
      throw new Error(json.error || json.message || "Unknown KYC error");
    }

    setMsg("KYC submitted successfully. Redirecting…");
    setTimeout(() => router.push("/dashboard/home"), 1200);
  } catch (e: any) {
    console.error("❌ CLIENT ERROR (submitKyc):", e);  // <--- DISPLAY REAL ERROR
    setErr(e.message);
  } finally {
    setSubmitting(false);
  }
};

 const [form, setForm] = useState({
  personal: {
    fullName: "",
    phone: "",
    email: "",
    title: "",
    gender: "",
    zipcode: "",
    dob: ""
  },
  employment: {
    idType: "",
    idNumber: "",
    accountType: "",
    employmentType: "",
    salaryRange: ""
  },
  nextOfKin: {
    beneficiaryLegalName: "",
    address: "",
    age: "",
    relationship: ""
  },
  documents: {
    docType: "",
    front: null,
    back: null
  }
});

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(user => {
      setF(prev => ({
        ...prev,
        fullName: `${user.personalInfo.legalFirstName} ${user.personalInfo.middleName} ${user.personalInfo.legalLastName}`,
        email: user.contactDetail.email,
        phone: user.contactDetail.phone,
        accountType: user.accountSetup.accountType
      }));
    });
}, []);



  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Page title */}
      <h1 className="text-2xl font-semibold mt-2">KYC Verification</h1>
      <p className="text-sm text-[var(--ptext)] mb-6">Dashboard &gt; Account Verification</p>

      <Card className="rounded-xl bg-[var(--white)] shadow-xl">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-[var(--darkgreen)]" />
            Account Information
          </CardTitle>
          <p className="text-sm text-[var(--ptext)]">
            To comply with regulations, please provide your information to complete the verification process.
          </p>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Personal Details */}
          <SectionTitle icon={<User className="h-5 w-5" />} title="Personal Details" subtitle="Your personal information required for identification" />
          <div className="grid md:grid-cols-2 gap-4">
            {/* <LabeledInput icon={<User />} label="Full Name *" value={f.fullName} onChange={v => set("fullName", v)} />
            <LabeledInput icon={<Mail />} label="Email *" type="email" value={f.email} onChange={v => set("email", v)} />

            <LabeledInput icon={<Phone />} label="Phone *" value={f.phone} onChange={v => set("phone", v)} /> */}
            <LabeledInput 
  icon={<User />} 
  label="Full Name *" 
  value={f.fullName} 
  readOnly 
/>

<LabeledInput 
  icon={<Mail />} 
  label="Email *" 
  type="email" 
  value={f.email} 
  readOnly 
/>

<LabeledInput 
  icon={<Phone />} 
  label="Phone *" 
  value={f.phone} 
  readOnly 
/>

            <LabeledSelect icon={<ChevronDown />} label="Title *" value={f.title} onChange={v => set("title", v as any)}
              options={["Mr","Mrs","Miss","Ms","Dr","Prof","Other"]} placeholder="Please select your Title" />

            <LabeledSelect icon={<ChevronDown />} label="Gender *" value={f.gender} onChange={v => set("gender", v as any)}
              options={["Male","Female","Other"]} placeholder="Please select your gender" />
            <LabeledInput icon={<MapPin />} label="Zipcode *" value={f.zipcode} onChange={v => set("zipcode", v)} />

            <LabeledInput icon={<CalendarDays />} type="date" label="Date of Birth *" value={f.dob} onChange={v => set("dob", v)} />
            {/* filler to keep grid even */}
            <div className="hidden md:block" />

            {/* Address section from your UI */}
            <SectionTitle className="md:col-span-2 mt-4" icon={<MapPin className="h-5 w-5" />} title="Your Address" subtitle="Your location information required for identification" />
            <LabeledInput icon={<MapPin />} label="Address line *" value={f.addressLine} onChange={v => set("addressLine", v)} />
            <LabeledInput icon={<Landmark />} label="City *" value={f.city} onChange={v => set("city", v)} />

            <LabeledInput icon={<MapPin />} label="State *" value={f.state} onChange={v => set("state", v)} />
            <LabeledInput icon={<Landmark />} label="Nationality *" value={f.nationality} onChange={v => set("nationality", v)} />
          </div>

          {/* Employment Information */}
          <SectionTitle icon={<Briefcase className="h-5 w-5" />} title="Employment Information" subtitle="Required in case of loan or facility application" />
          <div className="grid md:grid-cols-2 gap-4">
            <LabeledSelect icon={<IdCard />} label="State Security Number (SSN, NI, SIN etc.) * (Select type)" value={f.idType} onChange={v => set("idType", v as any)}
              options={["SSN","NIN","SIN","BVN","Other"]} placeholder="Select ID Type" />
            <LabeledInput icon={<IdCard />} label="ID Number *" value={f.idNumber} onChange={v => set("idNumber", v)} />

            {/* <LabeledSelect icon={<Landmark />} label="Account Type *" value={f.accountType} onChange={v => set("accountType", v)}
              options={ACCOUNT_TYPES} placeholder="Please select Account Type" /> */}
            <LabeledInput
            icon={<Landmark />}
            label="Account Type *"
            value={f.accountType}
            readOnly
            />

            <LabeledSelect icon={<DollarSign />} label="Annual income Range *" value={f.salaryRange} onChange={v => set("salaryRange", v)}
              options={SALARY_RANGES} placeholder="Select Salary Range" />

            <LabeledSelect icon={<Briefcase />} label="Type of Employment *" value={f.employmentType} onChange={v => set("employmentType", v as any)}
              options={["Employed","Self Employed","Student","Unemployed","Retired","Other"]} placeholder="Select Type of Employment" />
          </div>

          {/* Next of Kin */}
          <SectionTitle icon={<Users className="h-5 w-5" />} title="Registered Next of Kin" subtitle="Information about your beneficiary" />
          <div className="grid md:grid-cols-2 gap-4">
            <LabeledInput icon={<User />} label="Beneficiary Legal Name *" value={f.nokName} onChange={v => set("nokName", v)} />
            <LabeledInput icon={<MapPin />} label="Next of kin Address *" value={f.nokAddress} onChange={v => set("nokAddress", v)} />

            <LabeledInput icon={<Users />} label="Relationship *" value={f.nokRelationship} onChange={v => set("nokRelationship", v)} />
            <LabeledInput icon={<CalendarDays />} type="number" label="Age *" value={f.nokAge} onChange={v => set("nokAge", v)} />
          </div>

          {/* Document Upload */}
          <SectionTitle icon={<FileCheck2 className="h-5 w-5" />} title="Document Upload" subtitle="Personal documents required for identity verification" />
          <div className="grid md:grid-cols-3 gap-4">
            <DocTypeButton active={f.docType === "International Passport"} label="Int'l Passport" onClick={() => set("docType", "International Passport")} />
            <DocTypeButton active={f.docType === "National ID"} label="National ID" onClick={() => set("docType", "National ID")} />
            <DocTypeButton active={f.docType === "Driver License"} label="Drivers License" onClick={() => set("docType", "Driver License")} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <DropBox
              label="Upload front side *"
              file={f.frontFile}
              onFile={file => set("frontFile", file)}
            />
            <DropBox
              label="Upload back side *"
              file={f.backFile}
              onFile={file => set("backFile", file)}
            />
          </div>

          <DropBox
            label="Upload Passport Photograph *"
            file={f.selfieFile}
            onFile={file => set("selfieFile", file)}
          />

          {/* Messages */}
          {err && <div className="text-sm text-red-600">{err}</div>}
          {msg && <div className="text-sm text-green-700">{msg}</div>}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* <Button
              className="bg-[var(--darkgreen)] hover:bg-[#0d3a34]"
              disabled={saving}
              onClick={saveAll}
            >
              {saving ? "Saving…" : "Save Details"}
            </Button>
            <Button
              variant="secondary"
              disabled={uploading}
              onClick={uploadDocs}
            >
              {uploading ? "Uploading…" : "Upload Documents"}
            </Button>
            <Button
              className="ml-auto bg-gray-900 hover:bg-black"
              disabled={submitting}
              onClick={submitKyc}
            >
              {submitting ? "Submitting…" : "Submit Application"}
            </Button> */}
            <Button
  className="bg-[var(--darkgreen)] hover:bg-[#0d3a34] w-full"
  disabled={saving || uploading || submitting}
  onClick={async () => {
    await saveAll();
    await uploadDocs();
    await submitKyc();
  }}
>
  {saving || uploading || submitting ? "Processing…" : "Save & Submit KYC"}
</Button>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function SectionTitle({
  icon, title, subtitle, className = "",
}: { icon: React.ReactNode; title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`rounded-lg border bg-[#f9fafb] px-4 py-3 ${className}`}>
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-[var(--headtext)]">{icon}</span>
        {title}
      </div>
      {subtitle && <p className="text-sm text-[var(--ptext)] mt-1">{subtitle}</p>}
    </div>
  );
}

// function LabeledInput({
//   label, icon, value, onChange, type = "text",
// }: { label: string; icon?: React.ReactNode; value: string; onChange: (v: string) => void; type?: string }) {
//   return (
//     <div>
//       <label className="block text-sm mb-1">{label}</label>
//       <div className="flex items-center gap-2 rounded-lg border bg-white px-3">
//         {icon && <span className="text-[#94a3b8]">{icon}</span>}
//         <Input
//           type={type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="border-0 focus-visible:ring-0"
//         />
//       </div>
//     </div>
//   );
// }
function LabeledInput({
  label, icon, value, onChange, type = "text", readOnly = false
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-[var(--bgwhitei)] bg-gray-100 px-3 shadow-md">
        {icon && <span className="text-[#94a3b8]">{icon}</span>}
        <Input
          type={type}
          value={value}
          readOnly={readOnly}
          onChange={e => onChange && onChange(e.target.value)}
          className={`border-0 focus-visible:ring-0 ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
        />
      </div>
    </div>
  );
}


function LabeledSelect({
  label, icon, value, onChange, options, placeholder,
}: {
  label: string; icon?: React.ReactNode; value: string;
  onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="flex items-center gap-2 rounded-lg border bg-white px-3">
        {icon && <span className="text-[#94a3b8]">{icon}</span>}
        <select
          className="w-full py-2 outline-none bg-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder || "Select option"}</option>
          {options.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function DocTypeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-6 py-6 text-center transition
      ${active ? "border-gray-900 ring-2 ring-gray-900/10" : "hover:bg-gray-50"}`}
    >
      <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-gray-100">
        <IdCard className="h-5 w-5 text-gray-700" />
      </div>
      <div className="font-medium">{label}</div>
    </button>
  );
}

function DropBox({
  label, file, onFile,
}: { label: string; file?: File | null; onFile: (f: File | null) => void }) {
  return (
    <div>
      <div className="text-sm mb-2">{label}</div>
      <label
        className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed bg-white py-10 text-center"
      >
        <div className="flex flex-col items-center">
          <UploadCloud className="h-8 w-8 text-gray-400" />
          <div className="mt-2 text-sm text-gray-600">
            {file ? (
              <span className="font-medium">{file.name}</span>
            ) : (
              <>
                <span className="font-medium">Click to upload or drag and drop</span>
                <div className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 2MB)</div>
              </>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
      </label>
    </div>
  );
}
