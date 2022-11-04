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
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
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
