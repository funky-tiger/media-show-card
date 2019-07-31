## 1. 初始化仓库 / 初始化文件夹 / 初始化 npm / 初始化 tsc

- Github 上创建远程仓库
- git clone https://github.com/xxx/xxx.git
- npm init -y
- npm i typescript -D
- tsc --init
- touch .gitignore

## 2.修改 tsconfig.json 配置

## 3.添加 tslint 校验代码规则以及 editorconfig,prettier 统一代码风格

- npm i prettier tslint tslint-config-prettier -D
- 新建 tslint.json 文件并配置
  > 命名规范 interface 首字母要以大写打 I 作为开头
  > ...
- 新建 .prettierrc 文件并配置
  > 插件 prettier 自定义配置
- 新建 .editorconfig 文件并配置
  > 编辑器自定义配置
- 在 package.json 中配置 scripts 快捷命令

  > `{ "format": "prettier --write \"src/**/*.ts\" \"src/**/*.js\"","lint": "tslint -p tsconfig.json"}`
  > 运行 npm run lint 进行 ts 代码风格检查
  > 运行 npm run format 进行 prettier 代码自动更改为最优

- 新建.gitignore 文件并配置
  > Git 应当使用 .gitignore 文件忽略那些编译结果，以及 NPM 依赖的包文件
- 新建.npmignore 文件并配置
  > npm 打包发布的时候，会默认把当前目录下所有文件打包。但是 Git 仓库中，有些东西是不需要 发布到 NPM 的，因此我们需要使用一个文件 .npmignore 来忽略这些文件

## 4.设置 git 提交的校验钩子

- pre-commit
- 安装
  > npm i pre-commit -S (自动在.git/下生成 pre-commit 脚本)
- package.json 中添加"pre-commit"脚本
  `"pre-commit": [ "lint" ]`

  > 再次提交 git commit 会先执行 scripts 下的 `{"lint": "tslint -p tsconfig.json"}`进行 tslint 代码检查
  > 提交失败两种解决方案 1 npm run format(修改代码再提交) 2 git commit -m'描述' --no-verify（-n） 提交时忽略检查

* webpack.config.js 负责启动一个端口为 3001 的本地服务 供自己和他人 example 使用
* tsconfig.json 负责最终将 ts 文件编译打包到 lib 目录 供其他人使用
  > 通过配置 outDir,来确定要输出的文件目录
  > tsconfig.json 中选择要编译的目录，通过 "include": ["src/**/*"]来指定需要编译的 tsx 文件
  > 配置 baseUrl 和 paths,来确定类型声明文件的路径
  > 在 package.json 中配置 scripts 快捷命令
  > `{ "start": "webpack-dev-server --open development","build":"tsc" }`

## 5. 编写插件代码

- ...

## 6. 添加单元测试

- 安装
  > npm i jest ts-jest @types/jest -D
- 新建 jestconfig.json 文件
  > ...

## 7. 写一个单元测试示例

> ...

## 8. 完善文档信息

- mkdir doc

## 9.完善 package.json 的描述信息

> ...

## 10. 提交代码到 git 仓库

> git add .
> git commit -m "feat: init"
> git push

## 11. 发包到 npm

- 未注册 ? npm adduser : 发布
- npm version patch
  > 自动修改 package.json 文件版本号+1
- npm publish
  > 此处注意 npm login / npm publish 时要切换到国外镜像
  > 国外 npm config set registry https://registry.npmjs.org/
  > 国内 npm config set registry http://registry.npm.taobao.org/

## 添加 CI（持续集成)

- 添加 Travis 构建徽章
  > ...
- 添加代码覆盖率徽章
  > ...

## package.json 中相关字段

- homepage
  > 指定项目的主页地址，如果没有一般可以使用项目的 GitHub 地址。
- bugs.url
  > 指定项目的 Bug 反馈地址，一般可以用项目的 GitHub Issue 地址。
- repository.url 和 repository.type
  > 指定项目的源码仓库地址，可以指定是 git/cvs/svn。
- main
  > 指定 Node.js 中 require("moduel-name") 导入的默认文件。
- keywords
  > 指定项目的关键词，合理设置有利于让他人发现你的项目。
- engines
  > 设置项目对引擎的版本要求，比如 node、electron、vscode 等。
- types 和 typings
  > 设置项目内置的 TypeScript 模块声明文件入口文件。

# 要点

- example 只是一个用来展示 demo 的目录，其中引用的组件还是来自于根目录的 src 中的组件
- lib 目录是最终打包后的目录，用于发布到 npm
- src 真正要发布的组件

# 问题总结

- 1. TS 项目中如何使用<React.Fragment />
     > 解决: react 项目使用.tsx 后缀
- 2. TS 项目中如何定义 ref
     > 解决: 组件中定义 `public ref : any`
- 3. TS 项目中如何定义 setTimeout/setInterval
     > 解决: 组件中定义 `public timer : any`
- 4.  为第三方库编写类型声明文件
      > src 同级目录新建 types 目录
      > 新建第三方包名字的目录
      > 新建 index.d.ts
      > 编写类型声明文件`export declare class ...` `export declare function(){}...`
      > tsconfig.json 中配置`"baseUrl":"./"`和`"paths": { "*": ["types/*"] }"`
- 5.  TS 项目中如何定义 css 样式类型
      - `const divStyle: React.CSSProperties = {width: "11rem", };`
        > `<div style={divStyle} />`
- 6. TS 中导入 .png、.json 等
     > 解决 在全局类型文件中编写相关类型
     > `declare module '*.png' {` > `const value: string` > `export = value` > `}`
- 7.  webpack 别名（aliases）
      - `const config = {aliases: {utils: path.resolve('../utils')}}`
        > `import {ua} from 'utils/broswer'`
      - 报错 Cannot find module 'utils/browser'
        > 解决 tsconfig.json 添加 baseUrl 和 paths 的配置
        > `"baseUrl": ".","paths": {"utils/_": ["../utils/_"],"components/_": ["../components/_"]` > `}`
- 8. Window”拓展属性
     > 解决 在 xxx.d.ts 中
     > `interface Window {xxx: any}`
- 9. React.Component<Props,States>{}中已经指定 States 的类型, 但是使用 state={}仍报错：`xxx 是一个隐式的 any[]类型`
     > A. Component 内部使用构造器 其中 props 参数需指明 Props 类型 `constructor(props:Props){ super(props) this.state={}}`
     > B. Component 内部不使用构造器 其中 state 需指明 State 类型 `state:State={}`
- 10. TypeScript 编译选项
      > 解决 https://www.tslang.cn/docs/handbook/compiler-options.html
- 11. 忽略 TS 误报
      > 解决 报错前一行添加注释 `//@ts-ignore`
