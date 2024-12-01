type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: string | null;
  value: string;
};

export const InputField = ({
  id,
  label,
  type,
  required = true,
  autoComplete,
  placeholder,
  onChange,
  onBlur,
  value,
  error,
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block text-sm/6 font-medium text-gray-300">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6 ${
          error ? "border-red-600" : "border-black-15"
        }`}
      />
      <div className="h-2">
        {error && <small className="text-red-600">{error}</small>}
      </div>
    </div>
  </div>
);
