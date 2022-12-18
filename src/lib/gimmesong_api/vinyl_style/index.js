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
    if (!type) throw "no type provided";
    if (type != "background" && type != "center")
      throw "provided type not exists";

    return id && __VinylStyle[type][id]
      ? __VinylStyle[type][id]
      : __VinylStyle[type]["id"];
  },
  /**
   *
   * @param {{
   *            background: string,
   *            center: string,
   *        }} vinylStyle
   * @returns
   */
  getVinylStyleDetails: async function (vinylStyle) {
    const backgroundStyle = await this.getStyleDetails(
      "background",
      vinylStyle?.background
    );

    const CenterStyle = await this.getStyleDetails(
      "center",
      vinylStyle?.center
    );

    return {
      background: backgroundStyle,
      center: CenterStyle,
    };
  },
};

export default methods;
