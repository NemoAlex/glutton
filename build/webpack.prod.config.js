var webpack = require('webpack')
var config = require('./webpack.base.config')

config.plugins = (config.plugins || []).concat([
  // this allows uglify to strip all warnings
  // from Vue.js source code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // This minifies not only JavaScript, but also
  // the templates (with html-minifier) and CSS (with cssnano)!
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config
