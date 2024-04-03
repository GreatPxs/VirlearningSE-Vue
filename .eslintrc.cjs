/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  //原为'extends',报错修改
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '.eslintrc-auto-import.json' // 添加插件生成的文件
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },

  // 以下为添加部分
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        wrapAttributes: false,
        printWidth: 100,
        endOfLine: 'auto'
      }
    ]
  }
}
