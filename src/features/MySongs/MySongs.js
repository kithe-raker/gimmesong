import { useState, useEffect } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import useSession from "@hooks/useSession";

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
import toast from "react-hot-toast";
import SelectPageLayout from "@components/SelectPageLayout";
import Dropdown from "@components/Dropdown";
import SelectTab, { ClubAndMySongsTabs } from "@components/SelectTab";

function MySongs() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentTab, setCurrentTab] = useState("all");
  const [pageLayout, setPageLayout] = useState("single");

  const { user } = useSession();
  const [value, copy] = useCopyToClipboard();

  // TODO: condition to render liked songs
  const [renderDirectSongs, setRenderDirectSongs] = useState(true);
  const [renderRequestSongs, setRenderRequestSongs] = useState(true);

  const options = ["All Songs", "Like", "Direct", "Request"];
  const [selectedOption, setSelectedOption] = useState(0);
  const selectOption = (index) => {
    // TODO: condition to render liked songs
    setRenderDirectSongs(index === 0 || index === 2);
    setRenderRequestSongs(index === 0 || index === 3);
    setSelectedOption(index);
  };

  const copyToClipboard = (val) => {
    copy(val);
    toast("Copied!", {
      style: {
        borderRadius: "25px",
        background: "#000",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (currentTab === "new") setPageLayout("single");
    else if (currentTab === "all") setPageLayout("multiple");
  }, [currentTab]);

  // Call VignetteBanner ads
  Ads.VignetteBanner();

  return (
    <>
      <SelectTab tabs={ClubAndMySongsTabs} />

      <div
        className={`relative mx-auto flex ${
          pageLayout === "single" ? "h-full" : "min-h-full"
        } max-w-[min(100vw,28rem)] flex-col items-center px-4`}
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

        <div className="gimmesong-bg sticky top-[108px] z-[49] flex w-full items-center justify-evenly pt-6">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row items-center justify-between rounded-2xl border-[0.5px] border-black/[0.1] bg-white py-3">
              <button
                onClick={() =>
                  copyToClipboard(`https://gimmesong.link/@${user.username}`)
                }
              >
                <div className="ml-3 flex flex-row items-center justify-between rounded-3xl bg-[#F2F2F2] py-1 px-2">
                  <span className="gimmesong-secondary-font mr-6 font-bold">
                    @{user.username}
                  </span>

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1354_327)">
                      <path
                        d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.16699 12.5013H3.33366C2.89163 12.5013 2.46771 12.3257 2.15515 12.0131C1.84259 11.7006 1.66699 11.2767 1.66699 10.8346V3.33464C1.66699 2.89261 1.84259 2.46868 2.15515 2.15612C2.46771 1.84356 2.89163 1.66797 3.33366 1.66797H10.8337C11.2757 1.66797 11.6996 1.84356 12.0122 2.15612C12.3247 2.46868 12.5003 2.89261 12.5003 3.33464V4.16797"
                        stroke="black"
                        strokeOpacity="0.2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1354_327">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </button>

              <div className="mr-3 flex flex-row items-center">
                <div className="flex flex-row items-center justify-between">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1354_332)">
                      <path
                        d="M8.5 15.9375C6.52745 15.9375 4.63569 15.1539 3.24089 13.7591C1.84609 12.3643 1.0625 10.4725 1.0625 8.5C1.0625 6.52745 1.84609 4.63569 3.24089 3.24089C4.63569 1.84609 6.52745 1.0625 8.5 1.0625C10.4725 1.0625 12.3643 1.84609 13.7591 3.24089C15.1539 4.63569 15.9375 6.52745 15.9375 8.5C15.9375 10.4725 15.1539 12.3643 13.7591 13.7591C12.3643 15.1539 10.4725 15.9375 8.5 15.9375ZM8.5 17C10.7543 17 12.9163 16.1045 14.5104 14.5104C16.1045 12.9163 17 10.7543 17 8.5C17 6.24566 16.1045 4.08365 14.5104 2.48959C12.9163 0.895533 10.7543 0 8.5 0C6.24566 0 4.08365 0.895533 2.48959 2.48959C0.895533 4.08365 0 6.24566 0 8.5C0 10.7543 0.895533 12.9163 2.48959 14.5104C4.08365 16.1045 6.24566 17 8.5 17Z"
                        fill="black"
                      />
                      <path
                        d="M10.625 8.5C10.625 9.06359 10.4011 9.60409 10.0026 10.0026C9.60409 10.4011 9.06359 10.625 8.5 10.625C7.93641 10.625 7.39591 10.4011 6.9974 10.0026C6.59888 9.60409 6.375 9.06359 6.375 8.5C6.375 7.93641 6.59888 7.39591 6.9974 6.9974C7.39591 6.59888 7.93641 6.375 8.5 6.375C9.06359 6.375 9.60409 6.59888 10.0026 6.9974C10.4011 7.39591 10.625 7.93641 10.625 8.5ZM8.5 4.25C7.37283 4.25 6.29183 4.69777 5.4948 5.4948C4.69777 6.29183 4.25 7.37283 4.25 8.5C4.25 8.6409 4.19403 8.77602 4.0944 8.87565C3.99477 8.97528 3.85965 9.03125 3.71875 9.03125C3.57785 9.03125 3.44273 8.97528 3.3431 8.87565C3.24347 8.77602 3.1875 8.6409 3.1875 8.5C3.1875 7.09104 3.74721 5.73978 4.7435 4.7435C5.73978 3.74721 7.09104 3.1875 8.5 3.1875C8.6409 3.1875 8.77602 3.24347 8.87565 3.3431C8.97528 3.44273 9.03125 3.57785 9.03125 3.71875C9.03125 3.85965 8.97528 3.99477 8.87565 4.0944C8.77602 4.19403 8.6409 4.25 8.5 4.25ZM13.2812 7.96875C13.4221 7.96875 13.5573 8.02472 13.6569 8.12435C13.7565 8.22398 13.8125 8.3591 13.8125 8.5C13.8125 9.90896 13.2528 11.2602 12.2565 12.2565C11.2602 13.2528 9.90896 13.8125 8.5 13.8125C8.3591 13.8125 8.22398 13.7565 8.12435 13.6569C8.02472 13.5573 7.96875 13.4221 7.96875 13.2812C7.96875 13.1404 8.02472 13.0052 8.12435 12.9056C8.22398 12.806 8.3591 12.75 8.5 12.75C9.62717 12.75 10.7082 12.3022 11.5052 11.5052C12.3022 10.7082 12.75 9.62717 12.75 8.5C12.75 8.3591 12.806 8.22398 12.9056 8.12435C13.0052 8.02472 13.1404 7.96875 13.2812 7.96875Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1354_332">
                        <rect width="17" height="17" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  {/* TODO: fetch number of songs here (or do we already did this?) */}
                  <span className="gimmesong-secondary-font ml-1 font-bold">
                    123
                  </span>
                </div>

                <div className="ml-3 flex flex-row items-center">
                  <svg
                    width="19"
                    height="17"
                    viewBox="0 0 19 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4979 2.65103C16.0935 2.24649 15.6134 1.92558 15.085 1.70664C14.5566 1.48769 13.9902 1.375 13.4183 1.375C12.8463 1.375 12.2799 1.48769 11.7515 1.70664C11.2231 1.92558 10.743 2.24649 10.3387 2.65103L9.49953 3.4902L8.66036 2.65103C7.8436 1.83427 6.73584 1.37542 5.58077 1.37542C4.42571 1.37542 3.31795 1.83427 2.50119 2.65103C1.68443 3.46779 1.22559 4.57554 1.22559 5.73061C1.22559 6.88568 1.68443 7.99344 2.50119 8.8102L3.34036 9.64936L9.49953 15.8085L15.6587 9.64936L16.4979 8.8102C16.9024 8.40585 17.2233 7.92576 17.4423 7.39735C17.6612 6.86895 17.7739 6.30258 17.7739 5.73061C17.7739 5.15864 17.6612 4.59228 17.4423 4.06387C17.2233 3.53547 16.9024 3.05538 16.4979 2.65103V2.65103Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* TODO: fetch number of likes here */}
                  <span className="gimmesong-secondary-font ml-1 font-bold">
                    123
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-row justify-between pb-14">
              <Dropdown
                className="inset-0 w-36"
                contentClassName="bg-white"
                hideSelectedOption
                arrow
                selectedOption={selectedOption}
                onOptionSelected={selectOption}
                options={options}
              />

              <SelectPageLayout
                pageLayout={pageLayout}
                setPageLayout={setPageLayout}
              />
            </div>
          </div>
          {/* <div className="flex items-center">
          <h1
            onClick={() => setCurrentTab("new")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "new" && "text-gray-900"
            }`}
          >
            NEW
          </h1>
          <span className="mx-4 h-5 w-[1px] bg-gray-400"></span>
          <h1
            onClick={() => setCurrentTab("all")}
            className={`gimmesong-primary-font cursor-pointer select-none text-4xl text-gray-400 ${
              currentTab === "all" && "text-gray-900"
            }`}
          >
            ALL
          </h1>
        </div>
        <div className="ml-4 inline-flex rounded-full" role="group">
          <button
            type="button"
            onClick={() => setPageLayout("single")}
            className={`rounded-l-xl ${
              pageLayout === "single"
                ? "bg-black text-white"
                : "bg-white text-black"
            } h-[10] min-w-[56px] py-2 px-4 text-sm font-medium`}
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="13"
                viewBox="0 0 23 13"
                fill="none"
              >
                <rect
                  x="5"
                  width="13"
                  height="13"
                  rx="6.5"
                  fill="currentColor"
                />
                <path
                  d="M0 4H0.5C1.88071 4 3 5.11929 3 6.5C3 7.88071 1.88071 9 0.5 9H0V4Z"
                  fill="currentColor"
                />
                <path
                  d="M23 9H22.5C21.1193 9 20 7.88071 20 6.5C20 5.11929 21.1193 4 22.5 4H23V9Z"
                  fill="currentColor"
                />
              </svg>
              <span className="gimmesong-secondary-font ml-2 text-sm">
                Full
              </span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPageLayout("multiple")}
            className={`rounded-r-xl ${
              pageLayout === "multiple"
                ? "bg-black text-white"
                : "bg-white text-black"
            } h-10 min-w-[56px] py-2 px-4 text-sm font-medium`}
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
              >
                <rect width="3" height="3" rx="1.5" fill="currentColor" />
                <rect y="6" width="3" height="3" rx="1.5" fill="currentColor" />
                <rect
                  y="12"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect x="6" width="3" height="3" rx="1.5" fill="currentColor" />
                <rect
                  x="6"
                  y="6"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="12"
                  width="3"
                  height="3"
                  rx="1.5"
                  fill="currentColor"
                />
              </svg>
              <span className="gimmesong-secondary-font ml-2 text-sm">
                Grid
              </span>
            </div>
          </button>
        </div> */}
        </div>
        <ReceivedSongs
          tab={currentTab}
          layout={pageLayout}
          onLayoutChange={setPageLayout}
          renderDirectSongs={renderDirectSongs}
          renderRequestSongs={renderRequestSongs}
        />
      </div>
    </>
  );
}

export default MySongs;
