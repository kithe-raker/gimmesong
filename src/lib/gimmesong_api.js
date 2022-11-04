import { axios } from "@lib/axios";

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
};

export default methods;
