import { useRef } from "react";

import { useSteps } from "@hooks/useSteps";
import { useDisclosure } from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import First from "../assets/ShareRequest/1.png";
import Second from "../assets/ShareRequest/2.png";
import Third from "../assets/ShareRequest/3.png";
import Forth from "../assets/ShareRequest/4.png";

function ShareRequest() {
  const { activeStep, setStep, backStep, nextStep } = useSteps({
    totalSteps: 4,
  });

  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const onCloseExportModal = () => {
    onClose();
    setStep(1);
  };

  return (
    <>
      <button
        className="mt-3 w-full rounded-full border px-8 py-4 text-center font-semibold shadow-md"
        onClick={onOpen}
      >
        How to share your own request?
      </button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onCloseExportModal}
        isOpen={isOpen}
        isCentered
        size="md"
        scrollBehavior="outside"
      >
        <AlertDialogOverlay />

        <AlertDialogContent borderRadius={25} marginX={4}>
          <AlertDialogHeader>How to share your own request?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="mt-3 flex flex-col items-center">
                <img className=" rounded-3xl" src={First} alt="step1" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    1
                  </div>
                  Click
                  <svg
                    className={`mx-2 inline`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 17 17"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    style={{ transform: "rotate(-10deg)" }}
                  >
                    <g clipPath="url(#clip0_469_826)">
                      <path
                        d="M13.846 1.60059C13.4967 1.60059 13.1632 1.72215 12.8515 1.94045L12.8495 1.93765C8.66654 4.97628 4.79095 5.20539 2.92835 5.31549L2.77875 5.32447C1.7337 5.38739 0.783153 6.06815 0.298173 7.10072C-0.0950119 7.93786 -0.0996396 8.94837 0.286051 9.80412C0.787298 10.9161 1.74683 11.5908 2.80216 11.5922C2.94552 11.591 3.11619 11.594 3.29888 11.5996C3.0934 13.0154 3.93171 14.4657 5.38434 15.095C5.85091 15.2972 6.34286 15.399 6.83033 15.399C7.21057 15.399 7.58811 15.3371 7.94876 15.2127C8.78275 14.9252 9.42746 14.3389 9.76404 13.5622C9.81139 13.453 9.84941 13.3403 9.88308 13.2265C10.8459 13.6783 11.8446 14.2483 12.8495 14.9783L12.8515 14.9755C13.1633 15.1938 13.4967 15.3153 13.8461 15.3153C15.6147 15.3153 17.0001 12.3033 17.0001 8.45807C17.0001 4.61283 15.6146 1.60059 13.846 1.60059ZM9.14009 13.2916C8.88025 13.8912 8.37848 14.3451 7.72697 14.5698C7.06448 14.7978 6.32864 14.7629 5.65468 14.471C4.46563 13.9557 3.7829 12.7712 3.97923 11.6363C5.28176 11.7388 7.15932 12.0612 9.25433 12.9469C9.22463 13.0644 9.18847 13.1801 9.14009 13.2916ZM2.79622 10.912C2.04739 10.9192 1.28913 10.3741 0.906065 9.52445C0.601048 8.84752 0.60388 8.04955 0.91387 7.38989C1.29293 6.58262 2.02315 6.0513 2.81963 6.00315L2.96841 5.99435C4.65257 5.89482 7.9278 5.70073 11.6264 3.547C11.0474 4.78368 10.6922 6.51335 10.6922 8.458C10.6922 10.4039 11.0479 12.1344 11.6276 13.3712C7.79273 11.1393 4.2591 10.8945 2.79622 10.912ZM13.3364 8.458C13.3364 9.51961 12.5439 10.3974 11.5199 10.5364C11.4266 9.89912 11.3722 9.20489 11.3722 8.458C11.3722 7.71103 11.4266 7.01673 11.5199 6.37938C12.544 6.51846 13.3364 7.39638 13.3364 8.458ZM13.846 14.6352C13.6471 14.6352 13.4462 14.5604 13.2488 14.4286L13.2493 14.428C13.2146 14.4028 13.1801 14.3815 13.1455 14.3566C12.524 13.8687 11.9557 12.7549 11.6377 11.2056C12.9807 11.0102 14.0166 9.85433 14.0166 8.45803C14.0166 7.06159 12.9807 5.90573 11.6378 5.71026C11.9557 4.16163 12.5236 3.04807 13.1448 2.55987C13.1798 2.53484 13.2143 2.51336 13.2493 2.4879L13.2489 2.48728C13.4462 2.35549 13.6471 2.28069 13.8461 2.28069C15.0408 2.28069 16.32 4.76292 16.32 8.45803C16.32 12.1531 15.0408 14.6352 13.846 14.6352Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_469_826">
                        <rect width="17" height="17" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                  button on the top right.
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="mt-3 flex flex-col items-center">
                <img className=" rounded-3xl" src={Second} alt="step1" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    2
                  </div>
                  <p className="text-md">
                    Click on <b>My Request</b>
                  </p>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={Third} alt="step2" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    3
                  </div>
                  <p className="text-md">Your request page will show.</p>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={Forth} alt="step2" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    4
                  </div>
                  <p className="text-md">
                    At the top right, Click <b>share</b> button to copy
                    request link.
                  </p>
                </div>
              </div>
            )}

            {}
          </AlertDialogBody>
          <AlertDialogFooter display={`flex`} justifyContent={`center`}>
            {activeStep !== 4 ? (
              activeStep == 1 ? (
                <>
                  <Button
                    w="full"
                    onClick={nextStep}
                    borderRadius="25"
                    bgColor="black"
                    color="white"
                    ml={3}
                    h={42}
                    _hover={{ bg: "#000000" }}
                    _active={{
                      bg: "#000000",
                    }}
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    w="full"
                    borderRadius="25"
                    mr={2}
                    onClick={backStep}
                    h={42}
                  >
                    Previous
                  </Button>
                  <Button
                    w="full"
                    onClick={nextStep}
                    borderRadius="25"
                    bgColor="black"
                    color="white"
                    h={42}
                    _hover={{ bg: "#000000" }}
                    _active={{
                      bg: "#000000",
                    }}
                  >
                    Next
                  </Button>
                </>
              )
            ) : (
              <>
                <Button
                  w="full"
                  borderRadius="25"
                  mr={2}
                  onClick={backStep}
                  h={42}
                >
                  Previous
                </Button>
                <Button
                  w="full"
                  onClick={onCloseExportModal}
                  borderRadius="25"
                  bgColor="black"
                  color="white"
                  h={42}
                  _hover={{ bg: "#000000" }}
                  _active={{
                    bg: "#000000",
                  }}
                >
                  Finish!
                </Button>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ShareRequest;
