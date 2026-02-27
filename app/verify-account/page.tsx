"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyAccountPage() {
  const router = useRouter();
  const[loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  
  // 1. New state to hold the user's name (defaults to "Customer" while loading)
  const [userName, setUserName] = useState<string>("Customer");

useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("Backend response:", data); // This will now show your actual user data in the console!

        if (res.ok && data.user && data.user.personalInfo) {
          const info = data.user.personalInfo;
          
          // Use first + last name, or fallback to username
          const fullName = info.firstName && info.lastName 
            ? `${info.firstName} ${info.lastName}` 
            : info.username;
          
          if (fullName) {
            setUserName(fullName);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user name:", error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on component mount

  const onAccept = async () => {
    try {
      setLoading(true); // Optional: Set loading to true while processing
      const token = localStorage.getItem("token");

      if (!token) {
        setErr("You are not logged in.");
        setLoading(false);
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

      router.push("/kyc");

    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false); // Optional: Stop loading whether it succeeds or fails
    }
  };

  const onDecline = () => {
    router.push("/dashboard/home");
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
                  <div className="font-semibold">Welcome to Union Gate Bank</div>
                  <p className="text-sm text-[var(--ptext)]">
                    Complete your account verification to access all features.
                  </p>
                  <div className="mt-3 text-sm leading-relaxed text-[var(--headtext)]/80">
                    
                    {/* 3. Replaced the hardcoded name here */}
                    <p className="capitalize"><b>Dear {userName},</b></p>
                    
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