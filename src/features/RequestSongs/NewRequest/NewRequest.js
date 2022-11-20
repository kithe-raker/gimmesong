import { useState } from "react";

function NewRequest() {
  const [anonymous, setAnonymous] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDescChange = (val) => {
    if (val.length > 200) return;
    setDescription(val);
  };

  const makeRequest = () => {};

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="flex flex-col items-center">
        <span className=" text-center text-8xl">📣</span>
        <span className="gimmesong-primary-font text-center text-3xl">
          Request Songs
        </span>
      </div>
      <div className="mt-6 flex w-full max-w-xs flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex h-[200px] w-full flex-col rounded-[24px] border border-gray-200 bg-white p-3">
            <span className="w-fit bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text px-2 text-transparent">
              {!anonymous ? "@vi.masx" : "Anonymous"}
            </span>
            <textarea
              disabled={loading}
              value={description}
              className="my-auto w-full resize-none px-2 outline-none"
              placeholder="Your description"
              rows={6}
              onChange={(e) => handleDescChange(e.target.value)}
            />
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <input
            id="checked-checkbox"
            type="checkbox"
            value={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            class="h-4 w-4 rounded-2xl border-gray-300 bg-gray-100 text-gray-800"
          />
          <label
            htmlFor="checked-checkbox"
            className="ml-2 text-sm font-medium text-gray-600"
          >
            Make me anonymous
          </label>
        </div>
        <button
          disabled={loading}
          onClick={makeRequest}
          className="gimmesong-primary-font mt-6 inline-flex h-12 w-[250px] items-center justify-center rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
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
          Request
        </button>
      </div>
    </div>
  );
}

export default NewRequest;
