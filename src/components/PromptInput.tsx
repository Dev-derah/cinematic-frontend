"use client";
import React, { useRef, useState } from "react";
import { EditableField } from "./Inputs/EditableField";
import { IoIosSend } from "react-icons/io";
import ExamplePrompts from "./ExamplePrompts";
import { useFormInput } from "@/utils/hooks/useFormInput";
import { maxLength } from "@/utils/validators";
import axiosClient from "@/utils/axiosClient";
import { Prompt } from "@/lib/types/recommendations";
import { useModalWithResult } from "@/utils/recommendations/useModalWithResult";
import { useAuth } from "@/context/AuthContext";
import { Modal } from "@/components/Modal";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter,usePathname } from "next/navigation";
import Loading from "./Loading";

interface PromptInputProps {
  setPromptHistory?: React.Dispatch<React.SetStateAction<Prompt[]>>;
  setSelectedPrompt?: React.Dispatch<React.SetStateAction<Prompt | null>>;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  setPromptHistory,
  setSelectedPrompt,
}) => {
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth();
  const router = useRouter()
  const pathname = usePathname()
  const { isModalOpen, modalData, showModalWithResult, closeModal } =
    useModalWithResult();
  const formRef = useRef<HTMLFormElement | null>(null);
  const promptInput = useFormInput({
    validate: [maxLength(400)],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = promptInput.value.trim();
    if (trimmedPrompt === "") return;
    const tempPrompt: Prompt = {
      id: Date.now().toString(),
      prompt: trimmedPrompt,
      createdAt: new Date().toISOString(),
      movies: [],
    };

    setPromptHistory?.((prev) => [tempPrompt, ...prev]);

    try {
      setLoading(true);
      const response = await axiosClient.post("/api/recommendations/", {
        prompt: trimmedPrompt,
      });

      setPromptHistory?.((prev) =>
        prev.map((p) => (p.id === tempPrompt.id ? response.data : p))
      );
      setSelectedPrompt?.(response.data);

      if (!setPromptHistory && !setSelectedPrompt) {
        showModalWithResult(response.data);
      }
    } catch (error) {
      setPromptHistory?.((prev) => prev.filter((p) => p.id !== tempPrompt.id));
    } finally {
      promptInput.setValue("");
    }
  };

  const setPrompt = async (prompt: string) => {
    promptInput.setValue(prompt);
    const trimmedPrompt = prompt.trim();

    if (trimmedPrompt !== "") {
      const tempPrompt: Prompt = {
        id: Date.now().toString(),
        prompt: trimmedPrompt,
        createdAt: new Date().toISOString(),
        movies: [],
      };

      if (pathname === "/") {

      try {
        setLoading(true);
        const response = await axiosClient.post("/api/recommendations/", {
          prompt: trimmedPrompt,
        });
        showModalWithResult(response.data);
      } catch (error) {
        toast.error(`${error.response.data.error}`, {
          duration: 4000,
        });
      }finally{
        setLoading(false);
        promptInput.setValue("");
      }
    } else {
      setPromptHistory?.((prev) => [tempPrompt, ...prev]);

      try {
        setLoading(true);
        const response = await axiosClient.post("/api/recommendations/", {
          prompt: trimmedPrompt,
        });

        const updatedPrompt = response.data;

        setPromptHistory?.((prev) =>
          prev.map((p) => (p.id === tempPrompt.id ? updatedPrompt : p))
        );
        setSelectedPrompt?.(updatedPrompt);
      } catch (error) {
        setPromptHistory?.((prev) =>
          prev.filter((p) => p.id !== tempPrompt.id)
        );
        toast.error(`${error.response.data.error}`, {
          duration: 4000,
        });
      }finally{
        setLoading(false)
        promptInput.setValue("");

      }
    }
  };
}

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
            disabled={promptInput.value.trim() === "" || loading}
            className="disabled:opacity-50 transition-all"
          >
            {loading ? (
              <Loading LoadingType="Component Load" />
            ) : (
              <IoIosSend className="absolute rounded-xl right-4 bottom-3 text-4xl bg-red-50 text-black-15 2xl:bottom-4 2xl:w-14 2xl:h-14 2xl:p-3" />
            )}
          </button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Recommendation for :</h2>
        {modalData && (
          <div className="w-3/4 space-y-6">
            <h2 className=" font-bold">{modalData.prompt}</h2>
            <ul>
              {modalData.movies.map((movie) => (
                <div className="" key={movie.tmdb_id}>
                  <li key={movie?.tmdb_id} className="font-bold text-2xl my-2">
                    Title: {movie?.title}
                  </li>
                  <Image
                    src={movie?.poster_path}
                    height={200}
                    width={200}
                    alt={movie?.title}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </Modal>
      {/* {!loading && (
        <div className="flex justify-center ml-[20vw] bg-">
         
        </div>
      )} */}
      <ExamplePrompts setPrompt={setPrompt} />
    </>
  );
};
