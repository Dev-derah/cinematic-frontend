"use client";
import React from "react";
import { CustomButton } from "./CustomButton";

interface ExamplePromptProps{
  setPrompt:(prompt:string)=> void;
}
export default function ExamplePrompts({ setPrompt }: ExamplePromptProps) {
  const prompts = [
    "What are some must-watch action thrillers for this weekend?",
    "I'm in the mood for a feel-good comedy—any suggestions?",
    "Can you recommend a movie with an unexpected twist?",
    "What's a great family-friendly movie everyone will enjoy?",
  ];
  return (
    <div className="mt-6 w-full md:mt-12">
      <div className="flex flex-col gap-2 md:gap-4 md:grid md:grid-cols-2">
        {prompts.map((prompt, index) => (
          <CustomButton
            key={index}
            className={
              "border border-gray-500 bg-black text-xs py-3 px-4 rounded hover:bg-gray-700 md:text-sm 2xl:py-5"
            }
            label={prompt}
            onclickFunction={()=>setPrompt(prompt)}
          />
        ))}
      </div>
    </div>
  );
}
