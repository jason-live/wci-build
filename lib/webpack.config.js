'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _webpackBundleAnalyzer = require('webpack-bundle-analyzer');

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

var _htmlWebpackIncludeAssetsPlugin2 = _interopRequireDefault(_htmlWebpackIncludeAssetsPlugin);

var _config = require('./config');

var _flyDll = require('fly-dll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: jason
* @Date:   2017-11-25 08:51:24
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-22 16:15:43
*/
var urls = _lodash2.default.map(_lodash2.default.filter(_flyDll.dll.manifest, { type: 'js' }), 'url');
var mfs = _lodash2.default.map(_lodash2.default.filter(_flyDll.dll.manifest, { type: 'json' }), 'filename');

var drps = [];
for (var i = 0; i < mfs.length; i += 1) {
  var p = 'fly-dll/dll/' + mfs[i];
  drps.push(require(p));
}

/**
 * [config description]
 * @type {Object}
 */
var config = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true
    }
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
  }), new _htmlWebpackIncludeAssetsPlugin2.default({
    assets: [].concat((0, _toConsumableArray3.default)(_lodash2.default.map(urls, function (item) {
      return _lodash2.default.replace(item, '/', '\\/');
    }))), // 添加的资源相对html的路径
    append: false,
    publicPath: ''
  })].concat((0, _toConsumableArray3.default)(_lodash2.default.map(drps, function (item) {
    return new _webpack2.default.DllReferencePlugin({
      manifest: item
    });
  })), [new _webpackBundleAnalyzer.BundleAnalyzerPlugin()])
};

exports.default = config;
module.exports = exports.default;