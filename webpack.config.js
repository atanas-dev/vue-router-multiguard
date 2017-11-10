var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: {
        'vue-router-multiguard': './index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-router-multiguard.min.js',
        library: 'VueRouterMultiguard',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
            compress: {
                warnings: false
            }
        })
    ],
    devtool: 'source-map'
}
