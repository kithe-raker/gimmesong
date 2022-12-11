import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

function Dropdown({
  options,
  onOptionSelected = (_) => {},
  initialOption = "",
  className = "",
}) {
  const [currentOption, setCurrentOption] = useState(initialOption);

  const { isOpen, onToggle, onClose } = useDisclosure();

  const selectOption = (option) => {
    onOptionSelected(option);
    setCurrentOption(option);
    onClose();
  };

  return (
    <div className={`relative rounded-3xl ${className}`}>
      <button
        className="gimmesong-secondary-font flex w-full flex-row items-center justify-center rounded-3xl border border-black/[0.05] py-2 hover:bg-gray-100"
        onClick={onToggle}
      >
        <span className="mr-5 font-bold">{currentOption}</span>

        <svg
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.73205 8C5.96225 9.33333 4.03775 9.33333 3.26795 8L0.669873 3.5C-0.0999277 2.16667 0.862324 0.5 2.40192 0.5L7.59808 0.499999C9.13768 0.499999 10.0999 2.16667 9.33013 3.5L6.73205 8Z"
            fill="black"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 flex w-full flex-col divide-y divide-solid divide-black/[0.05] overflow-hidden rounded-3xl border border-black/[0.05]">
          {options.map((option) => (
            <div className="gimmesong-bg w-full">
              <button
                className="flex w-full flex-row items-center justify-center py-2 hover:bg-gray-100"
                onClick={() => selectOption(option)}
              >
                <span className="fond-bold">{option}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
