"use client";

import { useEffect, useState } from "react";

export default function ProfileUpdatePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // Fetch profile data
  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/user-info`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, [token]);

  if (!user) return <div className="p-6">Loading...</div>;

  const updateProfile = async () => {
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          phone: user.phone,
          country: user.country,
        }),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert("❌ " + data.error);

    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      {/* FIRST NAME */}
      <div>
        <label className="block mb-1">First Name</label>
        <input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* MIDDLE NAME */}
      <div>
        <label className="block mb-1">Middle Name</label>
        <input
          value={user.middleName}
          onChange={(e) => setUser({ ...user, middleName: e.target.value })}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* LAST NAME */}
      <div>
        <label className="block mb-1">Last Name</label>
        <input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block mb-1">Phone</label>
        <input
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* COUNTRY */}
      <div>
        <label className="block mb-1">Country</label>
        <input
          value={user.country}
          onChange={(e) => setUser({ ...user, country: e.target.value })}
          className="w-full border p-3 rounded"
        />
      </div>

      <button
        onClick={updateProfile}
        className="w-full bg-black text-white py-3 rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
}
