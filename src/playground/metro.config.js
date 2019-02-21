const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      // ...
      // add needed-to-transform dependencies here
      //
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-native': path.resolve(__dirname, './node_modules/react-native'),
    },
    sourceExts: [
      'js',
      'ts',
      'tsx',
    ],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../framework'),
    path.resolve(__dirname, '../../node_modules/@babel'),

    // FIXME(playground): unable to resolve
    path.resolve(__dirname, '../../node_modules/eva'),
    path.resolve(__dirname, '../../node_modules/lodash'),
    path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
    path.resolve(__dirname, '../../node_modules/react-is'),
  ],
};
