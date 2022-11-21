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

function HowShare() {
  const platform = window.navigator.platform;

  const isIOSDevice =
    platform.indexOf("iPhone") === 0 || platform.indexOf("iPad") === 0;
  const isAndroid = platform.indexOf("Android") === 0;

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
        How to share to IG stories?
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
          <AlertDialogHeader>How to share to your story</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="mt-3 flex flex-col items-center">
                <video
                  muted
                  playsInline
                  preload="auto"
                  src={`story-step1.mp4`}
                  autoPlay
                  loop
                />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    1
                  </div>
                  <p className="text-md">
                    Long press on the image and <b>Save Image</b> to your
                    Gallery.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="mt-3 flex flex-col items-center">
                <img src={`story-step2.png`} alt="step2" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    2
                  </div>
                  <p className="text-md">
                    In your story, <b>Click</b> on
                    <svg
                      className="mx-2 inline"
                      width="20"
                      height="20"
                      viewBox="0 0 384 384"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M362.667 181.333V96C362.667 54.7627 329.237 21.3333 288 21.3333H96C54.7627 21.3333 21.3333 54.7627 21.3333 96V288C21.3333 329.237 54.7627 362.667 96 362.667H202.667C220.339 362.667 234.667 348.339 234.667 330.667V288C234.667 246.763 268.096 213.333 309.333 213.333H330.667C348.339 213.333 362.667 199.006 362.667 181.333ZM361.101 225.137C352.471 231.145 341.98 234.667 330.667 234.667H309.333C279.878 234.667 256 258.545 256 288V330.667C256 339.676 253.766 348.162 249.822 355.605C308.245 337.611 352.399 287.061 361.101 225.137ZM96 0H288C341.02 0 384 42.9807 384 96V202.667C384 302.814 302.814 384 202.667 384H96C42.9807 384 0 341.02 0 288V96C0 42.9807 42.9807 0 96 0Z"
                        fill="black"
                      />
                      <circle cx="121" cy="140" r="25" fill="black" />
                      <circle cx="263" cy="140" r="25" fill="black" />
                      <path
                        d="M105.5 243.194C127.524 274.048 194.198 317.961 264.209 243.194"
                        stroke="black"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                    </svg>
                    button.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="mt-3 flex flex-col items-center">
                <img
                  src={`${
                    isAndroid ? "story-step3-android.png" : "story-step3.png"
                  }`}
                  alt="step3"
                />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    3
                  </div>
                  <p className="text-md">
                    <b>Click</b> on
                    <svg
                      className="mx-2 inline"
                      width="20"
                      height="20"
                      viewBox="0 0 364 366"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 239L114.593 179.761L194.459 239L273.301 115L346 216.409"
                        stroke="black"
                        strokeWidth="20"
                        strokeLinecap="round"
                      />
                      <rect
                        x="12.5"
                        y="12.5"
                        width="339"
                        height="341"
                        rx="74.5"
                        stroke="black"
                        strokeWidth="25"
                      />
                      <circle cx="108" cy="92" r="25" fill="black" />
                    </svg>
                    widget <br />
                    and select image that you saved before.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="mt-3 flex flex-col items-center">
                <video
                  muted
                  playsInline
                  preload="auto"
                  src={`story-step4.mp4`}
                  autoPlay
                  loop
                />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    4
                  </div>
                  <p className="text-md">
                    Customize your story and share it to your friends.
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

export default HowShare;
