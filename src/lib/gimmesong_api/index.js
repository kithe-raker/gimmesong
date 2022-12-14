import { axios } from "@lib/axios";
import SongRequest from "./song_request";

import { db } from "../firebase";
import { ref, child, get } from "firebase/database";

function getParams(options) {
  if (!options) return;

  let params = [];
  Object.entries(options).forEach(([key, value]) =>
    params.push(`${key}=${value}`)
  );
  return params.join("&");
}

const methods = {
  searchSongs: async function (options = {}) {
    const params = getParams(options);

    const {
      data: { results },
    } = await axios.get(`/api/v1/searchsongs?${params}`);
    return results;
  },
  checkUserExist: async function (username) {
    const {
      data: { results },
    } = await axios.get(`/api/v1/usernameexist?username=${username}`);
    return results.exists;
  },
  getUserInfo: async function (uid) {
    const {
      data: { results },
    } = await axios.get(`/api/v1/getusername?uid=${uid}`);
    return results?.username;
  },
  createProfile: async function (uid, username) {
    const {
      data: { success },
    } = await axios.post(`/api/v1/addnewuser`, {
      uid,
      username,
    });
    return success;
  },
  sendSong: async function (receiver, message, song) {
    const {
      data: { success },
    } = await axios.post(`/api/v1/sendsong`, {
      recipient: receiver,
      message,
      song,
    });
    return success;
  },
  queryInbox: async function (
    options = {
      filter: "all",
    }
  ) {
    const params = getParams(options);
    const {
      data: { results },
    } = await axios.get(`/api/v1/queryinbox?${params}`);
    return results;
  },
  playedInbox: async function (inboxId) {
    const {
      data: { success },
    } = await axios.post(`/api/v1/playsongfrominbox`, {
      inboxId,
    });
    return success;
  },
  getTotalSongSent: async function () {
    // const {
    //   data: { value },
    // } = await axios.get(`/api/v1/totalsongsent`);
    // return value;

    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `total_song_sent`));
    const value = snapshot.val() ?? 0;
    return value;
  },
  getTopChartSongs: async function () {
    const {
      data: { results },
    } = await axios.get(`/api/v1/topchartsongs`);

    return results;
  },
  getStreamsUrl: async function (id) {
    const {
      data: { results },
    } = await axios.get(`/api/v1/getsongstreams?id=${id}`);

    return results;
  },
};

const GimmesongAPI = { ...methods, SongRequest };

export default GimmesongAPI;
