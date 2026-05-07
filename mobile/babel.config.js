/** @format */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // If you are using Reanimated, this MUST be last
      "react-native-reanimated/plugin",
    ],
  };
};
