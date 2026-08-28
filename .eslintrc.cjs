/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/attribute-hyphenation': 'off'
  }
}
