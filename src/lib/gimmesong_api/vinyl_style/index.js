import logo from "@assets/img/gimmesong_logo.png";

const __VinylStyle = {
  background: {
    id: { id: "id", image_url: logo },
  },
  center: {
    id: { id: "id", image_url: logo },
  },
};

const methods = {
  /**
   *
   * @param {*} type right now we only have [background] and [center] vinyl component's type
   * @param {*} id
   * @returns
   */
  getStyleDetails: async function (type, id) {
    if (!id) throw "no id provided";
    if (!type) throw "no type provided";
    if (type != "background" && type != "center")
      throw "provided type not exists";

    return __VinylStyle[type][id]
      ? __VinylStyle[type][id]
      : __VinylStyle[type]["id"];
  },
};
