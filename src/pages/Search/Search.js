import { useState } from "react";
import PasteLink from "./components/PasteLink.js";
import Sent from "./components/Sent.js";
import SearchSong from "./components/SearchSong.js";
import Send from "./components/Send.js";

function Search() {
  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(null);
  const [song, setSong] = useState(null);
  const [message, setMessage] = useState("");

  const nextStep = () => {
    setCurrentStep((step) => (step += 1));
  };

  const sendSong = () => {
    if (!receiver || !song) return;

    // implement send song logic here
    const data = {
      receiver,
      song,
      message,
    };

    // if success then go to next step
    nextStep();
  };

  const goSomewhere = () => {
    console.log("go go go");
  };

  /**
   * @dev below component function will end within the component
   * and only return the final value to parent.
   */

  const handleReceiverChange = (user) => {
    setReceiver(user);
  };

  const handleSongChange = (song) => {
    setSong(song);
  };

  const handleMessageChange = (msg) => {
    setMessage(msg);
  };

  /**
   * @dev discuss the function below, don't worry about variable that depends on previous step
   * because if user isn't complete their current step, they can't go to the next step.
   */

  let render;
  switch (currentStep) {
    case 1:
      render = (
        <PasteLink onFoundReceiver={handleReceiverChange} next={nextStep} />
      );
      break;
    case 2:
      render = (
        <SearchSong
          receiver={receiver}
          onSongChange={handleSongChange}
          next={nextStep}
        />
      );
      break;
    case 3:
      render = (
        <Send
          receiver={receiver}
          song={song}
          onMessageChange={handleMessageChange}
          next={sendSong}
        />
      );
      break;
    case 4:
      render = <Sent next={goSomewhere} />;
      break;
    default:
      break;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6">
      <div className="my-4 w-full max-w-[300px] bg-gray-300 p-5">ADS</div>
      {render}
    </div>
  );
}

export default Search;
