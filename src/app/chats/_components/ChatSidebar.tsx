import { FaRegPenToSquare } from "react-icons/fa6";
import { Prompt } from "@/lib/types/recommendations";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  promptHistory: Prompt[];
  selectedPrompt: Prompt | null;
  onSelectPrompt: (prompt: Prompt) => void;
  onNewChat: () => void;
}

export const ChatSidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  promptHistory,
  selectedPrompt,
  onSelectPrompt,
  onNewChat,
}) => {
  return (
    <aside
      className={`fixed py-4 overflow-auto md:relative top-0 left-0 z-50 bg-background h-full transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 w-3/5 md:w-1/5`}
    >
      <div className="px-4">
        <button
          onClick={onNewChat}
          className="flex w-full justify-center items-center bg-red-50 p-2 rounded-lg gap-2 text-sm "
        >
          <FaRegPenToSquare className="text-2xl" />
          New Recommendation
        </button>
      </div>
      <div>
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          History
        </div>
        <div className="sidebar-content py-2">
          {promptHistory.length === 0 ? (
            <p className="p-4 text-gray-400">No prompts yet</p>
          ) : (
            promptHistory.map((entry) => (
              <div
                key={entry.id}
                onClick={() => onSelectPrompt(entry)}
                className={`p-4 cursor-pointer text-sm lg:text-base ${
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
  );
};
