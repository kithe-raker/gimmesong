import VinylStyle from "../vinyl_style";

const methods = {
  queryVinylStyleInventory: async function () {
    return await VinylStyle.getAllVinylStyle();
  },
};

export default methods;
