import useSession from "@hooks/useSession";
import { useState } from "react";

function Profile() {
  const { user } = useSession();
  const [language, setLanguage] = useState("EN");
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-start py-[60px] pt-[80px]">
      {user ? (
        <div className="gimmesong-secondary-font flex w-full max-w-md flex-col justify-center px-6 ">
          <span className="text-3xl font-extrabold">Profile</span>
          <div className="mt-6 flex h-32 w-full flex-col divide-y divide-solid divide-black/[0.05] rounded-2xl border border-black/[0.05] bg-white text-lg font-bold">
            <div className="flex flex-1 flex-row items-center px-4">
              <span className="">{"@" + user.username}</span>
            </div>
            <div className="flex flex-1 flex-row items-center justify-between px-4">
              <span className="">{language}</span>
              <button className="px-3 border border-black/[0.05] rounded-2xl hover:bg-gray-100">
                <span className="text-base font-normal text-[#6A6A6A]">Change</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Hello, World!</div>
      )}
    </div>
  );
}

export default Profile;
