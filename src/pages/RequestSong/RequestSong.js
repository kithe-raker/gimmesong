import React from 'react'
import Feed from "./components/Feed";
import ViewRequest from "./components/ViewRequest";
import SendRequest from "./components/SendToRequest";
import SendToRequest from './components/SendToRequest';

function RequestSong() {
  return (
    <div className='max-w-md mx-auto flex h-full py-6 pt-[60px]'>
        <SendToRequest/>
    </div>
  )
}

export default RequestSong