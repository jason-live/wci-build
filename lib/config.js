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
  if (process.env.RUN_DEV) {
    MODULES = setting.dev.modules;
  } else if (process.env.RUN_TEST) {
    MODULES = setting.release.modules;
  } else {
    MODULES = setting.prod.modules;
  };
};

/**
 * PROJECT_PATH: 项目目录
 * PROJECT_DEV_SRC: 代码目录
 * PROJECT_PROD_SRC: 生产目录
 * PROJECT_DEV_OUTPUT: 开发构建目录
 * PROJECT_RELEASE_OUTPUT: 测试构建目录
 * PROJECT_PROD_OUTPUT: 生产构建目录
 * PROJECT_HOSTNAME: 开发域名
 * PROJECT_INDEX: 入口文件
 * PROJECT_NAME: 项目名称
 * VENDOR: 需要单独打包的npm依赖
 * VERSION: 项目大版本
 * TVERSION: 测试版本号
 * ISESLINT: 开发环境是否开启eslint强校验
 * VENDOR: 公共代码包组
 * @type {Object}
 */
var config = {
  PROJECT_PATH: projectDirectory,
  PROJECT_DEV_SRC: setting.dev.src,
  PROJECT_PROD_SRC: setting.prod.src,
  PROJECT_DEV_OUTPUT: setting.dev.output,
  PROJECT_RELEASE_OUTPUT: setting.release.output,
  PROJECT_PROD_OUTPUT: setting.prod.output,
  PROJECT_HOSTNAME: setting.hostname,
  PROJECT_INDEX: setting.index,
  PROJECT_NAME: setting.name,
  DEV_PORT: setting.dev.port,
  PROD_PORT: setting.prod.port,
  RELEASE_PORT: setting.release.port,
  VERSION: setting.version,
  TVERSION: setting.tversion,
  ISESLINT: setting.dev.is_eslint,
  VENDOR: setting.libs,
  MODULES: MODULES
};

module.exports = config;