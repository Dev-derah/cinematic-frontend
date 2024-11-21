import React from "react";

interface CheckboxInputProps {
  label: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label }) => {
  return (
    <div className="flex items-center mt-4">
      <input
        type="checkbox"
        className={`h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded`}
      />
      <label className="ml-2 text-gray-300">{label}</label>
    </div>
  );
};

export default CheckboxInput;
