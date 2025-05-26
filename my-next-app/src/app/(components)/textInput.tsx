import React from "react";

type TextInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  name: string;
  placeholder?: string;
  type?: string;
};

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        placeholder={placeholder}
        className="flex items-center w-full bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 text-gray-600 text-sm"
      />
    </div>
  );
};

export default TextInput;
