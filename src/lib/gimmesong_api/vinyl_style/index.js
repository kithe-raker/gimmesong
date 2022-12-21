import disc from "@assets/img/disc.webp";
import santa_emoji from "@assets/img/santa_emoji.png";
import shushing_emoji from "@assets/img/shushing_emoji.png";
import present_emoji from "@assets/img/present_emoji.png";

const __VinylStyle = {
  disc: {
    akKKhVLdRoE3DwwV7VA9: {
      id: "akKKhVLdRoE3DwwV7VA9",
      image_url: disc,
      display_name: "Default",
    },
  },
  emoji: {
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
   * @param {*} type right now we only have [disc] and [emoji] vinyl component's type
   * @param {*} id
   * @returns
   */
  getStyleDetails: async function (type, id) {
    if (!type) throw "no type provided";
    if (type !== "disc" && type !== "emoji") throw "provided type not exists";

    if (id && __VinylStyle[type][id]) {
      return __VinylStyle[type][id];
    }

    return type === "disc"
      ? __VinylStyle[type]["akKKhVLdRoE3DwwV7VA9"]
      : __VinylStyle[type]["n5W90RdmF5aKrNdMjEo2"];
  },
  /**
   *
   * @param {{
   *            disc: string,
   *            emoji: string,
   *        }} vinylStyle
   * @returns
   */
  getVinylStyleDetails: async function (vinylStyle) {
    const discStyle = await this.getStyleDetails("disc", vinylStyle?.disc);
    const emojiStyle = await this.getStyleDetails("emoji", vinylStyle?.emoji);

    return {
      disc: discStyle,
      emoji: emojiStyle,
    };
  },

  getAllVinylStyle: async function () {
    const _disc = [];
    Object.keys(__VinylStyle.disc).forEach((key) => {
      _disc.push(__VinylStyle.disc[key]);
    });

    const _emoji = [];
    Object.keys(__VinylStyle.emoji).forEach((key) => {
      _emoji.push(__VinylStyle.emoji[key]);
    });
    return {
      disc: _disc,
      emoji: _emoji,
    };
  },
};

export default methods;
