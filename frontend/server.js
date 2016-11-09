const express = require('express');

const app = express();

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpack = require('webpack');
const config = require('./.webpack/webpack.local.config');

const compiler = webpack(config);

app.use(express.static(__dirname));
app.use(hotMiddleware(compiler));
app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.listen(3000);
