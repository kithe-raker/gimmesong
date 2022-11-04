import { useNavigate } from "react-router-dom";
import useSession from "@hooks/useSession";

function Header() {
  const { user } = useSession();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 mx-auto flex h-[60px] w-full max-w-md items-center justify-end px-2">
      {user?.username && (
        <button
          onClick={() => navigate("/menu")}
          className="mr-2 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-black shadow-sm hover:bg-gray-700"
        >
          <svg
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
      )}
      {user?.username && (
        <button
          onClick={() => navigate("/myaccount")}
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-black shadow-sm hover:bg-gray-700"
        >
          <svg
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        </button>
      )}
    </header>
  );
}

export default Header;
