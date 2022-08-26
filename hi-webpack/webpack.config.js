const path = require('path');

/**
 * webpack 配置表
 */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  }
}