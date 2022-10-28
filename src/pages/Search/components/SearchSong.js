import { useState } from "react";

function SearchSong({ next, onSongChange, receiver }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleSearchTermChange = (val) => {
    setSearchTerm(val);
  };

  const handleSongChange = (song) => {
    setSelected(song);
  };

  const submit = () => {
    // if (!selected) return;
    // implement api & validation logic here
    onSongChange(null);
    next();
  };

  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center">
      <span className="gimmesong-primary-font text-xl text-gray-600 ">
        Give me anonymous song !
      </span>
      <div className="relative mt-3 w-full">
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={searchTerm}
          onChange={(e) => handleSearchTermChange(e.target.value)}
          type="text"
          className="block h-12 w-full rounded-full bg-white pl-10 pr-6 text-gray-900 focus:outline-gray-500"
          placeholder="search song"
          required
        />
      </div>
      <div className="mt-3 h-[calc((64px*4)+50px)] w-full overflow-y-auto overflow-x-hidden rounded-[36px] bg-white p-3">
        {[...new Array(6)].map((item, i) => {
          let selected = i === 2;
          return (
            <div
              key={i}
              className={`${
                selected
                  ? "bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]"
                  : ""
              } ${
                selected ? "text-white" : "text-gray-800 "
              } mb-2.5 flex h-16 w-full cursor-pointer items-center justify-between rounded-full bg-white p-3 pr-4 hover:bg-gray-100`}
            >
              <div className="flex items-center overflow-hidden">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200"></div>
                <div className="mx-2.5 flex min-w-0 max-w-[150px] flex-col">
                  <span className={`truncate text-sm`}>
                    Pink VenomPink VenomPink VenomPink Venom
                  </span>
                  <span
                    className={`truncate text-xs ${
                      selected ? "text-white" : "text-gray-500 "
                    }`}
                  >
                    BlackpinkBlackpinkBlackpinkBlackpinkBlackpink
                  </span>
                </div>
              </div>
              <div className="text-xs">3:02</div>
            </div>
          );
        })}
      </div>
      <div className="my-4 flex flex-col items-center">
        <span className="gimmesong-primary-font text-sm text-gray-500">
          give this song to
        </span>
        <span className="bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
          gimmesong.link/@tiemdwoo001
        </span>
      </div>
      <button
        onClick={submit}
        className="gimmesong-primary-font h-12 w-[250px] rounded-full bg-black text-white hover:opacity-70"
      >
        NEXT
      </button>
    </div>
  );
}

export default SearchSong;
