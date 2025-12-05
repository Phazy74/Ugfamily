"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert("❌ " + data.error);

    alert("✅ Password updated successfully");
  };

  return (
    <div className="max-w-lg h-screen mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Change Password</h1>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full p-3 border rounded"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-3 border rounded"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded"
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </div>
  );
}
