"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _path = _interopRequireDefault(require("path"));

var _webpack2 = _interopRequireDefault(require("webpack"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _fs = require("fs");

var _webpack3 = _interopRequireDefault(require("./webpack.config"));

var _config = require("./config");

/*
 * @Author: jason
 * @Date:   2017-11-25 09:17:35
 * @Last Modified by: jason
 * @Last Modified time: 2019-11-05 11:32:16
 */
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var packagePath = 'package.json';
var files = (0, _fs.readFileSync)("".concat(_config.DEFAULT_PATH, "/").concat(packagePath));
var v = JSON.parse(files.toString()).version || 'none';

if (process.env.RUN_TEST) {
  v = "".concat(v, ".release");
}

if (process.env.RUN_DEV) {
  v = "".concat(v, ".dev");
}
/**
* set mode
* @type {String}
*/


_webpack3["default"].mode = 'production';
/**
 * [entry description]
 * @type {Object}
 */

_webpack3["default"].entry = {
  app: _path["default"].resolve(_config.DEFAULT_PATH, "".concat(_config.DEFAULT_INDEX, "/"))
};
/**
 * [output description]
 * @type {Object}
 */

_webpack3["default"].output = {
  filename: "js/[name].".concat(v, ".[chunkHash:8].min.js"),
  chunkFilename: "js/[name].".concat(v, ".[chunkHash:8].min.js"),
  path: _path["default"].resolve(_config.DEFAULT_PATH, _config.DEFAULT_OUTPUT),
  publicPath: '/'
};
/**
 * [loader description]
 * @type {String}
 */

_webpack3["default"].module.rules[0].use.push({
  loader: 'eslint-loader'
});
/**
 * [test description]
 * @type {RegExp}
 */


_webpack3["default"].module.rules.push({
  test: /\.less/,
  include: _path["default"].resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
  use: [{
    loader: MiniCssExtractPlugin.loader
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
    options: {
      name: 'assets/[name].[ext]?[hash:8]'
    }
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
        use: [{
          loader: MiniCssExtractPlugin.loader
        }].concat((0, _toConsumableArray2["default"])(item.useProd))
      });
    });
  }
}

_webpack3["default"].plugins.push(new MiniCssExtractPlugin({
  filename: "css/[name].".concat(v, ".[hash].css"),
  chunkFilename: "css/[name].".concat(v, ".[hash].css")
}));
/**
 * [__DEV__ description]
 * @type {[type]}
 */


_webpack3["default"].plugins.push(new _webpack2["default"].DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.BUILD_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.MODULE': JSON.stringify(_config.DEFAULT_APIS)
})); // 4.0以前版本
// config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
//   names: _.keys(DEFAULT_LIBS).concat(['manifest']),
//   minChunks: Infinity
// }));
// 4.0以后版本 移入config
// config.optimization = {
//   splitChunks: {
//     chunks: 'all'
//   }
// };


var _default = _webpack3["default"];
exports["default"] = _default;
module.exports = exports.default;