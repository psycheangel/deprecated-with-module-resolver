var path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["."],
      resolvePath(sourcePath, currentFile, opts) {
        if (
          sourcePath === 'react-native' &&
          !(
            (
              currentFile.includes('node_modules/react-native/') || // macos/linux paths
              currentFile.includes('node_modules\\react-native\\')
            ) // windows path
          ) &&
          !(
            currentFile.includes('resolver/react-native/') ||
            currentFile.includes('resolver\\react-native\\')
          )
        ) {
          return path.resolve(__dirname, 'resolver/react-native');
        }
        /**
         * The `opts` argument is the options object that is passed through the Babel config.
         * opts = {
         *   extensions: [".js"],
         *   resolvePath: ...,
         * }
         */
        return undefined;
      }
    }],
 
  ],
};
