/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 22:02:15
 */

const path = require('path');
const setting = require('../wci.json');


/**
 * PROJECT_PATH: 项目目录
 * PROJECT_DEV_SRC: 代码目录
 * PROJECT_PROD_SRC: 生产目录
 * PROJECT_HOSTNAME: 开发域名
 * PROJECT_INDEX: 入口文件
 * DEV_PORT: 开发端口
 * PROD_PORT: 生产端口
 * PROD_API: 生产接口
 * VENDOR: 需要单独打包的npm依赖
 * ISESLINT: 开发环境是否开启eslint强校验
 * @type {Object}
 */
const config = {
  PROJECT_PATH: path.resolve(__dirname, '../'),
  PROJECT_DEV_SRC: setting.dev.src,
  PROJECT_PROD_SRC: setting.prod.src,
  PROJECT_HOSTNAME: setting.hostname,
  APP_INDEX: setting.index,
  DEV_PORT: setting.dev.port,
  DEV_API: setting.dev.api,
  DEV_MODULE: setting.dev.module,
  PROD_PORT: setting.prod.port,
  PROD_API: setting.prod.api,
  PROD_MODULE: setting.prod.module,
  TEST_API: setting.test.api,
  TEST_MODULE: setting.test.module,
  VERSION: setting.version,
  ISESLINT: setting.dev.is_eslint,
  VENDOR: [
    'react',
    'react-dom',
    'axios',
    'classnames',
    'prop-types',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk',
  ],
};

module.exports = config;
