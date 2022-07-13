var path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["."],
      resolvePath(sourcePath, currentFile, opts) {
        if(sourcePath === 'react-native' && currentFile.includes("node_modules\\react-native\\") === false && currentFile.includes('resolver\\react-native\\') === false){
          console.log('testing',sourcePath, currentFile)
          return  path.resolve(__dirname, 'resolver/react-native');
        }
        // macos/linux paths
        // if(sourcePath === 'react-native' && currentFile.includes("node_modules/react-native/") === false && currentFile.includes('resolver/react-native/') === false){
          // console.log('testing',sourcePath, currentFile)
          // return  path.resolve(__dirname, 'resolver/react-native');
        // }
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
