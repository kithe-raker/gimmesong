import { useState } from "react";

import SearchSong from "./components/SearchSong.js";
import WriteMessage from "./components/WriteMessage.js";

function SendSong({ playlistInfo, onSongAdded }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [receiver, setReceiver] = useState(playlistInfo.shareLinkId);
  const [song, setSong] = useState(null);

  // Call Native banner ads
  // Ads.NativeBanner();

  const nextStep = () => {
    setCurrentStep((step) => (step += 1));
  };

  /**
   * @dev below component function will end within the component
   * and only return the final value to parent.
   */

  const handleSongChange = (song) => {
    setSong(song);
  };

  /**
   * @dev discuss the function below, don't worry about variable that depends on previous step
   * because if user isn't complete their current step, they can't go to the next step.
   * and variable call won't fire an error
   */

  let render;
  switch (currentStep) {
    case 1:
      render = (
        <SearchSong
          receiver={receiver}
          onSelectSong={handleSongChange}
          next={nextStep}
        />
      );
      break;
    case 2:
      render = (
        <WriteMessage
          requiredPayload={playlistInfo}
          onSongAdded={onSongAdded}
          receiver={receiver}
          song={song}
        />
      );
      break;
    // case 3:
    //   render = <Sent receiver={receiver} />;
    //   break;
    default:
      break;
  }

  return (
    <div className="flex max-w-md flex-col items-center justify-center">
      {render}
      {/* <div
        className="mt-12"
        id="container-b660ec7b99553839c4654ee4a1292d71"
      ></div> */}
    </div>
  );
}

export default SendSong;
