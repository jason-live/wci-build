/*
 * @Author: jason
 * @Date:   2017-11-25 09:17:35
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 17:44:03
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { config, util } = require('./webpack.config');
const configuration = require('./config');
const theme = require('../app/scripts/util/theme');

const {
  getPostCssLoader,
  getLessLoader,
  getCssLoader,
} = util;

const {
  PROJECT_PATH,
  PROJECT_DEV_SRC,
  PROJECT_PROD_SRC,
  PROD_API,
  PROD_MODULE,
  TEST_API,
  TEST_MODULE,
  APP_INDEX,
  VENDOR,
} = configuration;

let v = process.env.npm_package_version || '';
let api = PROD_API;
let modules = PROD_MODULE;

if (process.env.RUN_TEST) {
  v = `${process.env.npm_package_version}.${process.env.npm_package_cversion}`;
  api = TEST_API;
  modules = TEST_MODULE;
}

const extractApp = new ExtractTextPlugin(`css/app.${v}.[hash:8].css`);
const extractAntd = new ExtractTextPlugin(`css/lib.${v}.[hash:8].css`);

config.devtool = 'cheap-module-source-map';

/**
 * [entry description]
 * @type {Object}
 */
config.entry = {
  app: path.resolve(PROJECT_PATH, `${APP_INDEX}/`),
  vendor: VENDOR,
};

/**
 * [output description]
 * @type {Object}
 */
config.output = {
  filename: `js/[name].${v}.[chunkHash:8].js`,
  path: path.resolve(PROJECT_PATH, PROJECT_PROD_SRC),
  publicPath: '/',
};

/**
 * [loader description]
 * @type {String}
 */
config.module.rules[0].use.push({
  loader: 'eslint-loader',
});

/**
 * [test description]
 * @type {RegExp}
 */
config.module.rules.push({
  test: /\.less/,
  include: path.resolve(PROJECT_PATH, 'node_modules/antd'),
  use: extractAntd.extract([getCssLoader('antd'), getLessLoader('antd', theme)]),
});

/**
 * [test description]
 * @type {RegExp}
 */
config.module.rules.push({
  test: /\.less/,
  include: path.resolve(PROJECT_PATH, PROJECT_DEV_SRC),
  use: extractApp.extract([getCssLoader('app'), getPostCssLoader('app'), getLessLoader('app')]),
});

config.module.rules.push({
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[ext]?[hash:8]',
      },
    },
  ],
});

/**
 * [__DEV__ description]
 * @type {[type]}
 */
config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.API': JSON.stringify(api),
  'process.env.V': JSON.stringify(v),
  'process.env.MODULE': JSON.stringify(modules),
}));

config.plugins.push(extractAntd);
config.plugins.push(extractApp);
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor', 'manifest'],
  minChunks: Infinity,
}));

module.exports = config;
