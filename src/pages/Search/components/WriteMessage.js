import { useState } from "react";

function WriteMessage({ next, onTypingMessage, receiver, song }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (val) => {
    if (val.length > 200) return;
    setMessage(val);
    onTypingMessage(val);
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center">
      <div className="flex h-[360px] w-full flex-col items-center justify-between rounded-[36px] border border-gray-200 bg-white p-3">
        <span className="mt-3 bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
          gimmesong.link/{receiver}
        </span>
        <textarea
          value={message}
          className="my-auto w-full resize-none text-center outline-none"
          placeholder="“ Write something ”"
          rows={6}
          onChange={(e) => handleMessageChange(e.target.value)}
        />

        <div
          className={`pointer-events-none flex h-16 w-full items-center justify-between rounded-full bg-white bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] p-3 pr-4 text-white hover:bg-gray-100`}
        >
          <div className="flex items-center overflow-hidden">
            <img
              className="h-10 w-10 shrink-0 select-none rounded-full object-contain"
              src={song.thumbnails[0]?.url}
              alt="thumbnail"
            />
            <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
              <span className={`truncate text-sm`}>{song.title}</span>
              <span className={`truncate text-xs text-white`}>
                {song.artistInfo?.artist[0]?.text}
              </span>
            </div>
          </div>
          <div className="text-xs">{song.length}</div>
        </div>
      </div>
      <button
        onClick={next}
        className="gimmesong-primary-font mt-5 h-12 w-[250px] rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600"
      >
        Send
      </button>
    </div>
  );
}

export default WriteMessage;
