module.exports = {
  // 定义代码运行的环境
  env: {
    browser: true, // 浏览器环境中的全局变量
    es2021: true, // 启用除了 modules 所有 ECMAScript 2021 功能
    node: true // Node.js 全局变量和 Node.js 作用域
  },
  // 指定继承的eslint规则
  extends: [
    'eslint:recommended', // 使用 eslint 官方推荐的规则
    'plugin:@typescript-eslint/recommended', // 使用 typescript 推荐的规则
    'plugin:react-hooks/recommended' // 使用 react-hooks 推荐的规则
  ],
  // 用于对特定文件类型进行特殊处理的配置数组
  overrides: [],
  // 指定 eslint 的解析器
  parser: '@typescript-eslint/parser',
  // 指定解析器选项
  parserOptions: {
    ecmaVersion: 'latest', // 启用最新的 ECMAScript 版本
    sourceType: 'module' // 指定源代码存在的格式，module 表示代码是 ECMAScript 模块
  },
  // 定义额外的插件
  plugins: ['react-refresh'],
  // 自定义 eslint 规则
  rules: {
    'react/react-in-jsx-scope': 'off', // 不强制要求在 JSX 文件中导入 React
    'no-console': 'off', // 允许使用 console
    'no-unused-vars': 'off', // 允许存在声明后未使用的变量
    'no-debugger': 'error', // 禁止使用 debugger，使用时报错
    'no-var': 'error', // 禁止使用var，必须使用let或const
    '@typescript-eslint/no-namespace': 'off', // 允许使用 TypeScript 命名空间
    '@typescript-eslint/no-unused-vars': 'off' // 允许存在声明后未使用的变量（TypeScript）
  }
}
