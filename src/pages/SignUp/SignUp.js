function SignUp() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-md mx-auto py-6">
      <div className="flex flex-col items-center justify-center">
        <span className="gimmesong-primary-font text-gray-600 text-xl ">
          Lorem Lorem Lorem Lorem
        </span>
        <div className="relative w-[250px] mt-4">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="text-gray-500 h-5 w-5"
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
            className="block h-12 w-[250px] pl-10 pr-12 w-full text-gray-900 bg-white rounded-full focus:outline-gray-500"
            placeholder="yourname"
            required
          />
          <div className="text-white absolute flex right-2 bottom-2 top-2 font-medium text-sm h-8 w-8 justify-center items-center">
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
              className="text-gray-400 h-5 w-5"
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
        <button className="mt-5 h-12 w-[250px] gimmesong-primary-font bg-black hover:opacity-70 rounded-full text-white">
          ENTER
        </button>
      </div>
    </div>
  );
}

export default SignUp;
