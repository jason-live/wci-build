'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _console = require('console');

var _console2 = _interopRequireDefault(_console);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: jason
 * @Date:   2017-11-25 08:52:01
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 22:02:27
 */
var isDeveloping = process.env.NODE_ENV === 'development';
var PORT = isDeveloping ? _config.DEV_PORT : _config.PROD_PORT;

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
  _console2.default.log(_chalk2.default.green('==> 开发环境开始启动...'));
  server = createServer(require('./webpack.dev'), _config.PROJECT_DEV_SRC);
} else {
  _console2.default.log(_chalk2.default.green('==> 编译环境开始启动...'));
  server = createServer(require('./webpack.prod'), _config.PROJECT_PROD_SRC);
}

server.listen(PORT, _config.PROJECT_HOSTNAME, function (err) {
  if (err) {
    _console2.default.log(_chalk2.default.red(err));
  }
  _console2.default.log(_chalk2.default.green('==> The app is running at ' + _config.PROJECT_HOSTNAME + ':' + PORT));
  _console2.default.log(_chalk2.default.green('==> 即将自动开启浏览器，请稍等...'));
});