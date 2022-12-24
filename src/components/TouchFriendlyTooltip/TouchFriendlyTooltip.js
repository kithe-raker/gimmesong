import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";

/**
 * An icon which is a circle with letter i in the center. When a mouse is hovered over the component, it will show an tip message. (For mobile friendliness, it will also show when it is clicked)
 * @param {*} param0
 * @returns
 */
function TouchFriendlyTooltip({ label, placement = "bottom" }) {
  const [isLabelOpen, setIsLabelOpen] = useState(false);

  return (
    <Tooltip
      label="Receiver will see this disc when they receive their song."
      placement={placement}
      bg="black"
      isOpen={isLabelOpen}
    >
      <div
        onMouseEnter={() => setIsLabelOpen(true)}
        onMouseLeave={() => setIsLabelOpen(false)}
        onClick={() => setIsLabelOpen(true)}
        id="customize-your-disc-tooltip"
        className="ml-2 flex h-[16px] w-[16px] select-none items-center justify-center rounded-full bg-gray-900 text-[10px] text-white"
      >
        i
      </div>
    </Tooltip>
  );
}

export default TouchFriendlyTooltip;
