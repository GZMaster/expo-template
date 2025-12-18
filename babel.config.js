// Babel configuration for Expo with Gluestack UI support
// This configuration enables React Native Reanimated animations
// which are required for Gluestack UI components
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for Gluestack UI animations
      'react-native-reanimated/plugin',
    ],
  };
};

