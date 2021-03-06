const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development'

module.exports = {
    mode: 'development',
    target: 'web',
    // recommended for development
    devtool: 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
        // serving from memory
        path: path.resolve(__dirname, "build"),
        // public url path
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        // due to web pack issue
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}