// "use client";

// import { useState } from "react";

// export default function AvatarUploadPage() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [file, setFile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   const handleFile = (e: any) => {
//     const img = e.target.files[0];
//     setFile(img);
//     setPreview(URL.createObjectURL(img));
//   };

//   const uploadAvatar = async () => {
//     if (!file) return alert("Select an image first");

//     setLoading(true);

//     const form = new FormData();
//     form.append("avatar", file);

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/profile/avatar`,
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       }
//     );

//     const data = await res.json();
//     setLoading(false);

//     if (!res.ok) return alert("❌ " + data.error);

//     alert("✅ Avatar updated!");
//   };

//   return (
//     <div className="max-w-lg h-screen mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Update Profile Picture</h1>

//       {/* PREVIEW */}
//       {preview ? (
//         <img
//           src={preview}
//           className="w-32 h-32 rounded-full mx-auto object-cover"
//         />
//       ) : (
//         <div className="w-32 h-32 rounded-full mx-auto bg-gray-200" />
//       )}

//       {/* FILE INPUT */}
//       <input
//         type="file"
//         accept="image/*"
//         className="w-full"
//         onChange={handleFile}
//       />

//       <button
//         onClick={uploadAvatar}
//         className="w-full bg-black text-white py-3 rounded"
//         disabled={loading}
//       >
//         {loading ? "Uploading..." : "Upload Avatar"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function ProfilePictureUpload() {
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const uploadImage = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/upload-profile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Profile picture updated!");
      window.location.reload(); // refresh navbar
    }
  };

  return (
    <div className="space-y-4 h-screen">
      <h2 className="text-xl font-semibold">Profile Picture</h2>

      {/* Picker */}
      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  }}
/>


      {/* Preview */}
      {preview && (
        <img
          src={preview}
          className="mt-2 w-32 h-32 rounded-full object-cover border"
        />
      )}

      <button
        onClick={uploadImage}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
    </div>
  );
}
