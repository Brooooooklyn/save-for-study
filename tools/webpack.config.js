'use strict'

const os = require('os')
const webpack = require('webpack')
const path = require('path')
const config = require('config')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')

const CDN_URL = process.env.CDN_URL

const imageName = 'images/[name].[hash:8].[ext]'
const fontName = 'fonts/[name].[hash:8].[ext]'
const videoName = 'videos/[name].[hash:8].[ext]'
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const rootDir = path.join(process.cwd(), 'src')

module.exports = {

  context: rootDir,

  output: {
    path: path.join(process.cwd(), 'www'),
    publicPath: CDN_URL || config.CDN_URL || '/'
  },

  entry: {
    polyfill: ['./polyfill.ts'],
    common: [ './common.ts' ],
    vender: [ './app/main.ts' ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.html', '.styl'],
    alias: {
      sdk: `${ rootDir }/sdk`
    }
  },

  resolveLoader: {
    modules: [
      path.resolve(process.cwd(), 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'happypack/loader?id=html'
      },
      {
        test: /\.ts$/,
        loaders: [ 'happypack/loader?id=ts', 'happypack/loader?id=template' ],
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: imageName
        }
      },
      {
        test: /\.woff((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/font-woff',
          name: fontName
        }
      },
      {
        test: /\.woff2((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/font-woff2',
          name: fontName
        }
      },
      {
        test: /\.ttf((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/octet-stream',
          name: fontName
        }
      },
      {
        test: /\.eot((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: fontName
        }
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'html',
      threadPool: happyThreadPool,
      loaders: ['html-loader']
    }),

    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: ['ts-loader?transpileOnly=true&happyPackMode=true']
    }),

    new HappyPack({
      id: 'template',
      threadPool: happyThreadPool,
      loaders: ['angular2-template-loader']
    }),

    new webpack.ContextReplacementPlugin(
      /(ionic-angular)|(angular(\\|\/)core(\\|\/)@angular)/,
      path.resolve(process.cwd(), 'src')
    ),

    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'src/index.html'),
      chunksSortMode: 'dependency'
    }),

    new ForkTsCheckerNotifierWebpackPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['common', 'polyfill']
    }),
  ]
}
