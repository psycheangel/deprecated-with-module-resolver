# deprecated-with-module-resolver
testing module resolver usage to fix deprecated issue in react-native based on discussion in related react-native issue [link](https://github.com/facebook/react-native/issues/33734)

**Step 1** 

Install the plugin

```
npm install --save-dev babel-plugin-module-resolver deprecated-react-native-prop-types
```
or
```
yarn add --dev babel-plugin-module-resolver deprecated-react-native-prop-types
```

**Step 2**

create index.js file inside project folder `resolver/react-native/` with following code
```
import * as StandardModule from 'react-native';


const deprecatedProps = {
  'ViewPropTypes': require('deprecated-react-native-prop-types/DeprecatedViewPropTypes'),
  'ColorPropType': require('deprecated-react-native-prop-types/DeprecatedColorPropType'),
  'EdgeInsetsPropType': require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType'),
  'PointPropType': require('deprecated-react-native-prop-types/DeprecatedPointPropType'),
};

// Had to use a proxy because ...StandardModule made think react-native that all modules were 
// being used and was triggering some unnecessary validations / native dep checks. 
// This prevents that from happening.
const objProx = new Proxy(StandardModule, {
  get(obj, prop) {
    if (prop in deprecatedProps) {
        return deprecatedProps[prop];
    }
    return Reflect.get(...arguments);
  }
}); 

module.exports = objProx;
```

**Step 3**

configure module resolver inside babel.config.js, depends on your project requirement to blacklist/whitelist certain npm packages to prevent conflicting file.

example module-resolver config :

```
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

```
