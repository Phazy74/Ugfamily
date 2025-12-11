"use client";

import { 
  User, Lock, KeyRound, Bell, Image, LogOut, FileText, Smartphone, ChevronRight 
} from "lucide-react";
import { useEffect, useState } from "react";
import CubeLoader from "@/components/FullPageLoader";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
   const [data, setData] = useState<any>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/user-info`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [token]);

  if (!data) return null;

  if (!user) return <div className="p-6"><CubeLoader/></div>;

  const initials = `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;

  return (
    <div className="pt-6 pb-6 space-y-6">

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#E4F5BD] text-gray-800 font-bold flex items-center justify-center text-xl">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div>
          <h2 className="font-semibold text-lg">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs">Account: {user.accountNumber}</p>
        </div>
      </div>

      {/* SETTINGS SECTIONS */}
      <SettingsSection title="ACCOUNT SETTINGS">
        <SettingsItem icon={<User size={20} />} label="Edit Profile" href="/dashboard/settings/profile" />
        <SettingsItem icon={<Image size={20} />} label="Change Profile Photo" href="/dashboard/settings/avatar" />
        <SettingsItem icon={<Lock size={20} />} label="Change Password" href="/dashboard/settings/change-password" />
        <SettingsItem icon={<KeyRound size={20} />} label="Change Transaction PIN" href="/dashboard/settings/change-pin" />
        <SettingsItem icon={<FileText size={20} />} label="ID Documents" href="#" />
      </SettingsSection>

      <SettingsSection title="SECURITY">
        <SettingsItem icon={<Smartphone size={20} />} label="Login Activity" href="#" />
        <SettingsItem icon={<Bell size={20} />} label="Notification Settings" href="#" />
      </SettingsSection>

      <SettingsSection title="OTHER">
        <SettingsItem
          icon={<LogOut size={20} className="text-red-500" />}
          label="Logout"
          color="text-red-500"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        />
      </SettingsSection>
    </div>
  );
}

/* COMPONENTS */

function SettingsSection({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 font-medium">{title}</p>
      <div className="bg-white rounded-xl shadow divide-y">{children}</div>
    </div>
  );
}

function SettingsItem({ icon, label, href, color, onClick }: any) {
  const Wrapper = href ? "a" : "button";

  return (
    <Wrapper
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition ${color}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-700">{icon}</div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </Wrapper>
  );
}
