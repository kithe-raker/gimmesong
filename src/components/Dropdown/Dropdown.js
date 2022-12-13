import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

function Dropdown({
  options,
  onOptionSelected = (_) => {},
  initialOption = "",
  arrowColor = "black",
  className = "",
  contentClassName = "",
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
      <div
        className={`gimmesong-secondary-font absolute w-full overflow-hidden rounded-3xl ${contentClassName}`}
      >
        <button
          className="flex w-full flex-row items-center justify-between rounded-3xl py-2 hover:bg-gray-100"
          onClick={onToggle}
        >
          <span className="ml-3 font-bold">{currentOption}</span>
          {isOpen ? (
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M3.26795 1C4.03775 -0.333333 5.96225 -0.333333 6.73205 1L9.33013 5.5C10.0999 6.83334 9.13768 8.5 7.59807 8.5L2.40192 8.5C0.862322 8.5 -0.0999278 6.83333 0.669873 5.5L3.26795 1Z"
                fill={arrowColor}
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3"
            >
              <path
                d="M6.73205 8C5.96225 9.33333 4.03775 9.33333 3.26795 8L0.669873 3.5C-0.0999277 2.16667 0.862324 0.5 2.40192 0.5L7.59808 0.499999C9.13768 0.499999 10.0999 2.16667 9.33013 3.5L6.73205 8Z"
                fill={arrowColor}
              />
            </svg>
          )}
        </button>

        {
          isOpen &&
            // <div className="mt-2 flex w-full flex-col overflow-hidden rounded-3xl border border-black/[0.05]">
            options.map((option) => (
              <div className="gimmesong-bg w-full">
                <button
                  className="flex w-full flex-row items-center justify-start py-2 hover:bg-gray-100"
                  onClick={() => selectOption(option)}
                >
                  <span className="ml-3 font-bold text-black/[0.3]">
                    {option}
                  </span>
                </button>
              </div>
            ))
          // </div>
        }
      </div>
    </div>
  );
}

export default Dropdown;
