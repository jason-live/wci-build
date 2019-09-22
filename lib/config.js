"use strict";

/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-22 17:38:32
 */
var projectDirectory = process.cwd();
var build = '/build'; // const setting = require(`${projectDirectory}/wci.json`);

var wciDefault = require("".concat(projectDirectory, "/").concat(build, "/wci.default.js"))();

var wciDev = require("".concat(projectDirectory, "/").concat(build, "/wci.dev.js"))();

var wciRelease = require("".concat(projectDirectory, "/").concat(build, "/wci.release.js"))();

var wciProd = require("".concat(projectDirectory, "/").concat(build, "/wci.prod.js"))();

var apis = {};
var output = 'dev';
/**
 * 区分环境
*/
// 本地

if (process.env.NODE_ENV && process.env.NODE_ENV === 'default') {
  apis = wciDefault.apis;
} // 开发


if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  apis = wciDev.apis;
  output = wciDev.output;
} // 测试


if (process.env.NODE_ENV && process.env.NODE_ENV === 'release') {
  apis = wciRelease.apis;
  output = wciRelease.output;
} // 生产


if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  apis = wciProd.apis;
  output = wciProd.output;
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
  DEFAULT_APIS: apis,
  DEFAULT_DLL: wciDefault.dll,
  // 开发
  DEV_ESLINT: wciDev.eslint // 测试
  // 生产

};
module.exports = config;