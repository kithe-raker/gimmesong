import ConnectWithUs from "@components/ConnectWithUs";
import SignInBox from "@components/SignInBox";

import useSession from "@hooks/useSession";
import { signOut } from "@lib/firebase";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { user } = useSession();
  const [language, setLanguage] = useState("EN");

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-start py-[60px] pt-[80px]">
      {user ? (
        <div className="gimmesong-secondary-font flex w-full max-w-md flex-col justify-center px-6 ">
          <span className="text-3xl font-extrabold">Profile</span>
          <div className="my-6 flex h-32 w-full flex-col divide-y divide-solid divide-black/[0.05] rounded-2xl border border-black/[0.05] bg-white text-lg font-bold">
            <div className="flex flex-1 flex-row items-center px-4">
              <span>{"@" + user.username}</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-between px-4">
              <span>{language}</span>
              <button className="rounded-2xl border border-black/[0.05] px-3 hover:bg-gray-100">
                <span className="text-base font-normal text-[#6A6A6A]">
                  Change
                </span>
              </button>
            </div>
          </div>

          <span className="text-3xl font-extrabold">Disc</span>
          {/* Probably wait for disc list component from feature/more-discs branch */}
        </div>
      ) : (
        <SignInBox />
      )}

      <div className="gimmesong-secondary-font flex w-full max-w-md flex-col justify-center px-6 ">
        <button
          className="mt-20 hover:bg-gray-100"
          onClick={() => navigate("/tutorial")}
        >
          <div className="flex h-full w-full max-w-md flex-row items-center justify-between rounded-xl border border-black/[0.1] py-3 px-5">
            <span className="flex text-lg font-bold">How to play</span>
            <svg
              className="flex"
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.696699C9.46447 0.403806 8.98959 0.403806 8.6967 0.696699C8.40381 0.989593 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM0 6.75L14 6.75V5.25L0 5.25L0 6.75Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
        <button className="mt-4 hover:bg-gray-100">
          <div className="flex h-full w-full max-w-md flex-row items-center justify-between rounded-xl border border-black/[0.1] py-3 px-5">
            <span className="flex text-lg font-bold">Term and Policy</span>
            <svg
              className="flex"
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5303 6.53033C14.8232 6.23744 14.8232 5.76256 14.5303 5.46967L9.75736 0.696699C9.46447 0.403806 8.98959 0.403806 8.6967 0.696699C8.40381 0.989593 8.40381 1.46447 8.6967 1.75736L12.9393 6L8.6967 10.2426C8.40381 10.5355 8.40381 11.0104 8.6967 11.3033C8.98959 11.5962 9.46447 11.5962 9.75736 11.3033L14.5303 6.53033ZM0 6.75L14 6.75V5.25L0 5.25L0 6.75Z"
                fill="black"
              />
            </svg>
          </div>
        </button>
        <ConnectWithUs direction="flex-row" className="mt-5 justify-between" />
        {user && (
          <button className="mt-8 hover:bg-gray-100" onClick={()=>signOut()}>
            <div className="flex h-full w-full max-w-md flex-row items-center justify-center rounded-xl border border-black/[0.1] py-3 px-5">
              <span className="flex text-lg font-bold">Log out</span>
            </div>
          </button>
        )} 
      </div>
    </div>
  );
}

export default Profile;
