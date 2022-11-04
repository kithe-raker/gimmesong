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

    const response = await axios.get(`/api/v1/searchsongs?${params}`);
    return response.data.results;
  },
};

export default methods;
