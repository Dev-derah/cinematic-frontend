"use client";
import React, { useEffect, useRef, useState } from "react";

interface EditableFieldProps {
  placeholder: string;
  classes: string;
  autoFocus?: boolean;
  onChange: (text: string) => void;
  onBlur: () => void;
  error: string | null;
  value: string; // Add a value prop
}

export const EditableField: React.FC<EditableFieldProps> = ({
  placeholder,
  classes,
  autoFocus = false,
  onChange,
  onBlur,
  value, // Receive value as prop
}) => {
  const [isEditing, setEditing] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Update the contentEditable field when value changes
  useEffect(() => {
    if (inputRef.current && value !== inputRef.current.textContent) {
      inputRef.current.textContent = value; // Set textContent directly
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      setEditing(true);
    }
  }, [autoFocus]);

  const handleInput = () => {
    if (inputRef.current && onChange) {
      const textContent = inputRef.current.textContent || "";
      onChange(textContent);
    }
  };

  return (
    <div
      ref={inputRef}
      className={`${classes} `}
      contentEditable={true}
      data-placeholder={placeholder}
      onFocus={() => setEditing(true)}
      onBlur={onBlur}
      onInput={handleInput}
    />
  );
};
