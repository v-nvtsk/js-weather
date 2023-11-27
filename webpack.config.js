/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const config = {
    mode: env.mode ?? 'development',
    target: 'browserslist',
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
      clean: true, // Clean the output directory before emit.
      path: path.resolve(__dirname, 'prod'),
      filename: 'main-[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]'
    },
    devServer: {
      static: path.resolve(__dirname, 'prod'),
      hot: true,
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            minimize: true
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
          template: path.resolve(__dirname, 'src', 'public', 'index.html'),
          filename: 'index.html'
        }),
      new webpack.ProgressPlugin()
    ]
  }
  return config;
}