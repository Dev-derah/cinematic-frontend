"use client";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
import { useAuth } from "@/context/AuthContext";

interface UserInfoProps {
  onLogout?: () => void; // Optional logout handler
  showName?: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({ onLogout,showName=true }) => {
  
  const {user} = useAuth()
  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <Image
        src={
          "https://res.cloudinary.com/dcvpqwloa/image/upload/v1732898781/cinematic%20Avatars/ac2b8390-f045-4e70-a507-9955759808e4.png"
        }
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />
      {showName && (
        <span className="text-right max-w-48 font-medium truncate">
          {user.fullName || user.username || "User"}
        </span>
      )}
    </div>
  );
};
