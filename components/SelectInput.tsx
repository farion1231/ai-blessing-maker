"use client";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectInput({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  className = "",
}: SelectInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-red-600 drop-shadow-sm"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="w-full px-3 py-2 border-2 border-yellow-400 rounded-xl text-sm transition-all duration-300 bg-gradient-to-r from-yellow-50 to-white shadow-md hover:shadow-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 appearance-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}