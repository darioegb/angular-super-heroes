// DEV Webpack configuration used to build the service worker

const path = require('path');

const webBuildTargetFolder = path.join(__dirname, 'dist', 'superheroes');
const targetServiceWorkerFilename = 'sw.js';

module.exports = {
  target: 'node',
  mode: 'none',
  // WARNING: commented out to disable source maps
  //devtool: 'inline-source-map',
  entry: {
    index: path.join(__dirname, 'src', 'sw.js'),
  },
  resolve: { extensions: ['.js'] },
  output: {
    path: webBuildTargetFolder,
    filename: targetServiceWorkerFilename,
  },
  module: {
    rules: [],
  },
  plugins: [],
};
