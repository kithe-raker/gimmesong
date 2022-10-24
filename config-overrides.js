const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      ["@assets"]: path.resolve(__dirname, "src/assets"),
      ["@components"]: path.resolve(__dirname, "src/components"),
      ["@data"]: path.resolve(__dirname, "src/data"),
      ["@hooks"]: path.resolve(__dirname, "src/hooks"),
      ["@features"]: path.resolve(__dirname, "src/features"),
      ["@styles"]: path.resolve(__dirname, "src/styles"),
      ["@utils"]: path.resolve(__dirname, "src/utils"),
      ["@artifacts"]: path.resolve(__dirname, "src/artifacts"),
      ["@scripts"]: path.resolve(__dirname, "src/scripts"),
      ["@store"]: path.resolve(__dirname, "src/store"),
      ["@pages"]: path.resolve(__dirname, "src/pages"),
    },
  };
  return config;
};
