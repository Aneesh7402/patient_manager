import React from "react";

type DateInputProps = {
  label: string;
  name: string; // ✅ Required for Formik
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function DateInput({
  label,
  name,
  value,
  onChange,
  placeholder = "Select date...",
}: DateInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name} // ✅ Set name
        value={value}
        onChange={onChange} 
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
