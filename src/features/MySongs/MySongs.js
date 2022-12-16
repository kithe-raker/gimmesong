import { useState, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";

import ReceivedSongs from "./components/ReceivedSongs";

import {
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

import Ads from "@lib/ads";
import Top from "./components/Top";

function MySongs() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentTab, setCurrentTab] = useState("all");
  const [pageLayout, setPageLayout] = useState("single");

  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    if (currentTab === "new") setPageLayout("single");
    else if (currentTab === "all") setPageLayout("multiple");
  }, [currentTab]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  return (
    <div
      className={`relative mx-auto flex ${
        pageLayout === "single" ? "h-full" : "min-h-full"
      } max-w-[min(100vw,28rem)] flex-col items-center py-6 pt-[30px]`}
    >
      {/* <button
        className="flex items-center rounded-full bg-gray-100 px-2 py-2"
        onClick={() =>
          copyToClipboard(`https://gimmesong.link/@${user.username}`)
        }
      >
        <div className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </div>
        <span className="gimmesong-secondary-foont ml-1 text-xs">@bosoji</span>
      </button> */}
      <Top
        pageLayout={pageLayout}
        setPageLayout={setPageLayout}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <ReceivedSongs
        tab={currentTab}
        layout={pageLayout}
        onLayoutChange={setPageLayout}
      />
    </div>
  );
}

export default MySongs;
