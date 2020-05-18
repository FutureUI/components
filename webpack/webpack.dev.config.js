const path = require('path')
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig,{
  mode:'development',
  entry:{
    app:path.resolve(__dirname, '../example/index.js'),
  },
  output:{
    path:path.resolve(__dirname, '../dist'),
    filename:'[name].[hash:7].js'
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../example/index.html'),
      filename: 'index.html',
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    port: 8080,
    disableHostCheck: true,
  },
})
