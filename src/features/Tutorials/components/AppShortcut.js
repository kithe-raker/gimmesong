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

import pink from "../assets/AppShortcut/icon/pink.png";
import white from "../assets/AppShortcut/icon/white.png";

import ios1 from "../assets/AppShortcut/ios/1.png";
import ios2 from "../assets/AppShortcut/ios/2.png";
import ios3 from "../assets/AppShortcut/ios/3.png";
import ios4 from "../assets/AppShortcut/ios/4.png";
import ios5 from "../assets/AppShortcut/ios/5.png";
import ios6 from "../assets/AppShortcut/ios/6.png";
import Share from "../assets/AppShortcut/ios/share.png";

import and1 from "../assets/AppShortcut/android/1.png";
import and2 from "../assets/AppShortcut/android/2.png";
import and3 from "../assets/AppShortcut/android/3.png";

function AppShortcut() {
  const platform = window.navigator.platform;

  const isIOSDevice =
    platform.indexOf("iPhone") === 0 || platform.indexOf("iPad") === 0;
  const isAndroid = platform.indexOf("Android") === 0;

  const { activeStep, setStep, backStep, nextStep } = useSteps({
    totalSteps: 7,
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
        How to add app shortcut?
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
          <AlertDialogHeader>How to add app shortcut?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody
            display={`flex`}
            flexDirection={`column`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            {activeStep === 1 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={ios1} alt="step1" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    1
                  </div>
                  <p className="text-md">Open Shortcut app.</p>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={ios2} alt="step2" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    2
                  </div>
                  <p className="text-md">
                    Click
                    <svg
                      className="mx-2 inline"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    button on the top right.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={ios3} alt="step3" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    3
                  </div>
                  <p className="text-md">
                    Click add action then type "<b>url</b>" in search field.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={ios4} alt="step4" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    4
                  </div>
                  <p className="text-md">
                    Add <b>url</b> then type "<b>gimmesong.link</b>" in url.
                    After that add <b>open url</b>.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 5 && (
              <div className="mt-3 flex flex-col items-center">
                <img src={ios5} alt="step5" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    5
                  </div>
                  <p className="text-md">
                    Click
                    <img className="mx-1 inline h-[20px]" src={Share} />
                    button. then click add to home page.
                  </p>
                </div>
              </div>
            )}
            {activeStep === 6 && (
              <div className="mt-3 flex flex-col items-center">
                <img className="rounded-3xl" src={ios6} alt="step3" />
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    6
                  </div>
                  <p className="text-md">Add icon and name.</p>
                </div>
              </div>
            )}
            {activeStep === 7 && (
              <div className="mt-3 flex flex-col items-center">
                <div className="flex space-x-6">
                  <img className=" h-36 rounded-3xl" src={white} />
                  <img className=" h-36 rounded-3xl" src={pink} />
                </div>
                <div className="mt-2 flex items-center">
                  <div
                    className={`mr-3 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black text-white`}
                  >
                    7
                  </div>
                  <p className="text-md">
                    You can select and hold click the image to save app icon.
                  </p>
                </div>
              </div>
            )}
            {}
          </AlertDialogBody>
          <AlertDialogFooter display={`flex`} justifyContent={`center`}>
            {activeStep !== 7 ? (
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
          </AlertDialogFooter>{" "}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AppShortcut;
