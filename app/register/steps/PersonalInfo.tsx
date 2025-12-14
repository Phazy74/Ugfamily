"use client";

export default function PersonalInfo({
  data, setField, next
}: {
  data: any; setField: (k:any,v:any)=>void; next: ()=>void;
}) {
  return (
    <div className="mt-6">
      {/* icon */}
      <div className="w-12 h-12 rounded-full bg-[var(--lemon)] mx-auto grid place-items-center">
        {/* user icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--headtext)]"><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5"/></svg>
      </div>

      <div className="text-center mt-3">
        <div className="text-[var(--headtext)] font-medium">Personal Information</div>
        <p className="text-[var(--ptext)] text-sm">Please provide your legal name as it appears on official documents</p>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <input className="input" placeholder="Legal First Name *" value={data.legalFirstName} onChange={e=>setField("legalFirstName", e.target.value)} required/>
        <input className="input" placeholder="Middle Name *" value={data.middleName} onChange={e=>setField("middleName", e.target.value)} required />
        <input className="input" placeholder="Legal Last Name *" value={data.legalLastName} onChange={e=>setField("legalLastName", e.target.value)} required/>
        <input className="input" placeholder="Username *" value={data.username} onChange={e=>setField("username", e.target.value)} required/>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={next} className="px-5 py-3 rounded-lg bg-[var(--headtext)] text-white">Next  →</button>
      </div>

      <p className="text-center text-sm mt-4 text-[var(--ptext)]">
        Already have an account? <a href="/login" className="underline">Sign in instead</a>
      </p>
    </div>
  );
}
