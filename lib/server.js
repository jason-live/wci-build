"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _console = _interopRequireDefault(require("console"));

var _config = require("./config");

/*
 * @Author: jason
 * @Date:   2017-11-25 08:52:01
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-22 17:25:00
 */
var isDeveloping = process.env.NODE_ENV === 'default';
var server;

var createServer = function createServer(compiler, listenPath) {
  var o = new _webpackDevServer["default"]((0, _webpack["default"])(compiler), {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    compress: true,
    contentBase: "./".concat(listenPath),
    stats: {
      colors: true
    },
    headers: {
      'X-Custom-Foo': 'bar'
    }
  });
  return o;
};

if (isDeveloping) {
  _console["default"].log('\x1b[32m%s\x1b[0m', '==> 开发环境开始启动...');

  server = createServer(require('./webpack.dev')["default"], _config.DEFAULT_SRC);
}

server.listen(_config.DEFAULT_PORT, _config.DEFAULT_HOSTNAME, function (err) {
  if (err) {
    _console["default"].log('\x1b[31m%s\x1b[0m', err);
  }

  _console["default"].log('');

  _console["default"].log('');

  _console["default"].log('\x1b[32m%s\x1b[0m', "==> \u9879\u76EE\u8FD0\u884C\u5728 ".concat(_config.DEFAULT_HOSTNAME, ":").concat(_config.DEFAULT_PORT));

  _console["default"].log('');

  _console["default"].log('');

  _console["default"].log('\x1b[32m%s\x1b[0m', '==> 即将自动开启浏览器，请稍等...');
});