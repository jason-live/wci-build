/*
 * @Author: jason
 * @Date:   2017-11-25 10:18:45
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-26 14:17:05
 */

const projectDirectory = process.cwd();
const build = '/build';
// const setting = require(`${projectDirectory}/wci.json`);
const wciDefault = require(`${projectDirectory}/${build}/wci.default.js`)();
const wciDev = require(`${projectDirectory}/${build}/wci.dev.js`)();
const wciRelease = require(`${projectDirectory}/${build}/wci.release.js`)();
const wciProd = require(`${projectDirectory}/${build}/wci.prod.js`)();

let apis = {};
var output = 'dev';

/**
 * 区分环境
*/

// 本地
if(process.env.NODE_ENV && process.env.NODE_ENV === 'default') {
  apis = wciDefault.apis;
}

// 开发
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  apis = wciDev.apis;
  output = wciDev.output;
}

// 测试
if (process.env.NODE_ENV && process.env.NODE_ENV === 'release') {
  apis = wciRelease.apis;
  output = wciRelease.output;
}

// 生产
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  apis = wciProd.apis;
  output = wciProd.output;
}

/**
 * @type {Object}
 */
const config = {
  // 默认
  DEFAULT_PATH: projectDirectory,
  DEFAULT_SRC: wciDefault.src,
  DEFAULT_HOSTNAME: wciDefault.hostname,
  DEFAULT_PORT: wciDefault.port,
  DEFAULT_INDEX: wciDefault.index,
  DEFAULT_OUTPUT: output,
  DEFAULT_NAME: wciDefault.name,
  DEFAULT_APIS: apis,
  DEFAULT_DLL: wciDefault.dll || {},
  DEFAULT_ANALYZER: wciDefault.analyzer || false,
  // 开发
  DEV_ESLINT: wciDev.eslint
};

module.exports = config;
