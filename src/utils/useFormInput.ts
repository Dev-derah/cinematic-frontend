"use client"
import { useState } from "react";

interface UseFormInputOptions {
  validate: ((value: string) => string | null)[]; // Expect validators to return error messages or null
  initialValue?: string;
}

export const useFormInput = ({
  validate,
  initialValue = "",
}: UseFormInputOptions) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    // Loop through validation functions and set error if any fail
    for (const validationFn of validate) {
      const errorMessage = validationFn(newValue);
      if (errorMessage) {
        setError(errorMessage); // Set the specific error message
        return;
      }
    }

    setError(null); // Clear error if all validations pass
  };

  const handleBlur = () => {
    // Validate when user leaves input field (blur event)
    for (const validationFn of validate) {
      const errorMessage = validationFn(value);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
    }

    setError(null);
  };

  return {
    value,
    error,
    onChange: handleChange,
    onBlur: handleBlur,
    setValue
  };
};
