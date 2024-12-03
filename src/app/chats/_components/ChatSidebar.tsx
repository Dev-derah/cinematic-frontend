import { FaRegPenToSquare } from "react-icons/fa6";
import { Prompt } from "@/lib/types/recommendations";
import { UserInfo } from "@/components/UserInfo";
import { Dropdown } from "@/components/Dropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  promptHistory: Prompt[];
  selectedPrompt: Prompt | null;
  onSelectPrompt: (prompt: Prompt) => void;
  onNewChat: () => void;
  isLoading: boolean;
}

export const ChatSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  promptHistory,
  selectedPrompt,
  onSelectPrompt,
  onNewChat,
  isLoading,
}) => {
  const router = useRouter()
  const {logout} = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };
      const handleNavigation = (route: string) => {
        router.push(route);
        setIsDropdownOpen(false);
      };
  return (
    <aside
      className={`fixed py-4 md:relative top-0 left-0 z-50 bg-background h-screen transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-3/5 md:w-1/5`}
    >
      <div className="px-4 h-[5vh] ">
        <button
          onClick={onNewChat}
          className="flex w-full justify-center items-center bg-red-50 p-2 rounded-lg gap-2 text-sm "
        >
          <FaRegPenToSquare className="text-2xl" />
          New Recommendation
        </button>
      </div>
      <div className="h-[75vh]">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          History
        </div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <div className="sidebar-content h-full py-4 overflow-auto">
            <div className="h-full">
              {promptHistory.length === 0 ? (
                <p className="p-4 text-gray-400">No Recommendations yet</p>
              ) : (
                promptHistory.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => onSelectPrompt(entry)}
                    className={`p-4 cursor-pointer text-sm lg:text-base capitalize truncate h-12 ${
                      selectedPrompt?.id === entry.id ? " bg-black-10" : ""
                    }`}
                  >
                    {entry.prompt}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-5 px-2 w-full">
        <Dropdown
          title={<UserInfo />}
          direction="top"
          isOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          items={[
            { label: "Logout", action: logout },
          ]}
        />
      </div>
    </aside>
  );
};
