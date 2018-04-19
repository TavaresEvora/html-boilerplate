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
      filename: '[name].js',
      publicPath: '/assets/'
    },
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        '@': path.resolve(__dirname, 'src/assets'),
        '~': path.resolve(__dirname, 'node_modules')
      }
    },
    // devtool: inDevMode ? 'cheap-module-eval-source-map' : false,
    devServer: {
      contentBase: path.join(__dirname, "public"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: ['babel-loader', 'eslint-loader']
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
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `[name]${inDevMode ? '' : '.[hash]'}.[ext]`,
              useRelativePath: !inDevMode
            }
          }]
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: inDevMode
      }),
      new ManifestPlugin()
    ],
  }
}

module.exports = config
