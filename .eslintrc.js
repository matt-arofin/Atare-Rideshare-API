export default {
  plugins: ['swagger', 'jsdoc'],
  extends: ['plugin:swagger/recommended', 'plugin:jsdoc/recommended'],
  rules: {
    "jsdoc/check-alignment": true,
    "jsdoc/check-line-alignment": true
  }
}