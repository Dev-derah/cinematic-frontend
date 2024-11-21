"use client";
import React from "react";

interface SelectItemProps<T> {
  items: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  onChange: (selectedValue: number) => void;
  selectedValue: number | null;
}

export const SelectItem = <T extends object>({
  items,
  labelKey,
  valueKey,
  onChange,
  selectedValue,
}: SelectItemProps<T>) => {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onChange(item[valueKey] as number)}
          className={`px-4 py-2 rounded-md border ${
            selectedValue === item[valueKey]
              ? " bg-red-45 border-none text-white"
              : "bg-black-06"
          }`}
        >
          {String(item[labelKey])}
        </button>
      ))}
    </div>
  );
};
