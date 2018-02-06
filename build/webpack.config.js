/*
* @Author: jason
* @Date:   2017-11-25 08:51:24
* @Last Modified by:   jason
* @Last Modified time: 2017-11-25 10:45:39
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configuration = require('./config');
const autoprefixer = require('autoprefixer');

/**
 * [config description]
 * @type {Object}
 */
const config = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: path.resolve(configuration.PROJECT_PATH, configuration.PROJECT_DEV_SRC),
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${configuration.PROJECT_DEV_SRC}/index.tpl.html`,
      inject: 'body',
      filename: 'index.html',
      favicon: `${configuration.PROJECT_DEV_SRC}/assets/favicon.ico`,
      title: '微医美',
    }),
  ],
};

/**
 * [getStyleLoader description]
 * @return {[type]} [description]
 */
const getStyleLoader = () => ({ loader: 'style-loader' });

/**
 * [getCssLoader description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
const getCssLoader = (type) => {
  const o = {
    loader: 'css-loader',
  };
  if (type === 'app') {
    o.options = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]_[local]_[hash:base64:3]',
    };
  }
  return o;
};

/**
 * [getPostCssLoader description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
const getPostCssLoader = (type) => {
  const o = {
    loader: 'postcss-loader',
  };
  if (type === 'app') {
    o.options = {
      plugins: [
        autoprefixer({
          broswers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
      ],
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
const getLessLoader = (type, theme) => {
  const o = {
    loader: 'less-loader',
  };
  if (type === 'antd') {
    o.options = {
      modifyVars: theme,
    };
  }
  return o;
};

module.exports = {
  config,
  util: {
    getStyleLoader,
    getPostCssLoader,
    getLessLoader,
    getCssLoader,
  },
};
