/*
* @Author: jason
* @Date:   2017-11-25 08:51:24
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-26 14:17:24
*/
import path from 'path';
import webpack from 'webpack';
import _ from 'lodash';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import {
  DEFAULT_PATH,
  DEFAULT_SRC,
  DEFAULT_NAME,
  DEFAULT_DLL,
  DEFAULT_ANALYZER,
} from './config';

const { dll, dllPath, dllType = 'antd' } = DEFAULT_DLL;

const urlsAntd = _.map(_.filter(dll.manifest, { type: 'js', name: dllType }), 'url');
const urlsCommon = _.map(_.filter(dll.manifest, { type: 'js', name: 'common' }), 'url');

const mfsAntd = _.map(_.filter(dll.manifest, { type: 'json', name: dllType }), 'url');
const mfsCommon = _.map(_.filter(dll.manifest, { type: 'json', name: 'common' }), 'url');

const urls = _.concat(urlsAntd, urlsCommon);
const mfs = _.concat(mfsAntd, mfsCommon);

const drps = [];
for (let i = 0; i < mfs.length; i += 1) {
  const p = `${dllPath}/${mfs[i]}`;
  drps.push(require(p));
}


/**
 * [config description]
 * @type {Object}
 */
const config = {
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
    rules: [
      {
        test: /\.js|jsx$/,
        include: path.resolve(DEFAULT_PATH, DEFAULT_SRC),
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${DEFAULT_SRC}/index.tpl.html`,
      inject: 'body',
      filename: 'index.html',
      title: `${DEFAULT_NAME}`,
      favicon: `${DEFAULT_SRC}/assets/wci_favicon.ico`
    }),
    new HtmlIncludeAssetsPlugin({
      assets: [..._.map(urls, item => _.replace(item, '/', '\\/'))], // 添加的资源相对html的路径
      append: false,
      publicPath: ''
    }),
    ..._.map(drps, item => new webpack.DllReferencePlugin({
      manifest: item
    }))
  ]
};

if (DEFAULT_ANALYZER.open) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

export default config;
