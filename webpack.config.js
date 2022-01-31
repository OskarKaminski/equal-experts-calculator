const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = {
    devtool: 'eval',
    mode: 'development',
    target: "web",
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Equal Experts Calculator'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    }
}
