import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownItem {
  label: string | React.ReactNode; // Supports string or component
  action: () => void;
}

interface DropdownProps {
  title: string | React.ReactNode; // Supports string or component
  isOpen: boolean;
  toggleDropdown: () => void;
  items: DropdownItem[];
  direction?: "top" | "bottom" | "left" | "right"; // Dropdown direction
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  isOpen,
  toggleDropdown,
  items,
  direction = "bottom", // Default direction is "bottom"
}) => {
  // Compute dropdown position styles
  const directionStyles = {
    bottom: "top-full left-0",
    top: "bottom-full left-0",
    left: "top-0 right-full",
    right: "top-0 left-full",
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Toggle */}
      <button
        className="text-2xl font-semibold flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {title}
        <FaChevronDown
          className={`ml-2 text-lg transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${directionStyles[direction]} mt-2 bg-black-25 shadow-lg rounded-md text-white w-52 z-50`}
        >
          <ul className="py-2">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={item.action}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
