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
    <div className="flex flex-col items-center justify-center w-full max-w-xs">
      <span className="gimmesong-primary-font text-gray-600 text-xl ">
        Give me anonymous song !
      </span>
      <div className="relative w-full mt-3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500"
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
          className="block h-12 pl-10 pr-6 w-full text-gray-900 bg-white rounded-full focus:outline-gray-500"
          placeholder="search song"
          required
        />
      </div>
      <div className="w-full bg-white p-3 rounded-[36px] h-[calc((64px*4)+50px)] overflow-y-auto overflow-x-hidden mt-3">
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
              } flex items-center justify-between h-16 mb-2.5 w-full bg-white hover:bg-gray-100 rounded-full p-3 pr-4 cursor-pointer`}
            >
              <div className="flex items-center overflow-hidden">
                <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
                <div className="flex flex-col mx-2.5 min-w-0 max-w-[150px]">
                  <span className={`text-sm truncate`}>
                    Pink VenomPink VenomPink VenomPink Venom
                  </span>
                  <span
                    className={`text-xs truncate ${
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
      <div className="flex flex-col items-center my-4">
        <span className="gimmesong-primary-font text-sm text-gray-500">
          give this song to
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0]">
          gimmesong.link/@tiemdwoo001
        </span>
      </div>
      <button
        onClick={submit}
        className="h-12 w-[250px] gimmesong-primary-font bg-black hover:opacity-70 rounded-full text-white"
      >
        NEXT
      </button>
    </div>
  );
}

export default SearchSong;