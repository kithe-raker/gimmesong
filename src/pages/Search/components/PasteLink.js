import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function PasteLink({ next, onSelectReceiver }) {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkChange = (val) => {
    setLink(val);
  };

  const submit = () => {
    if (!link) {
      toast("Receiver can not be empty", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
      return;
    }
    // implement api & validation logic here
    setLoading(true);
    try {
      // mockup promise
      setTimeout(() => {
        // implement search api here
        // this just a mock up
        // if user not empty, go to next step
        let user = link.length >= 3 ? "kithe" : "";
        if (user) {
          onSelectReceiver(user);
          next();
        } else {
          toast("Not found receiver", {
            style: {
              borderRadius: "25px",
              background: "#FF6464",
              color: "#fff",
            },
          });
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="gimmesong-primary-font text-xl text-gray-600 ">
        Paste receiver link here
      </span>
      <div className="relative mt-4 w-[250px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          value={link}
          disabled={loading}
          onChange={(e) => handleLinkChange(e.target.value)}
          className="block h-12 w-[250px] rounded-full bg-white pl-10 pr-12 text-gray-900 focus:outline-gray-500"
          placeholder="link or friendname"
          required
        />
        <button className="absolute right-2 bottom-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white hover:bg-gray-100 focus:outline-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </button>
      </div>
      <button
        disabled={loading}
        onClick={submit}
        className="gimmesong-primary-font mt-5 inline-flex h-12 w-[250px] items-center justify-center rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        {loading && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        NEXT
      </button>
      <Toaster />
    </div>
  );
}

export default PasteLink;
