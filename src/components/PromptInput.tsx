"use client"
import React,{useRef} from 'react'
import { EditableField } from './Inputs/EditableField';
import { IoIosSend } from 'react-icons/io';
import ExamplePrompts from './ExamplePrompts';
import { useFormInput } from '@/utils/useFormInput';
import { maxLength } from '@/utils/validators';


export const PromptInput = () => {
const formRef = useRef<HTMLFormElement | null>(null);

const promptInput = useFormInput({
  validate:[maxLength(400)]
})


const handleFormSubmit = () => {
  if (formRef.current) {
    formRef.current.requestSubmit(); 
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted with prompt:", promptInput.value);
};

const setPrompt = (prompt: string) => {
  promptInput.setValue(prompt);
  handleFormSubmit();
};
  return (
    <>
      <div className="relative h-fit w-full rounded-3xl flex bg-black-15 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full"
          ref={formRef}
        >
          <EditableField
            value={promptInput.value}
            autoFocus={true}
            placeholder="What kind of movie are you in the mood for today? Type a genre, mood, or keyword..."
            classes="empty:before:text-xs text-gray-30 w-[87%] h-20 focus:outline-none max-h-24 overflow-y-scroll no-scrollbar empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 caret-red-50 md:empty:before:text-sm  md:min-h-4 md:w-[90%] lg:w-[94%] 2xl:text-xl"
            onChange={promptInput.onChange}
            onBlur={promptInput.onBlur}
            error={promptInput.error}
          />
          <button
            type="submit"
            disabled={promptInput.value === ""}
            className="disabled:opacity-50 transition-all "
          >
            <IoIosSend
              className={` absolute rounded-xl right-4 bottom-3 text-4xl bg-red-50 text-black-15 2xl:bottom-4 2xl:w-14 2xl:h-14 2xl:p-3 `}
            />
          </button>
        </form>
      </div>
      <ExamplePrompts setPrompt={setPrompt} />
    </>
  );
}
