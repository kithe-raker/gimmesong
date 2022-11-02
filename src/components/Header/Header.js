function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 mx-auto flex h-[60px] w-full max-w-md items-center justify-end px-2">
      <button className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-black shadow-sm hover:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
    </header>
  );
}

export default Header;
