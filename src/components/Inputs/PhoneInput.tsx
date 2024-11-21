import React from "react";

const PhoneInput: React.FC = () => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">Phone Number</label>
      <div className="flex items-center border border-black-15 bg-black-08 p-3 rounded-md">
        <span className="pr-2">🇮🇳</span> 
        <input
          type="tel"
          className="bg-transparent flex-1 text-gray-300 outline-none"
          placeholder="Enter Phone Number"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
