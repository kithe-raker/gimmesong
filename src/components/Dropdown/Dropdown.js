import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
/**
 * A custom dropdown component. 
 *  <p> (1) Note that it is very important to specify the width of the dropdown (using className). </p>
 *  <p> (1) Note that the user of this component is expected to maintain the selectedOption state themselves, meaning that nothing will happens when an option is selected, unless user update the selectedOption props passed to this component when onOptionSelected callback is called. </p>
 * @param options the available options for dropdown. It can be in shape of ["value1", "value2", "value3", ...] in which the dropdown will render each option in a text button and when a value changes, the callback function will be passed the option value,
 * or [{value: "value1", component: \<span>text1\</span>}, {value: "value2", component: \<span>text2\</span>}, ...] the dropdown will render each option's component and when a value changes, the callback function will be passed the option.value.
 * @param selectedOption the index of an option that will be shown when this dropdown is hiding its options.
 * @param onOptionSelected a function that takes the selected option index and get called whenever an option is selected. The user of this component should update the selected option as this component does not do it automatically.
 * @param arrow whether or not the dropdown will render the arrow in opener button.
 * @param arrowColor the color of the dropdown's arrow.
 * @param hideSelectedOption whether or not the dropdown will hide the button of the currently selected option when the dropdown is opened.
 * @param className the class name to be added to this dropdown.
 * @param contentClassName the class name to be added to the component that renders the full dropdown.
 * @param buttonClassName the class name to be added to every button in this dropdown.
 */
function Dropdown({
  options,
  onOptionSelected = (_) => {},
  selectedOption = 0,
  arrow = false,
  arrowColor = "black",
  hideSelectedOption = false,
  className = "",
  contentClassName = "",
  buttonClassName = "",
}) {
  // const [currentOption, setCurrentOption] = useState(initialOption);

  const { isOpen, onToggle, onClose } = useDisclosure();

  const selectOption = (index) => {
    onOptionSelected(index);
    // setCurrentOption(index);
    onClose();
  };

  return (
    <div className={`relative rounded-3xl ${className}`}>
      <div
        className={`gimmesong-secondary-font absolute w-full overflow-hidden rounded-3xl ${contentClassName}`}
      >
        <button
          className={`flex w-full flex-row items-center justify-between rounded-3xl py-2 ${buttonClassName}`}
          onClick={onToggle}
        >
          {options[selectedOption].component || (
            <span className="ml-3 font-bold">{options[selectedOption]}</span>
          )}
          {arrow &&
            (isOpen ? (
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
            ))}
        </button>

        {
          isOpen &&
            // <div className="mt-2 flex w-full flex-col overflow-hidden rounded-3xl border border-black/[0.05]">
            options.map((option, i) =>
              hideSelectedOption && selectedOption === i ? (
                <></>
              ) : (
                <button
                  className={`flex w-full flex-row items-center justify-start py-2 ${buttonClassName}`}
                  onClick={() => selectOption(i)}
                >
                  {option.component || (
                    <span className="ml-3 font-bold text-black/[0.3]">
                      {option}
                    </span>
                  )}
                </button>
              )
            )
          // </div>
        }
      </div>
    </div>
  );
}

export default Dropdown;
