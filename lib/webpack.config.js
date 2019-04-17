'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [config description]
 * @type {Object}
 */
var config = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      include: _path2.default.resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [new _htmlWebpackPlugin2.default({
    template: _config.DEFAULT_SRC + '/index.tpl.html',
    inject: 'body',
    filename: 'index.html',
    title: '' + _config.DEFAULT_NAME,
    favicon: _config.DEFAULT_SRC + '/assets/wci_favicon.ico'
  })]
}; /*
   * @Author: jason
   * @Date:   2017-11-25 08:51:24
    * @Last Modified by: jason
    * @Last Modified time: 2019-02-15 14:39:27
   */
exports.default = config;
module.exports = exports.default;