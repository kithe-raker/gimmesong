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

import First from "../assets/1.png";
import Second from "../assets/2.png";
import Second from "../assets/3.png";

function Help() {
    const { activeStep, setStep, backStep, nextStep } = useSteps({
        totalSteps: 3,
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
                    <AlertDialogHeader>Request Songs Guide</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody
                        display={`flex`}
                        flexDirection={`column`}
                        justifyContent={`center`}
                        alignItems={`center`}
                    >
                        {activeStep === 1 && (
                            <div className="mt-3 flex flex-col items-center">
                                <img className="rounded-3xl" src={First} alt="step1" />

                            </div>
                        )}
                        {activeStep === 2 && (
                            <div className="mt-3 flex flex-col items-center">
                                <img className="rounded-3xl" src={Second} alt="step2" />

                            </div>
                        )}
                        {activeStep === 3 && (
                            <div className="mt-3 flex flex-col items-center">
                                <img className="rounded-3xl" src={Second} alt="step3" />

                            </div>
                        )}
                        { }
                    </AlertDialogBody>
                    <AlertDialogFooter display={`flex`} justifyContent={`center`}>
                        {activeStep !== 2 ? (
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

export default Help