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

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _fs = require('fs');

var _webpack4 = require('./webpack.config');

var _webpack5 = _interopRequireDefault(_webpack4);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var packagePath = 'package.json'; /*
                                   * @Author: jason
                                   * @Date:   2017-11-25 09:17:35
                                   * @Last Modified by: jason
                                   * @Last Modified time: 2019-09-22 16:10:57
                                   */

var files = (0, _fs.readFileSync)(_config.DEFAULT_PATH + '/' + packagePath);

var v = JSON.parse(files.toString()).version || 'none';

if (process.env.RUN_TEST) {
  v = v + '.release';
}

if (process.env.RUN_DEV) {
  v = v + '.dev';
}

var extractApp = new _extractTextWebpackPlugin2.default('css/app.' + v + '.[hash:8].css');
var extractAntd = new _extractTextWebpackPlugin2.default('css/lib.' + v + '.[hash:8].css');

/**
* set mode
* @type {String}
*/
_webpack5.default.mode = 'production';

/**
 * [entry description]
 * @type {Object}
 */
_webpack5.default.entry = {
  app: _path2.default.resolve(_config.DEFAULT_PATH, _config.DEFAULT_INDEX + '/')
};

/**
 * [output description]
 * @type {Object}
 */
_webpack5.default.output = {
  filename: 'js/[name].' + v + '.[chunkHash:8].min.js',
  chunkFilename: 'js/[name].' + v + '.[chunkHash:8].min.js',
  path: _path2.default.resolve(_config.DEFAULT_PATH, _config.DEFAULT_OUTPUT),
  publicPath: '/'
};

/**
 * [loader description]
 * @type {String}
 */
_webpack5.default.module.rules[0].use.push({
  loader: 'eslint-loader'
});

/**
 * [test description]
 * @type {RegExp}
 */
_webpack5.default.module.rules.push({
  test: /\.less/,
  include: _path2.default.resolve(_config.DEFAULT_PATH, _config.DEFAULT_SRC),
  use: extractApp.extract([{
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
    loader: 'less-loader',
    options: {
      javascriptEnabled: true
    }
  }])
});

/**
 * set develop app file-loader
 * @type {RegExp}
 */
_webpack5.default.module.rules.push({
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
if ((0, _fs.existsSync)(process.cwd() + '/build/wci.custom.js')) {
  var _webpack = require(process.cwd() + '/build/wci.custom.js');
  var rules = _webpack.rules;
  if (rules && rules.length) {
    rules.map(function (item) {
      _webpack5.default.module.rules.push({
        test: item.test,
        include: _path2.default.resolve(_config.DEFAULT_PATH, item.packageName),
        use: extractAntd.extract([].concat((0, _toConsumableArray3.default)(item.useProd)))
      });
    });
  }
}

/**
 * [__DEV__ description]
 * @type {[type]}
 */
_webpack5.default.plugins.push(new _webpack3.default.DefinePlugin({
  __DEV__: (0, _stringify2.default)(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.NODE_ENV': (0, _stringify2.default)(process.env.NODE_ENV),
  'process.env.MODULE': (0, _stringify2.default)(_config.DEFAULT_APIS)
}));

_webpack5.default.plugins.push(extractAntd);
_webpack5.default.plugins.push(extractApp);

// 4.0以前版本
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

exports.default = _webpack5.default;
module.exports = exports.default;