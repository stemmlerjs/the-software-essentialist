// webpack.config.js

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtensionReloader = require('webpack-extension-reloader');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  entry: {
    background: './src/background.ts',
    contentScript: './src/content.ts',
    popup: './src/popup/popup.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' },
        { from: 'manifest.json', to: 'manifest.json' }
      ]
    }),
    ...(isDev
      ? [
          new ExtensionReloader({
            manifest: path.resolve(__dirname, 'manifest.json'),
            port: 9090,
            reloadPage: true,
            entries: {
              background: 'background',
              contentScript: 'contentScript',
              extensionPage: 'popup'
            }
          })
        ]
      : [])
  ]
};