# wci-build

[![](https://badge.juejin.im/entry/5a8f6e28f265da4e761fddca/likes.svg?style=flat-square)](https://juejin.im/post/5a8f6dc25188257a7b5aa8b3)


###### 基于react16、react-router4、redux的webpack构建工具，开发者可以选择集成设计类开发框架（例如：antd），可用于开发大型网站、管理系统等，功能包含但不限于如下：

* 集成最新react16、react-router4
* 支持css预编译、模块化，集成less、postcss兼容各个版本浏览器（IE9以上）
* 支持集成蚂蚁金服antd、antd-mobile，支持自定义样式，支持antd动态加载
* 支持开发环境热更新、支持模块化API接口、支持mac、window双系统开发
* 支持测试、生产代码自动添加版本号，支持代码合并、压缩，支持第三方库抽离，支持css代码抽离 // todo
* 支持开发环境IP地址、端口可配置、后端API接口可配置
* 支持三层eslint校验（1.开发工具校验 2.代码打包校验 3.git校验）

### 安装

```
npm install wci-build --save-dev
```

### 更新

```
npm update wci-build
```

### 使用
> 可以直接使用wci-cli脚手架直接生成wci项目，单独使用wci-build需要做以下配置

* 安装依赖

```
npm install react react-dom react-redux react-router-dom redux redux-thunk --save-dev
```

* 创建项目目录

```
myapp
├── app // 项目业务代码
│   ├── assets // 静态文件目录（图片、字体等）
│   ├── script // js代码目录
│   │   ├── actions // redux action目录
│   │   ├── componets // react 无状态组件目录
│   │   ├── containers // react 业务代码
│   │   ├── reducers // redux reducer目录
│   │   ├── util // 工具包目录
│   │   │   ├── theme.js // antd自定义样式文件
│   │   ├── Home.js // 首页
│   │   ├── home.less // 首页样式
│   ├── styles // 全局样式目录
│   ├── index.js // 项目入口文件
│   ├── index.tpl.html // 项目html模版
├── node_modules // 依赖包目录
├── .babelrc // babel配置文件
├── .eslintrc // eslint代码校验配置文件
├── .gitignore
├── package.json
├── README.md
├── wci.json // wci项目配置文件（主要配置一些开发、测试、生产环境的信息）
└── webpack.js // webpack自定义配置文件
```

* 新建.babelrc|.eslintrc文件

.babelrc

```
{
  "presets": [
    "es2015-ie",
    "react",
    "stage-0"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

.eslintrc

```
{
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "Babel": true,
    "React": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "global-require": "off",
    "linebreak-style": "off",
    "no-underscore-dangle": "off",
  }
}
```

* 新建wci.json文件

```
{
  "index": "app/index.js",
  "hostname": "127.0.0.1",
  "dev": {
    "port": 8031,
    "src": "app",
    "is_eslint": false,
    "modules": {
      "module1": {
        "host": "",
        "path": ""
      }
    }
  },
  "test": {
    "port": 9031,
    "src": "test",
    "modules": {
      "module1": {
        "host": "",
        "path": ""
      }
    }
  },
  "prod": {
    "port": 9031,
    "src": "dist",
    "modules": {
      "module1": {
        "host": "",
        "path": ""
      }
    }
  }
}
```

* 修改package.json运行脚本

```
"scripts": {
    "start": "wci-build run start",
    "test": "wci-build run test",
    "dist": "wci-build run dist"
  },
```

### 运行

```
npm run start // 开发环境
npm run test  // 测试环境
npm run dist  // 生产环境
```
