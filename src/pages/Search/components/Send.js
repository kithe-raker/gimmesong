import { useState } from "react";

function Send({ next, onMessageChange, receiver, song }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (val) => {
    setMessage(val);
    onMessageChange(val);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs">
      <div className="flex flex-col justify-between items-center w-full bg-white p-3 rounded-[36px] h-[360px] border border-gray-200">
        <span className="mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]">
          gimmesong.link/@tiemdwoo001
        </span>
        <textarea
          value={message}
          className="my-auto w-full outline-none text-center resize-none"
          placeholder="“ Write something ”"
          rows={6}
          onChange={(e) => handleMessageChange(e.target.value)}
        />

        <div
          className={`bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] text-white flex items-center justify-between h-16 w-full bg-white hover:bg-gray-100 rounded-full p-3 pr-4 cursor-pointer`}
        >
          <div className="flex items-center overflow-hidden">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
            <div className="flex flex-col mx-2.5 min-w-0 max-w-[150px]">
              <span className={`text-sm truncate`}>
                Pink VenomPink VenomPink VenomPink Venom
              </span>
              <span className={`text-xs truncate text-white`}>
                BlackpinkBlackpinkBlackpinkBlackpinkBlackpink
              </span>
            </div>
          </div>
          <div className="text-xs">3:02</div>
        </div>
      </div>
      <button
        onClick={next}
        className="mt-5 h-12 w-[250px] gimmesong-primary-font bg-black hover:opacity-70 rounded-full text-white"
      >
        SEND
      </button>
    </div>
  );
}

export default Send;
