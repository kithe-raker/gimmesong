import { axios } from "@lib/axios";

function _requestPath(path) {
  return "/api/v1/songrequest/" + path;
}

const methods = {
  GetLinkDetails: async function (linkId) {
    const {
      data: { results },
    } = await axios.get(_requestPath(`linkdetails/${linkId}`));
    return results;
  },
  GetDetails: async function (langTag, id) {
    const {
      data: { results },
    } = await axios.get(_requestPath(`details/${langTag}/${id}`));
    return results;
  },
  GetDetailsByLinkId: async function (linkId) {
    const {
      data: { results },
    } = await axios.get(_requestPath(`detailsbylink/${linkId}`));
    return results;
  },
  QueryMostView: async function (langTag, { lastRequestId = "", limit = 10 }) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`mostview`), {
      langTag,
      lastRequestId,
      limit,
    });
    return results.contents;
  },
  QueryNewest: async function (langTag, { lastRequestId = "", limit = 10 }) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`newest`), {
      langTag,
      lastRequestId,
      limit,
    });
    return results.contents;
  },
  QueryUserRequest: async function ({ lastRequestId = "", limit = 10 }) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`user`), {
      lastRequestId,
      limit,
    });
    return results.contents;
  },
  QueryRequestItem: async function (
    langTag,
    requestId,
    { lastItemId = "", limit = 10 }
  ) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`items`), {
      langTag,
      requestId,
      lastItemId,
      limit,
    });
    return results.contents;
  },
  Create: async function (langTag, message, isAnonymous = true) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`create`), {
      langTag,
      message,
      isAnonymous,
    });
    return results;
  },
  AddSong: async function (langTag, requestId, message, song) {
    const {
      data: { success },
    } = await axios.post(_requestPath(`addsong`), {
      langTag,
      requestId,
      message,
      song,
    });
    return success;
  },
  IncrementView: async function (langTag, requestId) {
    const {
      data: { success },
    } = await axios.post(_requestPath(`incrementview`), {
      requestId,
      langTag,
    });
    return success;
  },
};

export default methods;
