const env = process.env
const os = require('os')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const commonConfig = require('./webpack.config')

const jsName = 'build/[name].js'

const config = webpackMerge(commonConfig, {
  output: {
    filename: jsName
  },

  resolve: {
    alias: {
      lovefield: 'lovefield/dist/lovefield.js'
    }
  },

  devtool: 'cheap-module-source-map',

  devServer: {
    port: 8081
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loaders: [ 'cache-loader', 'happypack/loader?id=sourceMap' ],
        exclude: [/(lovefield)|(ionic)|(@angular)/]
      },
      {
        test: /\.css$/,
        loaders: [ 'cache-loader', 'happypack/loader?id=css' ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: 'style-loader',
            query: 'sourceMap=true'
          },
          {
            loader: 'css-loader',
            query: 'sourceMap=true'
          },
          {
            loader: 'postcss-loader',
            query: 'sourceMap=true'
          },
          {
            loader: 'stylus-loader',
            query: 'sourceMap=true'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common'],
      chunks: ['common', 'vender'],
      filename: jsName,
      minChunks: Infinity
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: ['style-loader?sourceMap=true', 'css-loader?sourceMap=true']
    }),

    new HappyPack({
      id: 'sourceMap',
      threadPool: happyThreadPool,
      loaders: ['source-map-loader']
    }),

    new webpack.DefinePlugin({
      '__DEBUG__': true,
      '__PLUGIN_DEBUG__': env.PLUGIN_DEBUG || false,
      '__ESSAGE_DEBUG__': false
    })

  ]
})

module.exports = config
