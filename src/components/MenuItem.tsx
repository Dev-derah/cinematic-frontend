'use client'
import React from "react";
import Link from "next/link";

interface MenuItemProps {
  item: string;
  route: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onClick,route }) => {
  return (
    <Link
      href={route}
      className={`relative z-10 text-center px-6 py-3 cursor-pointer ${
        isActive
          ? "text-white font-bold bg-black-10 rounded-lg transition-all duration-300"
          : "text-grey-75"
      }`}
      onClick={onClick}
    >
      {item}
    </Link>
  );
};
