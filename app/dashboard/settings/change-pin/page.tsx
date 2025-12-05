"use client";

import { useState } from "react";

export default function ChangePinPage() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/change-pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentPin, newPin })
    });

    const data = await res.json();
    if (!res.ok) return alert("❌ " + data.error);

    alert("PIN updated successfully");
  };

  return (
    <div className="max-w-lg h-screen mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Change Transaction PIN</h1>

      <input
        maxLength={4}
        type="password"
        placeholder="Current PIN"
        className="w-full p-3 border rounded"
        value={currentPin}
        onChange={(e) => setCurrentPin(e.target.value)}
      />

      <input
        maxLength={4}
        type="password"
        placeholder="New PIN"
        className="w-full p-3 border rounded mt-3"
        value={newPin}
        onChange={(e) => setNewPin(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-3 rounded mt-4"
      >
        Update PIN
      </button>
    </div>
  );
}
