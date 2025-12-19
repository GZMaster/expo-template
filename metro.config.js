// Metro configuration for Expo with Gluestack UI support
// This configuration ensures proper resolution of nested dependencies
// required by Gluestack UI components
// Path aliases are handled by babel-plugin-module-resolver in babel.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;

