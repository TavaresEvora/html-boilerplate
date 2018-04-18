const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const config = (env, options) => {
  const inDevMode = options.mode === 'development'
  return {
    entry: {
      app: ['./src/assets/scss/app.scss', './src/assets/js/app.js']
    },
    output: {
      path: path.resolve(__dirname, 'public/assets'),
      filename: inDevMode ? '[name].js' : '[name].[chunkhash:8].js',
      publicPath: '/assets/'
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
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              // MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader', options: {
                  importLoaders: 1,
                  sourceMap: inDevMode
                }
              }
            ]
          }),
        },
        {
          test: /\.scss$/,

          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              // MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: inDevMode,
                  importLoaders: 1,
                  minimize: !inDevMode
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: inDevMode
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: inDevMode
                }
              }
            ]
          })
        },
      ]
    },
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: "[name].css",
      //   chunkFilename: "[id].css"
      // }),
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: inDevMode
      }),
      new ManifestPlugin()
    ],
    devtool: inDevMode ? 'cheap-module-eval-source-map' : false
  }
}

module.exports = config
