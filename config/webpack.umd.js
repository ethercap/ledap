const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
function r(...args) {
    return path.resolve('../', ...args);
}

module.exports = (env = {}, argv) => {
    const prod = env.prod || env === 'prod';

    return merge(baseWebpackConfig("prod"), {
        mode: 'production',
        externals: {
            "react": 'React',
            "jquery": 'jquery',
            'react-dom': 'ReactDOM'
        },
        entry: {
            'index': {
                import: './src/index.ts',
                library: {
                    name: 'ledap',
                    type: 'umd',
                    umdNamedDefine: true,
                },
            },
            'ledap': {
                import: './src/index.ts',
                library: {
                    name: 'ledap',
                    type: 'umd',
                    umdNamedDefine: true,
                },
            },
            'ledap.core': {
                import: './src/index.core.ts',
                library: {
                    name: 'ledap',
                    type: 'umd',
                    umdNamedDefine: true,
                },
            },
            'ledap.react': {
                import: './src/ledap.react.ts',
                library: {
                    name: 'ledapReact',
                    type: 'umd',
                    umdNamedDefine: true,
                },
            }
        },
        output: {
            path: path.resolve(__dirname, '../umd'),
            filename: '[name].min.js',
            globalObject: 'this'
        },
        optimization: {
            minimize: true,
        },
        plugins: [
            // new CopyWebpackPlugin({
            //     patterns: [{
            //         context: './',
            //         from: 'umd',
            //         to: '../examples/dist'
            //     }]

            // })
        ]
    })
};