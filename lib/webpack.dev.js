'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var _openBrowserWebpackPlugin2 = _interopRequireDefault(_openBrowserWebpackPlugin);

var _webpack3 = require('./webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _util = require('./util');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: jason
 * @Date:   2017-11-25 09:18:22
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 16:58:59
 * @Dis this is develop settings
 */

var VERSION = process.env.npm_package_version || '';

/**
* set srouce-map, use debug
* @type {String}
*/
_webpack4.default.devtool = 'cheap-module-eval-source-map';

/**
* set develop entry
* 1. use webpack-dev-hot
* @type {Array}
*/
_webpack4.default.entry = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://' + _config.PROJECT_HOSTNAME + ':' + _config.DEV_PORT, _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_INDEX + '/')];

/**
* set develop output
* @type {Object}
*/
_webpack4.default.output = {
  filename: 'js/bundle.js',
  path: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_DEV_SRC),
  publicPath: 'http://' + _config.PROJECT_HOSTNAME + ':' + _config.DEV_PORT + '/'
};

/**
* [if description]
* @param  {[type]} ISESLINT [description]
* @return {[type]}          [description]
*/
if (_config.ISESLINT) {
  _webpack4.default.module.rules[0].use.push({
    loader: 'eslint-loader'
  });
}

/**
* set develop antd styles-loader
* @type {RegExp}
*/
_webpack4.default.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.PROJECT_PATH, 'node_modules/antd'),
  use: [(0, _util.getStyleLoader)(), (0, _util.getCssLoader)('antd'), (0, _util.getLessLoader)('antd', require(process.cwd() + '/app/scripts/util/theme'))]
});

/**
* set develop app styles-loader
* @type {RegExp}
*/
_webpack4.default.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_DEV_SRC),
  use: [(0, _util.getStyleLoader)(), (0, _util.getCssLoader)('app'), (0, _util.getPostCssLoader)('app'), (0, _util.getLessLoader)('app')]
});

_webpack4.default.module.rules.push({
  test: /\.(png|svg|jpg|gif)$/,
  use: [{
    loader: 'file-loader',
    options: {}
  }]
});

_webpack4.default.plugins.push(new _webpack2.default.DefinePlugin({
  'process.env.NODE_ENV': (0, _stringify2.default)('development'),
  'process.env.API': (0, _stringify2.default)(_config.DEV_API),
  'process.env.V': (0, _stringify2.default)(VERSION),
  'process.env.MODULE': (0, _stringify2.default)(_config.DEV_MODULE)
}));
_webpack4.default.plugins.push(new _webpack2.default.HotModuleReplacementPlugin());
_webpack4.default.plugins.push(new _webpack2.default.NamedModulesPlugin());
_webpack4.default.plugins.push(new _openBrowserWebpackPlugin2.default({
  url: 'http://' + _config.PROJECT_HOSTNAME + ':' + _config.DEV_PORT
}));

exports.default = _webpack4.default;
module.exports = exports['default'];