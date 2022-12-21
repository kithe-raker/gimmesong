import disc from "@assets/img/disc.webp";
import santa_emoji from "@assets/img/santa_emoji.png";
import shushing_emoji from "@assets/img/shushing_emoji.png";
import present_emoji from "@assets/img/present_emoji.png";

const __VinylStyle = {
  background: {
    akKKhVLdRoE3DwwV7VA9: {
      id: "akKKhVLdRoE3DwwV7VA9",
      image_url: disc,
      display_name: "Default",
    },
  },
  center: {
    n5W90RdmF5aKrNdMjEo2: {
      id: "n5W90RdmF5aKrNdMjEo2",
      image_url: shushing_emoji,
      display_name: "Default",
    },
    asW3lCf98pxSdCuHi6kH: {
      id: "asW3lCf98pxSdCuHi6kH",
      image_url: santa_emoji,
      display_name: "Santa",
    },
    "8MePVaC2QTpEXHD9zwEp": {
      id: "8MePVaC2QTpEXHD9zwEp",
      image_url: present_emoji,
      display_name: "Present",
    },
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

  getAllVinylStyle: async function () {
    const _background = [];
    Object.keys(__VinylStyle.background).forEach((key) => {
      _background.push(__VinylStyle.background[key]);
    });

    const _center = [];
    Object.keys(__VinylStyle.center).forEach((key) => {
      _center.push(__VinylStyle.center[key]);
    });
    return {
      background: _background,
      center: _center,
    };
  },
};

export default methods;
