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

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _webpack3 = require('./webpack.config');

var _util = require('util');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: jason
 * @Date:   2017-11-25 09:17:35
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 17:44:03
 */
var v = process.env.npm_package_version || '';
var api = _config.PROD_API;
var modules = _config.PROD_MODULE;

if (process.env.RUN_TEST) {
  v = process.env.npm_package_version + '.' + process.env.npm_package_cversion;
  api = _config.TEST_API;
  modules = _config.TEST_MODULE;
}

var extractApp = new _extractTextWebpackPlugin2.default('css/app.' + v + '.[hash:8].css');
var extractAntd = new _extractTextWebpackPlugin2.default('css/lib.' + v + '.[hash:8].css');

_webpack3.config.devtool = 'cheap-module-source-map';

/**
 * [entry description]
 * @type {Object}
 */
_webpack3.config.entry = {
  app: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_INDEX + '/'),
  vendor: _config.VENDOR
};

/**
 * [output description]
 * @type {Object}
 */
_webpack3.config.output = {
  filename: 'js/[name].' + v + '.[chunkHash:8].js',
  path: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_PROD_SRC),
  publicPath: '/'
};

/**
 * [loader description]
 * @type {String}
 */
_webpack3.config.module.rules[0].use.push({
  loader: 'eslint-loader'
});

/**
 * [test description]
 * @type {RegExp}
 */
_webpack3.config.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.PROJECT_PATH, 'node_modules/antd'),
  use: extractAntd.extract([(0, _util.getCssLoader)('antd'), (0, _util.getLessLoader)('antd', require(process.cwd() + '/app/scripts/util/theme'))])
});

/**
 * [test description]
 * @type {RegExp}
 */
_webpack3.config.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_DEV_SRC),
  use: extractApp.extract([(0, _util.getCssLoader)('app'), (0, _util.getPostCssLoader)('app'), (0, _util.getLessLoader)('app')])
});

_webpack3.config.module.rules.push({
  test: /\.(png|svg|jpg|gif)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[ext]?[hash:8]'
    }
  }]
});

/**
 * [__DEV__ description]
 * @type {[type]}
 */
_webpack3.config.plugins.push(new _webpack2.default.DefinePlugin({
  'process.env.NODE_ENV': (0, _stringify2.default)('production'),
  __DEV__: (0, _stringify2.default)(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.API': (0, _stringify2.default)(api),
  'process.env.V': (0, _stringify2.default)(v),
  'process.env.MODULE': (0, _stringify2.default)(modules)
}));

_webpack3.config.plugins.push(extractAntd);
_webpack3.config.plugins.push(extractApp);
_webpack3.config.plugins.push(new _webpack2.default.optimize.CommonsChunkPlugin({
  names: ['vendor', 'manifest'],
  minChunks: Infinity
}));

exports.default = _webpack3.config;
module.exports = exports['default'];