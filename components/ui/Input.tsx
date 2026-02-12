interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  label,
  id,
  className = '',
  onKeyPress,
}: InputProps) {
  const inputId = id || `input-${type}`;
  
  const baseClasses = 'w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm placeholder:text-gray-400';
  
  return (
    <div className={className}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        className={baseClasses}
      />
    </div>
  );
}
