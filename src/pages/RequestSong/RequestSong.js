import React from "react";
import Feed from "./components/Feed";
import ViewRequest from "./components/ViewRequest";
import SendRequest from "./components/SendToRequest";
import SendToRequest from "./components/SendToRequest";

function RequestSong() {
  return (
    <div className="mx-auto flex h-full max-w-md justify-center py-6 pt-[60px]">
      <ViewRequest />
    </div>
  );
}

export default RequestSong;
