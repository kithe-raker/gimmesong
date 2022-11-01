import { useState } from "react";

function PasteLink({ next, onSelectReceiver }) {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkChange = (e) => {
    let val = e.target.value;
    setLink(val);
  };

  const submit = () => {
    // implement api & validation logic here
    onSelectReceiver(null);
    next();
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
          onChange={handleLinkChange}
          className="block h-12 w-[250px] rounded-full bg-white pl-10 pr-12 text-gray-900 focus:outline-gray-500"
          placeholder="link or @friendname"
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
        onClick={submit}
        className="gimmesong-primary-font mt-5 h-12 w-[250px] rounded-full bg-black text-white hover:opacity-70"
      >
        NEXT
      </button>
    </div>
  );
}

export default PasteLink;
