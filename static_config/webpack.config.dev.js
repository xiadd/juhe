const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  context: __dirname,
  entry: [
    '../public/index.js'
  ],
  output: {
    path: path.resolve('./public/bundles/'),
    filename: "[name]-[hash].js",
    publicPath: 'http://localhost:4000/static/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new ManifestPlugin({
      fileName: 'map.json',
      publicPath: 'http://localhost:4000/static/',
      writeToFileEmit: true,
      stripSrc: '/static/',
    })
  ],
  devServer: {
    publicPath: '/static/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 4000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  }
}
