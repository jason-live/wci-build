/*
 * @Author: jason
 * @Date:   2017-11-25 09:17:35
 * @Last Modified by: jason
 * @Last Modified time: 2019-11-05 11:32:16
 */
import path from 'path';
import webpack from 'webpack';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import autoprefixer from 'autoprefixer';
import { existsSync, readFileSync } from 'fs';
import config from './webpack.config';
import {
  DEFAULT_PATH,
  DEFAULT_SRC,
  DEFAULT_INDEX,
  DEFAULT_APIS,
  DEFAULT_OUTPUT
} from './config';

const packagePath = 'package.json';
const files = readFileSync(`${DEFAULT_PATH}/${packagePath}`);

let v = JSON.parse(files.toString()).version || 'none';

if (process.env.RUN_TEST) {
  v = `${v}.release`;
}

if (process.env.RUN_DEV) {
  v = `${v}.dev`;
}

/**
* set mode
* @type {String}
*/
config.mode = 'production';

/**
 * [entry description]
 * @type {Object}
 */
config.entry = {
  app: path.resolve(DEFAULT_PATH, `${DEFAULT_INDEX}/`)
};

/**
 * [output description]
 * @type {Object}
 */
config.output = {
  filename: `js/[name].${v}.[chunkHash:8].min.js`,
  chunkFilename: `js/[name].${v}.[chunkHash:8].min.js`,
  path: path.resolve(DEFAULT_PATH, DEFAULT_OUTPUT),
  publicPath: '/'
};

/**
 * [loader description]
 * @type {String}
 */
config.module.rules[0].use.push({
  loader: 'eslint-loader'
});

/**
 * [test description]
 * @type {RegExp}
 */
config.module.rules.push({
  test: /\.less/,
  include: path.resolve(DEFAULT_PATH, DEFAULT_SRC),
  use: [
    {
      loader: MiniCssExtractPlugin.loader
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
      options: {
        name: 'assets/[name].[ext]?[hash:8]'
      }
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          ...item.useProd
        ]
      });
    });
  }
}

config.plugins.push(new MiniCssExtractPlugin({
  filename: `css/[name].${v}.[hash].css`,
  chunkFilename: `css/[name].${v}.[hash].css`
}));

/**
 * [__DEV__ description]
 * @type {[type]}
 */
config.plugins.push(new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.BUILD_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.MODULE': JSON.stringify(DEFAULT_APIS)
}));

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

export default config;
