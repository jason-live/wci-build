/*
 * @Author: jason
 * @Date:   2017-11-25 08:52:01
 * @Last Modified by: jason
 * @Last Modified time: 2019-09-22 17:25:00
 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Console from 'console';
import {
  DEFAULT_PORT,
  DEFAULT_SRC,
  DEFAULT_HOSTNAME
} from './config';

const isDeveloping = process.env.NODE_ENV === 'default';

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
      colors: true
    },
    headers: {
      'X-Custom-Foo': 'bar'
    }
  });
  return o;
};

if (isDeveloping) {
  Console.log('\x1b[32m%s\x1b[0m', '==> 开发环境开始启动...');
  server = createServer(require('./webpack.dev').default, DEFAULT_SRC);
}

server.listen(DEFAULT_PORT, DEFAULT_HOSTNAME, (err) => {
  if (err) {
    Console.log('\x1b[31m%s\x1b[0m', err);
  }
  Console.log('');
  Console.log('');
  Console.log('\x1b[32m%s\x1b[0m', `==> 项目运行在 ${DEFAULT_HOSTNAME}:${DEFAULT_PORT}`);
  Console.log('');
  Console.log('');
  Console.log('\x1b[32m%s\x1b[0m', '==> 即将自动开启浏览器，请稍等...');
});
