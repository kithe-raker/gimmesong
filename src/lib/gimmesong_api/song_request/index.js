import { axios } from "@lib/axios";

import VinylStyle from "../vinyl_style";

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

    for (let index = 0; index < results?.contents?.length ?? 0; index++) {
      for (
        let vinlyIndex = 0;
        vinlyIndex < results.contents[index].recentlyAdded?.length ?? 0;
        vinlyIndex++
      ) {
        results.contents[index].recentlyAdded[vinlyIndex].vinyl_style =
          await VinylStyle.getVinylStyleDetails(
            results.contents[index].recentlyAdded[vinlyIndex].vinyl_style
          );
      }
    }

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

    for (let index = 0; index < results?.contents?.length ?? 0; index++) {
      for (
        let vinlyIndex = 0;
        vinlyIndex < results.contents[index].recentlyAdded?.length ?? 0;
        vinlyIndex++
      ) {
        results.contents[index].recentlyAdded[vinlyIndex].vinyl_style =
          await VinylStyle.getVinylStyleDetails(
            results.contents[index].recentlyAdded[vinlyIndex].vinyl_style
          );
      }
    }

    return results.contents;
  },
  QueryUserRequest: async function ({ lastRequestId = "", limit = 10 }) {
    const {
      data: { results },
    } = await axios.post(_requestPath(`user`), {
      lastRequestId,
      limit,
    });

    for (let index = 0; index < results?.contents?.length ?? 0; index++) {
      for (
        let vinlyIndex = 0;
        vinlyIndex < results.contents[index].recentlyAdded?.length ?? 0;
        vinlyIndex++
      ) {
        results.contents[index].recentlyAdded[vinlyIndex].vinyl_style =
          await VinylStyle.getVinylStyleDetails(
            results.contents[index].recentlyAdded[vinlyIndex].vinyl_style
          );
      }
    }

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

    for (let index = 0; index < results?.contents?.length ?? 0; index++) {
      results.contents[index].vinyl_style =
        await VinylStyle.getVinylStyleDetails(
          results.contents[index].vinyl_style
        );
    }

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
  /**
   *
   * @param {*} langTag
   * @param {*} requestId
   * @param {*} message
   * @param {*} song
   * @param {{
   *            disc: string,
   *            emoji: string,
   *        }} vinylStyle passing only the component's id
   * @returns
   */
  AddSong: async function (langTag, requestId, message, song, vinylStyle) {
    const {
      data: { success },
    } = await axios.post(_requestPath(`addsong`), {
      langTag,
      requestId,
      message,
      song,
      vinylStyle,
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
