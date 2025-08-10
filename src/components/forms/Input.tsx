import React from "react";
import "./Input.css";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  label,
  type,
  value,
  onChange,
  name,
  placeholder,
  required = false,
}: InputProps) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
