const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const config = require('./webpack.base.config');

config.output.path = path.join(__dirname, '..', 'dist');

config.plugins = config.plugins.concat([
  new BundleTracker({ filename: 'webpack-stats-prod.json' }),

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),

  // remove debug from react
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

]);

module.exports = config;
