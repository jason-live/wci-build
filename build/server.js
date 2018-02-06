/*
 * @Author: jason
 * @Date:   2017-11-25 08:52:01
 * @Last Modified by:   jason
 * @Last Modified time: 2017-11-25 22:02:27
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configuration = require('./config');
const Console = require('console');
const chalk = require('chalk');

const {
  DEV_PORT,
  PROD_PORT,
  PROJECT_DEV_SRC,
  PROJECT_PROD_SRC,
  PROJECT_HOSTNAME,
} = configuration;

const isDeveloping = process.env.NODE_ENV === 'development';
const port = isDeveloping ? DEV_PORT : PROD_PORT;

let server;

const createServer = (compiler, listenPath) => {
  const o = new WebpackDevServer(webpack(compiler), {
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
    compress: true,
    contentBase: `./${listenPath}`,
    stats: {
      colors: true,
    },
    headers: {
      'X-Custom-Foo': 'bar',
    },
  });
  return o;
};

if (isDeveloping) {
  Console.log(chalk.cyan('==> 开发环境开始启动...'));
  server = createServer(require('./webpack.dev.js'), PROJECT_DEV_SRC);
} else {
  Console.log(chalk.cyan('==> 编译环境开始启动...'));
  server = createServer(require('./webpack.prod.js'), PROJECT_PROD_SRC);
}

server.listen(port, PROJECT_HOSTNAME, (err) => {
  if (err) {
    Console.log(chalk.red(err));
  }
  Console.log(chalk.cyan(`==> The app is running at ${PROJECT_HOSTNAME}:${port}`));
  Console.log(chalk.cyan('==> 即将自动开启浏览器，请稍等...'));
});
