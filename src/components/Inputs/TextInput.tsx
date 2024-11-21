import React from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void; // Added onBlur prop
  error: string | null;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  onBlur, // Destructure onBlur
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">{label}</label>
      <input
        type={type}
        className={`border bg-black-08 text-gray-300 p-3 rounded-md outline-none ${
          error ? "border-red-600" : "border-black-15"
        }`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur} // Add onBlur handler
        value={value}
      />
      {error && <small className="text-red-600">{error}</small>}
    </div>
  );
};

export default TextInput;
