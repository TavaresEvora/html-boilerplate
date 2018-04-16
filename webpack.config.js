const path = require('path')

module.exports = {
  entry: './src/assets/js/app.js',
  output: {
    path: path.resolve('./public/assets/js'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
    ]
  }
}
