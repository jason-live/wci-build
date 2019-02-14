'use strict';

/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by: jason
 * @Last Modified time: 2019-02-14 14:56:45
 */

var projectDirectory = process.cwd();
var build = '/build';
// const setting = require(`${projectDirectory}/wci.json`);
var wciDefault = require(projectDirectory + '/' + build + '/wci.default.js')();
var wciDev = require(projectDirectory + '/' + build + '/wci.dev.js')();
var wciRelease = require(projectDirectory + '/' + build + '/wci.release.js')();
var wciProd = require(projectDirectory + '/' + build + '/wci.prod.js')();

var apis = {};
var output = 'dev';

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  apis = wciDev.apis;
}

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  if (process.env.RUN_DEV) {
    apis = wciDev.apis;
    output = wciDev.output;
  } else if (process.env.RUN_TEST) {
    apis = wciRelease.apis;
    output = wciRelease.output;
  } else {
    apis = wciProd.apis;
    output = wciProd.output;
  }
}

/**
 * @type {Object}
 */
var config = {
  // 默认
  DEFAULT_PATH: projectDirectory,
  DEFAULT_SRC: wciDefault.src,
  DEFAULT_HOSTNAME: wciDefault.hostname,
  DEFAULT_PORT: wciDefault.port,
  DEFAULT_INDEX: wciDefault.index,
  DEFAULT_OUTPUT: output,
  DEFAULT_NAME: wciDefault.name,
  DEFAULT_LIBS: wciDefault.libs,
  DEFAULT_APIS: apis,
  // 开发
  DEV_ESLINT: wciDev.eslint
  // 测试
  // 生产
};

module.exports = config;