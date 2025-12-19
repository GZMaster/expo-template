// Babel configuration for Expo with Gluestack UI support
// This configuration enables React Native Reanimated animations
// which are required for Gluestack UI components
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@services': './src/services',
            '@store': './src/store',
            '@types': './src/types',
            '@constants': './src/constants',
            '@assets': './src/assets',
            '@theme': './src/theme',
            '@config': './src/config',
          },
        },
      ],
      // Required for Gluestack UI animations
      'react-native-reanimated/plugin',
    ],
  };
};

