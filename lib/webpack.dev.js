"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _path = _interopRequireDefault(require("path"));

var _webpack2 = _interopRequireDefault(require("webpack"));

var _openBrowserWebpackPlugin = _interopRequireDefault(require("open-browser-webpack-plugin"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _fs = require("fs");

var _webpack3 = _interopRequireDefault(require("./webpack.config"));

var _config = require("./config");

/*
 * @Author: jason
 * @Date:   2017-11-25 09:18:22
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-22 16:47:44
 * @Dis this is develop settings
 */

/**
* set mode
* @type {String}
*/
_webpack3["default"].mode = 'development';
/**
* set srouce-map, use debug
* @type {String}
*/

_webpack3["default"].devtool = 'cheap-module-eval-source-map';
/**
 * set devServer
 * @type {Object}
 */

_webpack3["default"].devServer = {
  contentBase: './app'
},
/**
* set develop entry
* 1. use webpack-dev-hot
* @type {Array}
*/
// config.entry = [
//   'webpack/hot/dev-server',
//   `webpack-dev-server/client?http://${DEFAULT_HOSTNAME}:${DEFAULT_PORT}`,
//   path.resolve(DEFAULT_PATH, `${DEFAULT_INDEX}/`)
// ];
_webpack3["default"].entry = {
  app: _path["default"].resolve(_config.DEFAULT_PATH, "".concat(_config.DEFAULT_INDEX, "/"))
};
/**
* set develop output
* @type {Object}
*/

_webpack3["default"].output = {
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: _path["default"].resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
  publicPath: "http://".concat(_config.DEFAULT_HOSTNAME, ":").concat(_config.DEFAULT_PORT, "/")
};
/**
* set eslint
* @param  {[type]} DEV_ESLINT [description]
* @return {[type]}          [description]
*/

if (_config.DEV_ESLINT) {
  _webpack3["default"].module.rules[0].use.push({
    loader: 'eslint-loader'
  });
}
/**
* set develop app styles-loader
* @type {RegExp}
*/


_webpack3["default"].module.rules.push({
  test: /\.less/,
  include: _path["default"].resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
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
      plugins: [(0, _autoprefixer["default"])({
        broswers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
      })]
    }
  }, {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true
    }
  }]
});
/**
 * set develop app file-loader
 * @type {RegExp}
 */


_webpack3["default"].module.rules.push({
  test: /\.(png|svg|jpg|gif|eot|svg|ttf|woff)$/,
  use: [{
    loader: 'file-loader',
    options: {}
  }]
});
/**
 * Set up the custom loader
 * @param  {[type]} existsSync [description]
 * @return {[type]}            [description]
 */


if ((0, _fs.existsSync)("".concat(process.cwd(), "/build/wci.custom.js"))) {
  var _webpack = require("".concat(process.cwd(), "/build/wci.custom.js"));

  var rules = _webpack.rules;

  if (rules && rules.length) {
    rules.map(function (item) {
      _webpack3["default"].module.rules.push({
        test: item.test,
        include: _path["default"].resolve(_config.DEFAULT_PATH, item.packageName),
        use: (0, _toConsumableArray2["default"])(item.useDev)
      });
    });
  }
}
/**
 * set plugin
 * @type {[type]}
 */


_webpack3["default"].plugins.push(new _webpack2["default"].DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.MODULE': JSON.stringify(_config.DEFAULT_APIS)
}));

_webpack3["default"].plugins.push(new _webpack2["default"].HotModuleReplacementPlugin());

_webpack3["default"].plugins.push(new _webpack2["default"].NamedModulesPlugin());

_webpack3["default"].plugins.push(new _openBrowserWebpackPlugin["default"]({
  url: "http://".concat(_config.DEFAULT_HOSTNAME, ":").concat(_config.DEFAULT_PORT)
}));

var _default = _webpack3["default"];
exports["default"] = _default;