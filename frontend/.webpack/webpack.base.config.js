const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,

  devtool: 'source-map',

  entry: [
    '../src/index.js',
  ],

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery': 'jquery',
    }),
  ],

  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     exclude: /node_modules/,
    //     include: path.join(__dirname, 'src'),
    //     loader: 'eslint-loader',
    //   },
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '..', 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '..', 'styles'),
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff2',
        },
      },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
    ],
  },

  sassLoader: {
    includePath: [
      path.join(__dirname, '..', 'styles')
    ],
  },

  eslint: {
    configFile: '../.eslintrc.json',
  },

  // resolve: {
  //   modulesDirectories: ['node_modules'],
  //   extensions: ['', '.js', '.jsx'],
  // },
};
