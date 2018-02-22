# wci-build

###### 基于react16、react-router4、redux的webpack构建工具，开发者可以选择集成设计类开发框架（例如：antd），可用于开发大型网站、管理系统等，功能包含但不限于如下：

* 集成最新react16、react-router4
* 支持css预编译、模块化，集成less、postcss兼容各个版本浏览器（IE9以上）
* 支持集成蚂蚁金服antd、antd-mobile，支持自定义样式，支持antd动态加载
* 支持开发环境热更新、支持模块化API接口、支持mac、window双系统开发
* 支持测试、生产代码自动添加版本号，支持代码合并、压缩，支持第三方库抽离，支持css代码抽离
* 支持开发环境IP地址、端口可配置、后端API接口可配置
* 支持三层eslint校验（1.开发工具娇艳 2.代码打包娇艳 3.git校验）

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

* 创建项目目录

```
app-name
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── app
└── assets
└── script
    └── actions
    └── componets
    └── containers
    └── reducers
    └── util
    └── Home.js
    └── home.less
└── styles
└── index.js
└── index.tpl.html
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
    [
      "import", [
        {
           "libraryName": "antd",
           "libraryDirectory": "es",
           "style": true
        }
      ]
    ],
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
  "name": "wciapp",
  "dev": {
    "port": 8031,
    "src": "app",
    "api": "",
    "module": {},
    "is_eslint": false
  },
  "test": {
    "module": {},
    "api": ""
  },
  "prod": {
    "port": 9031,
    "src": "dist",
    "module": {},
    "api": ""
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
