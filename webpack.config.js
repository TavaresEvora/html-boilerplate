const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, options) => {
  const inDevMode = options.mode === 'development'
  return {
    entry: {
      app: ['./src/assets/scss/app.scss', './src/assets/js/app.js']
    },
    output: {
      path: path.resolve(__dirname, 'public/assets/js'),
      filename: inDevMode ? '[name].js' : '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 1 } }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader', options: {
                importLoaders: 1,
                minimize: !inDevMode
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  // TODO: Checker les plugins interessant
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                  }),
                ]
              }
            },
            'sass-loader'
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devtool: inDevMode ? 'cheap-module-eval-source-map' : false
  }
}
