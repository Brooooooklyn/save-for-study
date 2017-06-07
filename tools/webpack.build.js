const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const commonConfig = require('./webpack.config')

const jsName = 'js/[name].[chunkhash:8].js'
const cssName = 'css/[name].[chunkhash:8].css'

module.exports = webpackMerge(commonConfig, {

  bail: true,

  output: {
    filename: jsName
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'cache-loader',
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: cssName
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfill'],
      chunks: Object.keys(commonConfig.entry),
      filename: jsName,
      minChunks: Infinity
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        dead_code: true,
        warnings: false
      },
      beautify: false,
      sourceMap: false,
      comments: false
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__DEBUG__': false,
      '__ESSAGE_DEBUG__': false
    }),
  ]

})
