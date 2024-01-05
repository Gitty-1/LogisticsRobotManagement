/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  "parser": "vue-eslint-parser",
  "parseOptions": {
    "parser":"@typescript-eslint/parser",
    ecmaVersion: 'latest'
  },
  rules: {
    // 关闭名称校验
    'vue/multi-word-component-names':"off"
  }
}
