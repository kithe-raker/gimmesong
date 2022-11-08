import { useState, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import GimmesongAPI from "@lib/gimmesong_api";
import useSession from "@hooks/useSession";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchDelay = useRef(null);

  const handleUsernameChange = (val) => {
    setUsername(val);

    if (!val.length >= 2) return;
    setLoading(true);
    setError(false);

    clearTimeout(searchDelay.current);
    searchDelay.current = setTimeout(async () => {
      try {
        const isExist = await GimmesongAPI.checkUserExist(val);
        if (!isExist) {
          setAvailable(true);
        } else {
          setError(true);
          setAvailable(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const isValid = useMemo(
    () => /^[a-z0-9_\.][a-z0-9_\.]{1,31}$/.test(username),
    [username]
  );

  const submit = async () => {
    if (!username) {
      toast("Please fill out your username", {
        style: {
          borderRadius: "25px",
          background: "#FF6464",
          color: "#fff",
        },
      });
    }

    try {
      setLoading(true);
      const success = await GimmesongAPI.createProfile(user.uid, username);
      if (success) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="flex flex-col items-center justify-center">
        <span className="gimmesong-primary-font text-center text-lg text-gray-600">
          Others will be able to send songs for you by this name.
        </span>
        <div className="relative mt-4 mb-2.5 w-[250px]">
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
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            type="text"
            className="block h-12 w-[250px] rounded-full bg-white pl-10 pr-12 text-gray-900 focus:outline-gray-500"
            placeholder="yourname"
            required
          />
          <div className="absolute right-2 bottom-2 top-2 flex h-8 w-8 items-center justify-center text-sm font-medium text-white">
            {username && (
              <>
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-gray-300"
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
                ) : isValid && available ? (
                  <svg
                    className="h-5 w-5 text-[#82CD47]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-[#FF6464]"
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
                )}
              </>
            )}
          </div>
        </div>

        <span
          style={{
            whiteSpace: "pre-line",
          }}
          className="px-4 text-center text-sm leading-4 text-red-500"
        >
          {username.length > 0 &&
            !isValid &&
            "Username must be at least 2 characters\n (allow a-z (lower case), 0-9, _, .)"}
          {error && !available && "Username already taken"}
        </span>
        <button
          disabled={!isValid || !available || loading}
          onClick={submit}
          className="gimmesong-primary-font mt-2.5 inline-flex h-12 w-[250px] items-center justify-center rounded-full bg-black text-white transition duration-150 ease-in-out hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

export default SignUp;
