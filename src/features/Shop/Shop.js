import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

import disc from "@assets/img/disc.png";
import christmasTreeEmoji from "@assets/img/christmas_tree_emoji.png";
import confuseEmoji from "@assets/img/confuse_emoji.png";
import shushEmoji from "@assets/img/shushing_emoji.png";

import priceBackground from "./assets/price_bg.png";
import highlightedPriceBackground from "./assets/highlighted_price_bg.png";

function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedDisc, setSelectedDisc] = useState(-1);
  console.log(highlightedPriceBackground);

  // TODO: fetch this data from api instead of hard coding
  const discs = [
    {
      disc: disc,
      emoji: shushEmoji,
      description: "Shushy 1",
      price: 0,
      highlightPrice: true,
    },
    {
      disc: disc,
      emoji: christmasTreeEmoji,
      description: "Oak",
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: confuseEmoji,
      description: "Huh?",
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: shushEmoji,
      description: "Shushy 2",
      price: 0,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: christmasTreeEmoji,
      description: "Birch",
      price: 0.1,
      highlightPrice: false,
    },
    {
      disc: disc,
      emoji: confuseEmoji,
      description: "What?",
      price: 0.1,
      highlightPrice: true,
    },
  ];

  const selectDisc = (index) => {
    setSelectedDisc(index);
    onOpen();
  };

  return (
    <div className="gimmesong-secondary-font mx-auto flex min-h-screen max-w-md flex-col py-[60px] pt-[80px]">
      <div className="mx-3 flex flex-col">
        <span className="text-3xl font-extrabold">Shop (FREE!)</span>

        <div className="mt-7 grid grid-cols-2 gap-4 overflow-x-hidden">
          {discs.map((disc, i) => (
            <button key={i} onClick={() => selectDisc(i)}>
              <div className="flex flex-col rounded-3xl bg-white hover:bg-gray-100">
                <div className="my-0 flex flex-row justify-end py-0">
                  <div className="relative mr-5 w-[50px] cursor-pointer pt-10">
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={
                        disc.highlightPrice
                          ? highlightedPriceBackground
                          : priceBackground
                      }
                      alt="price"
                    />
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <span className="text-white">
                        {disc.price === 0 ? "Free" : disc.price + "$"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mx-4 mb-6 cursor-pointer pt-[80%]">
                  <img
                    className="absolute inset-0 h-full w-full select-none object-contain"
                    src={disc.disc}
                    alt="disc"
                  />
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                    <img
                      className="h-[27%] w-[27%] select-none rounded-full object-contain"
                      src={disc.emoji}
                      alt="thumbnail"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay height="100vh" />
        <ModalContent
          background="#F9F9F9"
          position="fixed"
          bottom="0px"
          mb="0"
          borderRadius="30px 30px 0px 0px"
          maxW="lg"
        >
          <ModalBody>
            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full flex-row justify-end">
                <button
                  onClick={onClose}
                  className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
                >
                  <svg
                    className="text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {selectedDisc >= 0 && (
                <>
                  <div className="relative mx-4 w-[40%] cursor-pointer pt-[45%]">
                    <img
                      className="absolute inset-0 h-full w-full select-none object-contain"
                      src={discs[selectedDisc].disc}
                      alt="disc"
                    />
                    <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                      <img
                        className="h-[27%] w-[27%] select-none rounded-full object-contain"
                        src={discs[selectedDisc].emoji}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    </div>
                  </div>

                  <span className="gimmesong-seconday-font font-medium">
                    {discs[selectedDisc].description}
                  </span>

                  <button className="mx-2 mt-12 w-full rounded-xl bg-white py-3 shadow-md hover:bg-gray-100">
                    <span
                      style={{
                        backgroundImage: `url(${highlightedPriceBackground})`,
                      }}
                      className={`bg-clip-text text-lg font-medium text-transparent`}
                    >
                      {discs[selectedDisc].price === 0
                        ? "GET FREE"
                        : "PURCHASE"}
                    </span>
                  </button>
                </>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Shop;
