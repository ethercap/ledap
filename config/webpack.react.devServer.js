const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function r(...args) {
    return path.resolve('../', ...args);
}

module.exports = () => {
    const publicPath = ''
    return merge(baseWebpackConfig("dev"), {
        mode: 'development',
        entry: {
            index: './src/react-test/index.tsx'
        },
        devtool: 'eval-source-map',
        devServer: {
            client: {
                progress: true,
            },
            static: {
                directory: 'examples'
            },
            watchFiles: ['src/**/*'],
            port: 8003,
            server: 'http',
            hot: true,
            open: true,
            devMiddleware: {
                writeToDisk: false,
            },
            proxy: [{
                context: ['/mis-api'],
                target: 'http://mis.dev.chuanyuapp.com',
                pathRewrite: { '^/mis-api': '' },
                // secure: false
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/react-test/template.html",
                publicUrl: publicPath,
                minify: false
            })
        ]
    })
};