function SignUp() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6">
      <div className="flex flex-col items-center justify-center">
        <span className="gimmesong-primary-font text-xl text-gray-600 ">
          Lorem Lorem Lorem Lorem
        </span>
        <div className="relative mt-4 w-[250px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <input
            type="text"
            className="block h-12 w-[250px] w-full rounded-full bg-white pl-10 pr-12 text-gray-900 focus:outline-gray-500"
            placeholder="yourname"
            required
          />
          <div className="absolute right-2 bottom-2 top-2 flex h-8 w-8 items-center justify-center text-sm font-medium text-white">
            {/* <svg
            className="text-gray-400 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> */}
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        <button className="gimmesong-primary-font mt-5 h-12 w-[250px] rounded-full bg-black text-white hover:opacity-70">
          ENTER
        </button>
      </div>
    </div>
  );
}

export default SignUp;
