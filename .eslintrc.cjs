module.exports = {
  // 定义代码运行的环境
  env: {
    // 浏览器环境中的全局变量
    browser: true,
    // 启用除了 modules 所有 ECMAScript 2021 功能
    es2021: true,
    // Node.js 全局变量和 Node.js 作用域
    node: true
  },
  // 指定继承的eslint规则
  extends: [
    // 使用 eslint 官方推荐的规则
    'eslint:recommended',
    // 使用 typescript 推荐的规则
    'plugin:@typescript-eslint/recommended',
    // 使用 react-hooks 推荐的规则
    'plugin:react-hooks/recommended'
  ],
  // 用于对特定文件类型进行特殊处理的配置数组
  overrides: [],
  // 指定 eslint 的解析器
  parser: '@typescript-eslint/parser',
  // 指定解析器选项
  parserOptions: {
    // 启用最新的 ECMAScript 版本
    ecmaVersion: 'latest',
    // 指定源代码存在的格式，module 表示代码是 ECMAScript 模块
    sourceType: 'module'
  },
  // 定义额外的插件
  plugins: ['react-refresh'],
  /*
   * 自定义 eslint 规则
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // 不强制要求在 JSX 文件中导入 React
    'react/react-in-jsx-scope': 'off',
    // 允许使用 console
    'no-console': 'off',
    // 允许存在声明后未使用的变量
    'no-unused-vars': 'off',
    // 禁止使用 debugger，使用时报错
    'no-debugger': 'error',
    // 禁止使用var，必须使用let或const
    'no-var': 'error',
    // 允许使用 TypeScript 命名空间
    '@typescript-eslint/no-namespace': 'off',
    // 允许存在声明后未使用的变量（TypeScript）
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
