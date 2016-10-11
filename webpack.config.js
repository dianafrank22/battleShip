const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const INPUT_DIR  = path.resolve(__dirname, 'src')
const PUBLIC     = path.resolve(__dirname, 'public')


module.exports = {

  entry:{
  javascript: `${INPUT_DIR}/app.js`,
  html: `${INPUT_DIR}/index.html`,
css: `${PUBLIC}/css/main.css`
},
  output: {
    path: OUTPUT_DIR,
    filename: "/[name].js",
  },
  watch: true,
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battleship',
      xhtml: true,
      template: require('html-webpack-template'),
      appMountId: 'container'
    }),
    new ExtractTextPlugin(`${PUBLIC}/css/main.css`, {
      allChunks: true
    }),
  ],
  module:{
    include: path.join(__dirname, 'src'),
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    },
    { test: /\html$/, loader: "file?name=[name].[ext]" },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }
    ]
  }
}
