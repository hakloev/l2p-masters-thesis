const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./.webpack/webpack.local.config');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  colors: true,
  historyApiFallback: true,
  inline: true,
  // proxy: {
  //   '/api/*': 'http://localhost:8000',
  //   '/auth/*': 'http://localhost:8000',
  //   '/compile': 'http://localhost:8000',
  // },
});

server.listen(3000, err => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at 3000');
});
