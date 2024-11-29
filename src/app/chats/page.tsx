"use client";
import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { ReactTyped } from "react-typed";
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Prompt } from "@/lib/types/recommendations";
import { ChatSidebar } from "./_components/ChatSidebar";
import { Dropdown } from "@/components/Dropdown";
import { RecommendationList } from "./_components/RecommendationList";
import { UserInfo } from "@/components/UserInfo";

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [promptHistory, setPromptHistory] = useState<Prompt[]>([
    {
      id: "1",
      prompt: "Recommend a thriller movie",
      recommendations: [
        {
          id: 1,
          title: "Thriller Movie 1",
          description: "A suspenseful thriller with unexpected twists.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg",
          tmdbId: "1",
        },
        {
          id: 2,
          title: "Thriller Movie 2",
          description: "An action-packed thriller that keeps you on edge.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg",
          tmdbId: "2",
        },
        {
          id: 4,
          title: "Empowered Heroine",
          description: "A tale of strength, courage, and resilience.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/bn7ovcrEXsGmyAz8ITstjN0QIk.jpg",
          tmdbId: "4",
        },
        {
          id: 5,
          title: "Leading Lady",
          description: "A journey of a woman defying all odds.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/d4Ej7sStjK8e0UOOGS3VzWDDM3.jpg",
          tmdbId: "5",
        },
        {
          id: 16,
          title: "Fantasy Quest",
          description: "An epic journey in a magical realm.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/1sVXOKhQ8FwRF83ChcNdEBj7uMb.jpg",
          tmdbId: "16",
        },
        {
          id: 17,
          title: "Mystic Land",
          description: "A thrilling adventure filled with fantasy creatures.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/4We7Eym7FaDiNlSdqkfqUPtQwZv.jpg",
          tmdbId: "17",
        },
      ],
    },
    {
      id: "2",
      prompt: "Suggest a romantic comedy",
      recommendations: [
        {
          id: 3,
          title: "Rom-Com Delight",
          description: "A heartwarming love story with hilarious moments.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/ht8Uv9QPv9y7K0RvUyJIaXOZTfd.jpg",
          tmdbId: "3",
        },
      ],
    },
    {
      id: "3",
      prompt: "Movies with strong female leads",
      recommendations: [
        {
          id: 4,
          title: "Empowered Heroine",
          description: "A tale of strength, courage, and resilience.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/bn7ovcrEXsGmyAz8ITstjN0QIk.jpg",
          tmdbId: "4",
        },
        {
          id: 5,
          title: "Leading Lady",
          description: "A journey of a woman defying all odds.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/d4Ej7sStjK8e0UOOGS3VzWDDM3.jpg",
          tmdbId: "5",
        },
      ],
    },
    {
      id: "4",
      prompt: "Sci-fi movies with stunning visuals",
      recommendations: [
        {
          id: 6,
          title: "Galactic Odyssey",
          description: "A visually breathtaking journey through space.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/djkls9aOiwpUtrJGZqLfkd4PwCq.jpg",
          tmdbId: "6",
        },
      ],
    },
    {
      id: "5",
      prompt: "Comedy movies for the whole family",
      recommendations: [
        {
          id: 7,
          title: "Family Laughter",
          description: "A feel-good comedy for all ages.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/8sq6GvU5tyHLTkGsIopIqEvJPFa.jpg",
          tmdbId: "7",
        },
        {
          id: 8,
          title: "The Fun Bunch",
          description: "Hilarious adventures for the whole family.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/c7tjGpUCLFO84khbL85DhSaGeNm.jpg",
          tmdbId: "8",
        },
        {
          id: 9,
          title: "Laughter Unlimited",
          description: "Non-stop laughs for a perfect family evening.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/h6PcMKbtxAzGcScFv8DJfxQjs8a.jpg",
          tmdbId: "9",
        },
      ],
    },
    {
      id: "6",
      prompt: "Recommend a movie with a shocking twist ending",
      recommendations: [
        {
          id: 10,
          title: "Twist Surprise",
          description: "An unforgettable movie with a jaw-dropping twist.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/1xdqV4tyURDKMuYGddAk3Bb5CWG.jpg",
          tmdbId: "10",
        },
        {
          id: 11,
          title: "Plot Turn",
          description: "An edge-of-your-seat thriller with an epic twist.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/9UsFsdVrGwr0E6F41OkFwSOQAYB.jpg",
          tmdbId: "11",
        },
      ],
    },
    {
      id: "7",
      prompt: "Animated movies with beautiful storytelling",
      recommendations: [
        {
          id: 12,
          title: "Animated Tale",
          description:
            "A moving story brought to life with stunning animation.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/kf4UJpJsSkVvlssFqTTyRtCUM5O.jpg",
          tmdbId: "12",
        },
        {
          id: 13,
          title: "Visual Dreams",
          description: "A heartwarming story for dreamers of all ages.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/lj3sz20czUZwd8fF3kNTUL6WtmJ.jpg",
          tmdbId: "13",
        },
      ],
    },
    {
      id: "8",
      prompt: "Recommend a biographical drama",
      recommendations: [
        {
          id: 14,
          title: "Life Story",
          description: "A compelling drama based on true events.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/8cy2EROnEPmUoDeJpIM9Oj8cd5X.jpg",
          tmdbId: "14",
        },
      ],
    },
    {
      id: "9",
      prompt: "Horror movies with supernatural elements",
      recommendations: [
        {
          id: 15,
          title: "Supernatural Haunt",
          description: "A chilling tale of ghostly encounters.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/k84Fd9IV9GZs9jBtP8WyJFI2q7U.jpg",
          tmdbId: "15",
        },
      ],
    },
    {
      id: "10",
      prompt: "Recommend a fantasy adventure",
      recommendations: [
        {
          id: 16,
          title: "Fantasy Quest",
          description: "An epic journey in a magical realm.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/1sVXOKhQ8FwRF83ChcNdEBj7uMb.jpg",
          tmdbId: "16",
        },
        {
          id: 17,
          title: "Mystic Land",
          description: "A thrilling adventure filled with fantasy creatures.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/4We7Eym7FaDiNlSdqkfqUPtQwZv.jpg",
          tmdbId: "17",
        },
      ],
    },
    {
      id: "11",
      prompt: "Movies with iconic villains",
      recommendations: [
        {
          id: 18,
          title: "Evil Icon",
          description: "A movie with a villain you’ll never forget.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/0XGn0D99cqFcFjUp90gRf4RYvQb.jpg",
          tmdbId: "18",
        },
        {
          id: 19,
          title: "Legendary Antagonist",
          description: "A gripping story centered around an iconic villain.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/n41RbODKk7Er8P57HclMcI8TxYJ.jpg",
          tmdbId: "19",
        },
      ],
    },
    {
      id: "12",
      prompt: "Recommend a classic black-and-white film",
      recommendations: [
        {
          id: 20,
          title: "Timeless Classic",
          description: "A cinematic masterpiece from the golden era.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/dF78tPEOnI2RbsV3eLHr4kFhsXY.jpg",
          tmdbId: "20",
        },
      ],
    },
    {
      id: "13",
      prompt: "Feel-good movies to watch on a rainy day",
      recommendations: [
        {
          id: 21,
          title: "Rainy Day Delight",
          description: "A cheerful movie to brighten your mood.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/jc6W1c6F1Qcy7LkkdFX0LXIBJoM.jpg",
          tmdbId: "21",
        },
        {
          id: 22,
          title: "Cozy Comfort",
          description: "A heartwarming film perfect for a rainy day.",
          imageUrl:
            "https://image.tmdb.org/t/p/w500/oUjTpFfpIwNiVubTVTuZos9GHbV.jpg",
          tmdbId: "22",
        },
      ],
    },
  ]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

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
              toggleDropdown={toggleDropdown}
              items={[
                { label: "Movies", action: () => router.push("/movies") },
                { label: "TV Series", action: () => router.push("/tvshows") },
              ]}
            />
          </div>

          {/* Right Section - Profile Info */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <UserInfo />
            </div>

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
              <RecommendationList
                recommendations={selectedPrompt.recommendations}
              />
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
              <PromptInput />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
