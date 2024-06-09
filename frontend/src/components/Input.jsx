import React from "react";

function Input({ label, name, type = "text", value, onChange,className,Placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-black font-bold mb-4 mt-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={Placeholder}
       className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      />
    </div>
  );
}

export default Input;