"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface CustomButtonProps {
  className: string;
  label: string | ReactNode;
  path?: string;
  onclickFunction?: () => void;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  label,
  path,
  onclickFunction,
  disabled,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onclickFunction) {
      onclickFunction(); // Execute the function if provided
    } else if (path) {
      router.push(path); // Navigate to the given path
    } else {
      return;
    }
  };

  return (
    <button
      className={`cursor-pointer ${className}`}
      onClick={handleClick} disabled={disabled}
    >
      {label}
    </button>
  );
};
