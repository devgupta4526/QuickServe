import React from 'react';
import type { IconType } from 'react-icons';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: IconType;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  icon: Icon,
}) => (
  <div className="w-full">
    <label htmlFor={name} className="block mb-1 text-sm font-semibold text-gray-600">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-orange-500" />}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full py-2.5 px-4 ${
          Icon ? 'pl-10' : ''
        } border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none`}
      />
    </div>
  </div>
);

export default TextInput;
