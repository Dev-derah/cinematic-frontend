import { FaChevronDown } from "react-icons/fa";

interface DropdownItem {
  label: string; 
  action: () => void; 
}

interface DropdownProps {
  title: string; 
  isOpen: boolean; 
  toggleDropdown: () => void; 
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  isOpen,
  toggleDropdown,
  items,
}) => {
  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button
        className="text-2xl font-semibold flex items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        {title}
        <FaChevronDown
          className={`ml-2 text-lg transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-black-25 shadow-lg rounded-md text-white w-52 z-50">
          <ul className="py-2">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={item.action}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
