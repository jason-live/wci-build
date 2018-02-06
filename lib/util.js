'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCssLoader = exports.getLessLoader = exports.getPostCssLoader = exports.getStyleLoader = undefined;

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [getStyleLoader description]
 * @return {[type]} [description]
 */
var getStyleLoader = function getStyleLoader() {
  return { loader: 'style-loader' };
};

/**
 * [getCssLoader description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
var getCssLoader = function getCssLoader(type) {
  var o = {
    loader: 'css-loader'
  };
  if (type === 'app') {
    o.options = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]_[local]_[hash:base64:3]'
    };
  }
  return o;
};

/**
 * [getPostCssLoader description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
var getPostCssLoader = function getPostCssLoader(type) {
  var o = {
    loader: 'postcss-loader'
  };
  if (type === 'app') {
    o.options = {
      plugins: [(0, _autoprefixer2.default)({
        broswers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
      })]
    };
  }
  return o;
};

/**
 * [getLessLoader description]
 * @param  {[type]} type  [description]
 * @param  {[type]} theme [description]
 * @return {[type]}       [description]
 */
var getLessLoader = function getLessLoader(type, theme) {
  var o = {
    loader: 'less-loader'
  };
  if (type === 'antd') {
    o.options = {
      modifyVars: theme
    };
  }
  return o;
};

exports.getStyleLoader = getStyleLoader;
exports.getPostCssLoader = getPostCssLoader;
exports.getLessLoader = getLessLoader;
exports.getCssLoader = getCssLoader;