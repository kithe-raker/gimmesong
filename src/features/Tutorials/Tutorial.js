import React from "react";
import { useNavigate } from "react-router-dom";

import WhereLink from "./components/WhereLink";
import WhereSongs from "./components/WhereSongs";
import HowShare from "./components/HowShare";
import HowGive from "./components/HowGive";

import Confuse from "@assets/img/confuse_emoji.png";
import NewRequest from "./components/NewRequest";
import ShareRequest from "./components/ShareRequest";
import AddSongToRequest from "./components/AddSongToRequest";
import AppShortcut from "./components/AppShortcut";

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center">
        <img className="h-[60px] w-[60px]" src={Confuse} alt="" />
        <div className="mt-6 flex flex-col px-8">
          <WhereLink />
          <WhereSongs />
          <HowGive />
          {/*<HowShare />
           <NewRequest />
          <ShareRequest />
          <AddSongToRequest /> */}
          {/* <AppShortcut/> */}
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
