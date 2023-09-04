import { useState } from "react";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter");

  const options = ["paid", "pending", "draft"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // You can add more logic here to filter based on the selected option
  };

  return (
    <div className="bg-backgroundDark relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-light-text-placeholder focus:border-none  focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-dark-text-placeholder"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option}
                className="block w-full px-4 py-2 text-sm font-semibold capitalize text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionClick(option)}
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
