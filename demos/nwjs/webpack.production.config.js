module.exports = require('./webpack.config')
var webpack = require('webpack')
module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
