'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _console = require('console');

var _console2 = _interopRequireDefault(_console);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: jason
 * @Date:   2017-11-25 08:52:01
 * @Last Modified by: jason
 * @Last Modified time: 2019-02-14 09:36:41
 */
var isDeveloping = process.env.NODE_ENV === 'development';

var server = void 0;

var createServer = function createServer(compiler, listenPath) {
  var o = new _webpackDevServer2.default((0, _webpack2.default)(compiler), {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    compress: true,
    contentBase: './' + listenPath,
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
  _console2.default.log('\x1b[32m%s\x1b[0m', '==> 开发环境开始启动...');
  server = createServer(require('./webpack.dev'), _config.DEFAULT_SRC);
}

server.listen(_config.DEFAULT_PORT, _config.DEFAULT_HOSTNAME, function (err) {
  if (err) {
    _console2.default.log('\x1b[31m%s\x1b[0m', err);
  }
  _console2.default.log('');
  _console2.default.log('');
  _console2.default.log('\x1b[32m%s\x1b[0m', '==> \u9879\u76EE\u8FD0\u884C\u5728 ' + _config.DEFAULT_HOSTNAME + ':' + _config.DEFAULT_PORT);
  _console2.default.log('');
  _console2.default.log('');
  _console2.default.log('\x1b[32m%s\x1b[0m', '==> 即将自动开启浏览器，请稍等...');
});