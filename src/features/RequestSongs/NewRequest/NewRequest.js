import React from "react";

function NewRequest() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center">
        <span className=" text-center text-8xl">📣</span>
        <span className="gimmesong-primary-font text-center text-3xl">
          Request Songs
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-xs flex-col items-center justify-center">
          <div className="flex h-[360px] w-full flex-col items-center justify-between rounded-[36px] border border-gray-200 bg-white p-3">
            <span className="mt-3 bg-gradient-to-r from-[#86C7DF] via-[#8583D6] to-[#CFB6D0] bg-clip-text text-transparent">
              gimmesong.link/
            </span>
            <textarea
              className="my-auto w-full resize-none px-2 text-center outline-none"
              placeholder="“ Write something ”"
              rows={6}
            />
          </div>
          <div class="flex items-center">
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              value=""
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label
              for="checked-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Make me anonymous
            </label>
          </div>
          <button className="gimmesong-primary-font mt-5 inline-flex h-12 w-[250px] items-center justify-center rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500">
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
            SEND
          </button>
        </div>
        {/* <Checkbox className="rounded-md">
          <span className="gimmesong-secondary-font text-base">
            Make me anonymous
          </span>
        </Checkbox> */}
      </div>
    </div>
  );
}

export default NewRequest;
