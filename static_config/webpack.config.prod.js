const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const getEntry = require('./getEntry')

module.exports = {
  context: __dirname,
  entry: getEntry(path.resolve(__dirname, '../public/scripts')),
  output: {
    path: path.resolve('./public/'),
    filename: '[name]-[hash].js',
    publicPath: 'static/bundles/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'map.json',
      publicPath: '/static/',
      writeToFileEmit: true,
      stripSrc: '/static/'
    }),
    new CleanPlugin(['*'], {
      root: path.resolve('./assets/bundles/')
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
  ]
}
