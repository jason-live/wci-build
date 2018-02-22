"use strict";

/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 22:02:15
 */

var projectDirectory = process.cwd();
var setting = require(projectDirectory + "/wci.json");

/**
 * PROJECT_PATH: 项目目录
 * PROJECT_DEV_SRC: 代码目录
 * PROJECT_PROD_SRC: 生产目录
 * PROJECT_HOSTNAME: 开发域名
 * PROJECT_INDEX: 入口文件
 * DEV_PORT: 开发端口
 * DEV_API: 开发接口
 * DEV_MODULE: 开发模块组
 * PROD_PORT: 生产端口
 * PROD_API: 生产接口
 * PROD_MODULE: 生产模块组
 * TEST_API: 测试接口
 * TEST_MODULE: 测试模块组
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
  DEV_API: setting.dev.api,
  DEV_MODULE: setting.dev.module,
  PROD_PORT: setting.prod.port,
  PROD_API: setting.prod.api,
  PROD_MODULE: setting.prod.module,
  TEST_API: setting.test.api,
  TEST_MODULE: setting.test.module,
  VERSION: setting.version,
  ISESLINT: setting.dev.is_eslint,
  VENDOR: setting.libs
};

module.exports = config;