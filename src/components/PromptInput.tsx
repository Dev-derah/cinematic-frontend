"use client";
import React, { useRef } from "react";
import { EditableField } from "./Inputs/EditableField";
import { IoIosSend } from "react-icons/io";
import ExamplePrompts from "./ExamplePrompts";
import { useFormInput } from "@/utils/hooks/useFormInput";
import { maxLength } from "@/utils/validators";
import axiosClient from "@/utils/axiosClient";
import { Prompt } from "@/lib/types/recommendations";

interface PromptInputProps {
  setPromptHistory: React.Dispatch<React.SetStateAction<Prompt[]>>;
  setSelectedPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  setPromptHistory,
  setSelectedPrompt
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const promptInput = useFormInput({
    validate: [maxLength(400)],
  });

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPrompt = promptInput.value.trim();
    if (trimmedPrompt === "") return;

    const tempPrompt: Prompt = {
      id: Date.now().toString(), // Temporary ID
      prompt: trimmedPrompt,
      createdAt: new Date().toISOString(),
      movies:[]
    };

    setPromptHistory((prev) => [tempPrompt, ...prev]);

    try {
      const response = await axiosClient.post("/api/recommendations/", {
        prompt: trimmedPrompt,
      });

      setPromptHistory((prev) =>
        prev.map((p) => (p.id === tempPrompt.id ? response.data : p))
      );
      setSelectedPrompt(response.data)

    } catch (error) {
      console.error("Error fetching recommendations:", error);

      // Remove temporary prompt on failure
      setPromptHistory((prev) => prev.filter((p) => p.id !== tempPrompt.id));
    } finally {
      promptInput.setValue(""); 
    }
  };

  const setPrompt = (prompt: string) => {
    promptInput.setValue(prompt);
    handleFormSubmit();
  };

  return (
    <>
      <div className="relative h-fit w-full rounded-3xl flex bg-black-15 p-4">
        <form onSubmit={handleSubmit} className="w-full h-full" ref={formRef}>
          <EditableField
            value={promptInput.value}
            autoFocus={true}
            placeholder="What kind of movie are you in the mood for today? Type a genre, mood, or keyword..."
            classes="empty:before:text-xs text-gray-30 w-[87%] h-20 focus:outline-none max-h-24 overflow-y-scroll no-scrollbar empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 caret-red-50 md:empty:before:text-sm md:min-h-4 md:w-[90%] lg:w-[94%] 2xl:text-xl"
            onChange={promptInput.onChange}
            onBlur={promptInput.onBlur}
            error={promptInput.error}
          />
          <button
            type="submit"
            disabled={promptInput.value.trim() === ""}
            className="disabled:opacity-50 transition-all"
          >
            <IoIosSend className="absolute rounded-xl right-4 bottom-3 text-4xl bg-red-50 text-black-15 2xl:bottom-4 2xl:w-14 2xl:h-14 2xl:p-3" />
          </button>
        </form>
      </div>
      <ExamplePrompts setPrompt={setPrompt} />
    </>
  );
};
