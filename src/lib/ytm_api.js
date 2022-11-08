import { StreamingError } from "@lib/error";

const API_BASE_URL = "https://music.youtube.com/youtubei/v1/";
const API_ORIGIN = "https://music.youtube.com";

const ANDROID_KEY = "AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w";

const methods = {
  getStreamsUrl: async function (id) {
    if (!id) throw Error("no song's id provided");

    // const response = await _PlaybackUrlRequest(id);
    const response = await fetch(`https://pipedapi.kavin.rocks/streams/${id}`);

    if (!response.ok) {
      throw new StreamingError({
        code: "VIDEO_UNAVAILABLE",
        message: "Video Unavailable",
      });
    }
    const data = await response.json();

    if (!data.audioStreams.length > 0) {
      throw new StreamingError({
        code: "INVALID_STREAMING_URL",
        message: "Unplayable",
      });
    }

    const result = _pipedPlaybackUrlParser(data);
    return result;
  },
};

// ==================== Private function ====================
const _AcceptedAudioFormat = ["audio/mp4", "audio/webm"];

/**
 *
 * @param {*} data
 * @returns {{"audio/mp4":string,"audio/webm":string}}
 */
function _pipedPlaybackUrlParser(data) {
  // descending sort streams data bitrate
  const streams = data?.audioStreams;
  streams.sort((a, b) => (b?.bitrate ?? 0) - (a?.bitrate ?? 0));

  // find highest bitrate in each accepted format
  const returnedData = {};
  _AcceptedAudioFormat.forEach((format) => {
    const match = streams.find((data) => (data?.mimeType ?? "") == format);
    if (match) returnedData[format] = match.url;
  });

  // const urlArr = data.audioStreams.filter((item) => item.quality === "48 kbps");
  return returnedData;
}

function _PlaybackUrlParser(data) {
  const formats = data?.streamingData?.adaptiveFormats;
  let idx = -1;
  const length = formats?.length;

  const arr = [];
  while (++idx < length) {
    const item = formats[idx];
    if (item.itag < 139 && item.itag > 251) continue;
    if (item.itag === 140)
      arr.push({
        original_url: item.url,
        url: item.url,
        mimeType: "mp4",
      });
  }
  return { streams: arr };
}

function _PlaybackUrlRequest(id) {
  const context = {
      client: { clientName: "IOS", clientVersion: "17.13.3", hl: "en" },
    },
    params = {
      videoId: id,
      racyCheckOk: true,
      contentCheckOk: true,
    };
  const body = { context, ...params };

  const request = fetch(API_BASE_URL + `player?key=${ANDROID_KEY}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Origin: API_ORIGIN,
    },
    body: JSON.stringify(body),
    method: "POST",
  });
  return request;
}

export default methods;
