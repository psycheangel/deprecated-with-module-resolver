# deprecated-with-module-resolver
testing module resolver usage with deprecated react-native function

**Step 1** 

Install the plugin

```
npm install --save-dev babel-plugin-module-resolver
```
or
```
yarn add --dev babel-plugin-module-resolver
```

**Step 2**

create index.js file inside project folder `resolver/react-native/` with following code
```
// ref to https://levelup.gitconnected.com/react-native-typescript-and-react-native-web-an-arduous-but-rewarding-journey-8f46090ca56b

import * as StandardModule from 'react-native';
// And let's stub out everything that's missing!

delete StandardModule['ViewPropTypes'];
delete StandardModule['ColorPropType'];
delete StandardModule['EdgeInsetsPropType'];
delete StandardModule['PointPropType'];

module.exports = {
    ...StandardModule,
    get ViewPropTypes(){
        return require('deprecated-react-native-prop-types/DeprecatedViewPropTypes');
    },
    get ColorPropType(){
        return require('deprecated-react-native-prop-types/DeprecatedColorPropType');
    },
    get EdgeInsetsPropType(){
        return require('deprecated-react-native-prop-types/DeprecatedEdgeInsetsPropType')
    },
    get PointPropType(){
        return require('deprecated-react-native-prop-types/DeprecatedPointPropType');
    }
}
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
