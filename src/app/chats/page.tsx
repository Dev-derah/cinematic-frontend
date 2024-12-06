"use client";
import { useState, useEffect } from "react";
import { PromptInput } from "@/components/PromptInput";
import { ReactTyped } from "react-typed";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Prompt } from "@/lib/types/recommendations";
import { ChatSidebar } from "./_components/ChatSidebar";
import { Dropdown } from "@/components/Dropdown";
import { RecommendationList } from "./_components/RecommendationList";
import { useAuth } from "@/context/AuthContext";
import useFetchRecommendationsHistory from "@/utils/recommendations/useFetchRecommendationsHistory";

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { fetchRecommendationsHistory } = useFetchRecommendationsHistory();
  const [promptHistory, setPromptHistory] = useState<Prompt[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthLoading,logout } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    const getRecommendations = async () => {
      setIsLoading(true);
      try {
        const history = await fetchRecommendationsHistory();
        setPromptHistory(history);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendations();
  }, [isAuthLoading]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleNewChat = () => setSelectedPrompt(null);

  const handleNavigation = (route: string) => {
    router.push(route);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black-12 text-gray-50">
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 block md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        promptHistory={promptHistory}
        selectedPrompt={selectedPrompt}
        onSelectPrompt={setSelectedPrompt}
        onNewChat={handleNewChat}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <main
        className={`overflow-auto flex-1 mt-16 ${
          isSidebarOpen ? "ml-3/4" : "w-full"
        } transition-all duration-300`}
      >
        <header
          className={`fixed w-full top-0 p-4 shadow-md flex justify-between items-center transition-all duration-300 md:w-4/5`}
        >
          {/* Left Section - Recommendations Dropdown */}
          <div className="flex items-center">
            <Dropdown
              title="Recommendations"
              isOpen={isDropdownOpen}
              direction="bottom"
              toggleDropdown={toggleDropdown}
              items={[
                { label: "Movies", action: () => router.push("/movies") },
                { label: "TV Series", action: () => router.push("/tvshows") },
              ]}
            />
          </div>

          {/* Right Section - Profile Info */}
          <div className="flex items-center gap-4">
            <button className="block md:hidden" onClick={toggleSidebar}>
              <CiMenuKebab className="text-2xl" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-4">
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
              <RecommendationList recommendations={selectedPrompt.movies} />
            </div>
          ) : (
            <div className="h-[80vh] flex items-center flex-col justify-center">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">
                  <ReactTyped
                    className="text-base md:text-lg lg:text-2xl"
                    strings={[
                      "What movie are you in the mood for?",
                      "Looking for an inspiring true story?",
                      "How about a suspenseful crime thriller?",
                      "Craving an epic sci-fi adventure?",
                      "In the mood for a classic with a twist?",
                      "How about a comedy that will make you laugh out loud?",
                      "Searching for a movie with unforgettable characters?",
                      "What about a heartwarming romantic drama?",
                      "Looking for a horror film that will keep you up at night?",
                      "Want an action-packed blockbuster to pump you up?",
                    ]}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                  />
                </h1>
              </div>
              <PromptInput setPromptHistory={setPromptHistory} setSelectedPrompt={setSelectedPrompt} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
