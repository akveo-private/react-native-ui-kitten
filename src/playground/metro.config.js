const path = require('path');
const env = require('./env');

const frameworkModules = [
  path.resolve(__dirname, '../date-fns'),
  path.resolve(__dirname, '../eva-icons'),
  path.resolve(__dirname, '../framework'),
  path.resolve(__dirname, '../moment'),
];

const moduleDependencies = [
  // react-native-ui-kitten
  path.resolve(env.EVA_PATH, 'eva'),
  path.resolve(env.EVA_PATH, 'processor'),
  path.resolve(__dirname, '../../node_modules/@eva-design/dss'),
  path.resolve(__dirname, '../../node_modules/hoist-non-react-statics'),
  path.resolve(__dirname, '../../node_modules/lodash.merge'),
  path.resolve(__dirname, '../../node_modules/fecha'),

  // @ui-kitten/eva-icons
  path.resolve(__dirname, '../../node_modules/react-native-eva-icons'),
  path.resolve(__dirname, '../../node_modules/react-native-svg'),

  // @ui-kitten/moment
  path.resolve(__dirname, '../../node_modules/moment'),

  // @ui-kitten/date-fns
  path.resolve(__dirname, '../../node_modules/date-fns'),

  // external
  path.resolve(__dirname, '../../node_modules/react-is'),
];

const playgroundExtraModules = {
  '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
  'react': path.resolve(__dirname, './node_modules/react'),
  'react-native': path.resolve(__dirname, './node_modules/react-native'),
};

module.exports = {
  projectRoot: path.resolve(__dirname),
  resolver: {
    extraNodeModules: playgroundExtraModules,
  },
  watchFolders: [
    ...frameworkModules,
    ...moduleDependencies,
  ],
};
