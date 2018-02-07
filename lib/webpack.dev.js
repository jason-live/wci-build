'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack2 = require('webpack');

var _webpack3 = _interopRequireDefault(_webpack2);

var _openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var _openBrowserWebpackPlugin2 = _interopRequireDefault(_openBrowserWebpackPlugin);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _fs = require('fs');

var _webpack4 = require('./webpack.config');

var _webpack5 = _interopRequireDefault(_webpack4);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION = process.env.npm_package_version || '';

/**
* set srouce-map, use debug
* @type {String}
*/
/*
 * @Author: jason
 * @Date:   2017-11-25 09:18:22
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 16:58:59
 * @Dis this is develop settings
 */

_webpack5.default.devtool = 'cheap-module-eval-source-map';

/**
* set develop entry
* 1. use webpack-dev-hot
* @type {Array}
*/
_webpack5.default.entry = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://' + _config.PROJECT_HOSTNAME + ':' + _config.DEV_PORT, _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_INDEX + '/')];

/**
* set develop output
* @type {Object}
*/
_webpack5.default.output = {
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
  _webpack5.default.module.rules[0].use.push({
    loader: 'eslint-loader'
  });
}

/**
* set develop app styles-loader
* @type {RegExp}
*/
_webpack5.default.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.PROJECT_PATH, _config.PROJECT_DEV_SRC),
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]_[local]_[hash:base64:3]'
    }
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: [(0, _autoprefixer2.default)({
        broswers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
      })]
    }
  }, {
    loader: 'less-loader'
  }]
});

_webpack5.default.module.rules.push({
  test: /\.(png|svg|jpg|gif)$/,
  use: [{
    loader: 'file-loader',
    options: {}
  }]
});

if ((0, _fs.existsSync)(process.cwd() + '/webpack.js')) {
  var _webpack = require(process.cwd() + '/webpack.js');
  var rules = _webpack.rules;
  if (rules && rules.length) {
    rules.map(function (item) {
      _webpack5.default.module.rules.push({
        test: item.test,
        include: _path2.default.resolve(_config.PROJECT_PATH, item.packageName),
        use: [].concat((0, _toConsumableArray3.default)(item.use))
      });
    });
  }
}

_webpack5.default.plugins.push(new _webpack3.default.DefinePlugin({
  'process.env.NODE_ENV': (0, _stringify2.default)('development'),
  'process.env.API': (0, _stringify2.default)(_config.DEV_API),
  'process.env.MODULE': (0, _stringify2.default)(_config.DEV_MODULE)
}));
_webpack5.default.plugins.push(new _webpack3.default.HotModuleReplacementPlugin());
_webpack5.default.plugins.push(new _webpack3.default.NamedModulesPlugin());
_webpack5.default.plugins.push(new _openBrowserWebpackPlugin2.default({
  url: 'http://' + _config.PROJECT_HOSTNAME + ':' + _config.DEV_PORT
}));

exports.default = _webpack5.default;
module.exports = exports['default'];