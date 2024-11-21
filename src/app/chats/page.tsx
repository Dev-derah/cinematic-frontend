"use client";

import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import Image from "next/image";
import { FaRegPenToSquare } from "react-icons/fa6";

// Define the interface for recommendations
interface MovieRecommendation {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tmdbId: string;
}

interface Prompt {
  id: string;
  prompt: string;
  recommendations: MovieRecommendation[]; // Added recommendations
}

export default function Chat() {
  const [promptHistory, setPromptHistory] = useState<Prompt[]>([
    {
      id: "1",
      prompt: "Recommend a thriller movie",
      recommendations: [
        {
          id: 1,
          title: "Thriller Movie 1",
          description: "A thrilling action-packed movie.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg",
          tmdbId: "1",
        },
        {
          id: 2,
          title: "Thriller Movie 2",
          description: "A gripping psychological thriller.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg",
          tmdbId: "2",
        },
      ],
    },
    {
      id: "2",
      prompt: "Suggest a movie with an unexpected ending",
      recommendations: [
        {
          id: 3,
          title: "Unexpected Ending Movie 1",
          description: "A movie with a mind-blowing twist.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/8ah5ZT1Cjsq4T2A5rTp1Uxu9EDk.jpg",
          tmdbId: "3",
        },
      ],
    },
  ]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handlePromptSubmit = (newPrompt: string) => {
    const newEntry: Prompt = {
      id: (promptHistory.length + 1).toString(),
      prompt: newPrompt,
      recommendations: [], // Empty recommendations for now
    };
    setPromptHistory((prev) => [...prev, newEntry]);
    setSelectedPrompt(newEntry);
  };

  return (
    <div className="flex h-screen bg-black-12 text-gray-50 space-y-4">
      {/* Sidebar */}
      <aside className="w-1/5 bg-background text-white flex flex-col box gap-4 py-10 overflow-y-scroll-scroll">
        <div className="px-4">
          <button className="flex w-full justify-center items-center bg-red-50 py-2 rounded-lg gap-2">
            <span>
              <FaRegPenToSquare className="text-2xl" />
            </span>
            New chat
          </button>
        </div>

        <div>
          <div className="p-4 text-2xl font-bold border-b border-gray-700">
            History
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {promptHistory.length === 0 ? (
              <p className="p-4 text-gray-400">No prompts yet</p>
            ) : (
              promptHistory.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => handlePromptSelect(entry)}
                  className={`p-4 cursor-pointer ${
                    selectedPrompt?.id === entry.id ? " bg-black-10" : ""
                  }`}
                >
                  {entry.prompt}
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="p-4 shadow-md">
          <h1 className="text-2xl font-semibold">Movie Recommendations</h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto relative">
          {selectedPrompt ? (
            <div className="px-10">
              {/* User Prompt */}
              <div className="bg-black-25 shadow-md p-4 rounded-2xl rounded-tr-none max-w-lg ml-auto mb-4">
                <h2 className="text-lg font-semibold mb-4">
                  {selectedPrompt.prompt}
                </h2>
              </div>

              {/* Recommendations Header */}
              <h3 className="text-xl font-bold mb-6">
                Here are some recommendations for &quot;{selectedPrompt.prompt}
                &quot;:
              </h3>

              {/* Recommendations */}
              <div className="space-y-6">
                {selectedPrompt.recommendations.length === 0 ? (
                  <p>No recommendations available</p>
                ) : (
                  selectedPrompt.recommendations.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex flex-col md:flex-row items-start bg-black-10 p-4 rounded-lg shadow-md gap-4"
                    >
                      {/* Movie Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={movie.imageUrl}
                          alt={movie.title}
                          className="w-24 h-36 rounded-lg object-cover"
                          height={500}
                          width={200}
                        />
                      </div>
                      {/* Movie Details */}
                      <div>
                        <h4 className="text-lg font-semibold">{movie.title}</h4>
                        <p className="text-sm text-gray-400">
                          {movie.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div>
              <PromptInput />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
