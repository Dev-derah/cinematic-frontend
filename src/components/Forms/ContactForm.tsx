"use client";
import React from "react";
import TextInput from "@/components/Inputs/TextInput";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { EditableField } from "../Inputs/EditableField";
import {
  isNotEmpty,
  isEmail,
  minLength,
  isPhoneNumber,
  maxLength,
} from "@/utils/validators";
import { useFormInput } from "@/utils/hooks/useFormInput";

const ContactForm: React.FC = () => {
  const firstNameInput = useFormInput({
    validate: [isNotEmpty("firstname"), minLength(2)],
  });

  const lastNameInput = useFormInput({
    validate: [isNotEmpty("lastname"), minLength(2)],
  });

  const emailInput = useFormInput({
    validate: [isNotEmpty("email"), isEmail],
  });

  const phoneNumberInput = useFormInput({
    validate: [isNotEmpty("phone number"), isPhoneNumber],
    initialValue: "",
  });

  const messageInput = useFormInput({
    validate: [isNotEmpty("message"), maxLength(600)],
  });

  const handlePhoneChange = (newValue: string | undefined) => {
    if (newValue) {
      phoneNumberInput.onChange(newValue);
    } else {
      phoneNumberInput.onChange("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Access the form values here
    console.log({
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneNumberInput,
      messageInput,
    });
  };

  return (
    <div className="p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto mt-10 h-full md:w-4/5">
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <TextInput
            label="First Name"
            placeholder="Enter First Name"
            value={firstNameInput.value}
            error={firstNameInput.error}
            onChange={(e) => firstNameInput.onChange(e.target.value)}
            onBlur={firstNameInput.onBlur}
          />
          <TextInput
            label="Last Name"
            placeholder="Enter Last Name"
            value={lastNameInput.value}
            error={lastNameInput.error}
            onChange={(e) => lastNameInput.onChange(e.target.value)}
            onBlur={lastNameInput.onBlur}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <TextInput
            label="Email"
            placeholder="Enter your Email"
            value={emailInput.value}
            error={emailInput.error}
            onChange={(e) => emailInput.onChange(e.target.value)}
            onBlur={emailInput.onBlur}
            type="email"
          />
          <div className="flex flex-col">
            <label className="text-white mb-2">Phone Number</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumberInput.value}
              onChange={handlePhoneChange}
              onBlur={phoneNumberInput.onBlur}
              defaultCountry="AF"
              international={true}
              countryCallingCodeEditable={false}
              countrySelectProps={{ unicodeFlags: true }}
              className={`phone-input custom-phone-input text-gray-300 bg-black-08 border px-3 py-0 rounded-md ${
                phoneNumberInput.error ? "border-red-600" : "border-black-15"
              }`}
            />
            {phoneNumberInput.error && (
              <small className="text-red-600 text-sm">
                {phoneNumberInput.error}
              </small>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-white">Message</label>
          <EditableField
            value={messageInput.value}
            classes="overflow-scroll border bg-black-08 border border-black-15 rounded-md text-gray-300 outline-none h-40 no-scrollbar empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 caret-red-50 p-2"
            placeholder="Enter your Message"
            onChange={messageInput.onChange}
            onBlur={messageInput.onBlur}
            error={messageInput.error}
          />
          {messageInput.error && (
            <p className="text-red-600 text-sm">{messageInput.error}</p>
          )}
        </div>

        <div className="flex-col flex justify-end items-center space-y-4 md:flex-row">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-500 lg:w-40"
            disabled={
              !!firstNameInput.error ||
              !!lastNameInput.error ||
              !!emailInput.error ||
              !!phoneNumberInput.error ||
              !!messageInput.error
            }
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
