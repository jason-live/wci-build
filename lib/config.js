'use strict';

/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 22:02:15
 */

var projectDirectory = process.cwd();
var setting = require(projectDirectory + '/wci.json');

var MODULES = {};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  MODULES = setting.dev.modules;
};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  if (process.env.RUN_TEST) {
    MODULES = setting.test.modules;
  } else {
    MODULES = setting.prod.modules;
  };
};

/**
 * PROJECT_PATH: 项目目录
 * PROJECT_DEV_SRC: 代码目录
 * PROJECT_PROD_SRC: 生产目录
 * PROJECT_HOSTNAME: 开发域名
 * PROJECT_INDEX: 入口文件
 * VENDOR: 需要单独打包的npm依赖
 * ISESLINT: 开发环境是否开启eslint强校验
 * VENDOR: 公共代码包组
 * @type {Object}
 */
var config = {
  PROJECT_PATH: projectDirectory,
  PROJECT_DEV_SRC: setting.dev.src,
  PROJECT_PROD_SRC: setting.prod.src,
  PROJECT_HOSTNAME: setting.hostname,
  PROJECT_INDEX: setting.index,
  PROJECT_NAME: setting.name,
  DEV_PORT: setting.dev.port,
  PROD_PORT: setting.prod.port,
  TEST_PORT: setting.test.port,
  VERSION: setting.version,
  ISESLINT: setting.dev.is_eslint,
  VENDOR: setting.libs,
  MODULES: MODULES
};

module.exports = config;