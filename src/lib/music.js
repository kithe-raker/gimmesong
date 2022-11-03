const __baseUrl = "https://gimmesong-api-giculn566q-uc.a.run.app";

function getParams(options) {
  if (!options) return;

  let params = [];
  Object.entries(options).forEach(([key, value]) =>
    params.push(`${key}=${value}`)
  );
  return params.join("&");
}

const methods = {
  search: async function (options = {}) {
    const params = getParams(options);
    const url = `${__baseUrl}/api/v1/searchsongs?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data?.results[0]?.contents;
  },
  addCanvasToGallery: async function ({ link = "", content }) {
    if (!content) throw "no content";

    const url = `${__baseUrl}/publicspace/opengallery/add`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  },
};

export default methods;
