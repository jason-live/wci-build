"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _lodash = _interopRequireDefault(require("lodash"));

var _webpackBundleAnalyzer = require("webpack-bundle-analyzer");

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _htmlWebpackIncludeAssetsPlugin = _interopRequireDefault(require("html-webpack-include-assets-plugin"));

var _config = require("./config");

/*
* @Author: jason
* @Date:   2017-11-25 08:51:24
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-26 14:17:24
*/
var dll = _config.DEFAULT_DLL.dll,
    dllPath = _config.DEFAULT_DLL.dllPath;

var urls = _lodash["default"].map(_lodash["default"].filter(dll.manifest, {
  type: 'js'
}), 'url');

var mfs = _lodash["default"].map(_lodash["default"].filter(dll.manifest, {
  type: 'json'
}), 'filename');

var drps = [];

for (var i = 0; i < mfs.length; i += 1) {
  var p = "".concat(dllPath, "/").concat(mfs[i]);
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
    },
    noEmitOnErrors: true
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      include: _path["default"].resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
      use: [{
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [new _htmlWebpackPlugin["default"]({
    template: "".concat(_config.DEFAULT_SRC, "/index.tpl.html"),
    inject: 'body',
    filename: 'index.html',
    title: "".concat(_config.DEFAULT_NAME),
    favicon: "".concat(_config.DEFAULT_SRC, "/assets/wci_favicon.ico")
  }), new _htmlWebpackIncludeAssetsPlugin["default"]({
    assets: (0, _toConsumableArray2["default"])(_lodash["default"].map(urls, function (item) {
      return _lodash["default"].replace(item, '/', '\\/');
    })),
    // 添加的资源相对html的路径
    append: false,
    publicPath: ''
  })].concat((0, _toConsumableArray2["default"])(_lodash["default"].map(drps, function (item) {
    return new _webpack["default"].DllReferencePlugin({
      manifest: item
    });
  })))
};

if (_config.DEFAULT_ANALYZER.open) {
  config.plugins.push(new _webpackBundleAnalyzer.BundleAnalyzerPlugin());
}

var _default = config;
exports["default"] = _default;