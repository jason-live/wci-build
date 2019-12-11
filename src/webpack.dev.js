/*
 * @Author: jason
 * @Date:   2017-11-25 09:18:22
 * @Last Modified by: jason
 * @Last Modified time: 2019-11-05 11:32:36
 * @Dis this is develop settings
 */

import path from 'path';
import webpack from 'webpack';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { existsSync } from 'fs';
import config from './webpack.config';
import {
  DEFAULT_HOSTNAME,
  DEFAULT_SRC,
  DEFAULT_INDEX,
  DEFAULT_PATH,
  DEFAULT_PORT,
  DEFAULT_APIS,
  DEV_ESLINT
} from './config';

/**
* set mode
* @type {String}
*/
config.mode = 'development';

/**
* set srouce-map, use debug
* @type {String}
*/
config.devtool = 'cheap-module-eval-source-map';

/**
 * set devServer
 * @type {Object}
 */
config.devServer = {
  contentBase: `./${DEFAULT_SRC}`
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

config.entry = {
  app: path.resolve(DEFAULT_PATH, `${DEFAULT_INDEX}/`)
}

/**
* set develop output
* @type {Object}
*/
config.output = {
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: path.resolve(DEFAULT_PATH, DEFAULT_SRC),
  publicPath: `http://${DEFAULT_HOSTNAME}:${DEFAULT_PORT}/`
};

/**
* set eslint
* @param  {[type]} DEV_ESLINT [description]
* @return {[type]}          [description]
*/
if (DEV_ESLINT) {
  config.module.rules[0].use.push({
    loader: 'eslint-loader'
  });
}

/**
* set develop app styles-loader
* @type {RegExp}
*/
config.module.rules.push({
  test: /\.less/,
  include: path.resolve(DEFAULT_PATH, DEFAULT_SRC),
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]_[local]_[hash:base64:3]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer({
            broswers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
          })
        ]
      }
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
  ]
});

/**
 * set develop app file-loader
 * @type {RegExp}
 */
config.module.rules.push({
  test: /\.(png|svg|jpg|gif|eot|svg|ttf|woff)$/,
  use: [
    {
      loader: 'file-loader',
      options: {}
    }
  ]
});

/**
 * Set up the custom loader
 * @param  {[type]} existsSync [description]
 * @return {[type]}            [description]
 */
if (existsSync(`${process.cwd()}/build/wci.custom.js`)) {
  const webpack = require(`${process.cwd()}/build/wci.custom.js`);
  const rules = webpack.rules;
  if (rules && rules.length) {
    rules.map((item) => {
      config.module.rules.push({
        test: item.test,
        include: path.resolve(DEFAULT_PATH, item.packageName),
        use: [...item.useDev]
      });
    });
  }
}

/**
 * set plugin
 * @type {[type]}
 */
config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.BUILD_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.MODULE': JSON.stringify(DEFAULT_APIS)
}));
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new OpenBrowserPlugin({
  url: `http://${DEFAULT_HOSTNAME}:${DEFAULT_PORT}`
}));

export default config;
