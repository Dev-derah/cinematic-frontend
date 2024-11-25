"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import { Dropdown } from "./Dropdown";

interface UserInfoProps {
  onLogout?: () => void; // Optional logout handler
  showName?: boolean;
}

export const UserInfo: React.FC<UserInfoProps> = ({ onLogout,showName=true }) => {
  const { user } = useUser(); // Access user information from Clerk

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <Image
        src={user.imageUrl}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      {showName && (
        <span className="text-right max-w-48 font-medium truncate">
          {user.fullName || user.username || "User"}
        </span> 
      )}

      {/* <SignOutButton>
        <button
          className="flex items-center gap-2 text-left py-2 hover:font-bold"
          onClick={onLogout}
        >
          Logout
        </button>
      </SignOutButton> */}
    </div>
  );
};
