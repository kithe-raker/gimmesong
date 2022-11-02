import { useState } from "react";
import GetLink from "@components/GetLink";

function MyAccount() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center py-6 pt-[60px]">
      <div className="my-4 w-full max-w-[300px] bg-gray-300 p-5">ADS</div>
      <GetLink />
    </div>
  );
}

export default MyAccount;
