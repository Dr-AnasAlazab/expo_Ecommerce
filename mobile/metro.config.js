/** @format */

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

if (
  process.env.NODE_ENV === "production" ||
  process.env.EXPO_PUBLIC_PLATFORM === "web"
) {
  config.resolver.alias = {
    ...config.resolver.alias,
    "@stripe/stripe-react-native": false,
  };
}
module.exports = withNativeWind(config, { input: "./global.css" });
