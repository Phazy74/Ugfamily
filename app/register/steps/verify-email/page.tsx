"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState("waiting");

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API}/auth/verify-email?token=${token}`);
      const json = await res.json();

      if (res.ok) {
        localStorage.setItem("reg_userId", json.userId);
        setStatus("verified");
        setTimeout(() => {
          window.location.href = "/register?step=3";
        }, 1500);
      } else {
        setStatus("failed");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-20 text-center">
      {status === "waiting" && (
        <p className="text-gray-500">Verifying email...</p>
      )}
      {status === "verified" && (
        <p className="text-green-600 font-medium">Email verified! Redirecting…</p>
      )}
      {status === "failed" && (
        <p className="text-red-600">Verification failed or expired.</p>
      )}
    </div>
  );
}
