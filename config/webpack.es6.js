const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const baseWebpackConfig = require('./webpack.common.js')


function r(...args) {
    return path.resolve('../', ...args);
}

/**
 * 只打包react组件
 * @returns 
 */
module.exports = (env) => {
    const prod = env.prod || env === 'prod';
    return merge(baseWebpackConfig('prod'), {
        mode: 'production',
        entry: {
            'react': './src/platforms/react/index.ts',
            'core': './src/index.core.ts',
            'index': './src/index.ts'
        },
        externals: {
            "react": 'react',
            'react-dom': 'react-dom',
            'antd': 'antd'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].js',
            libraryTarget: 'umd', // ES6 模块
            module: true,
        },
        experiments: {
            outputModule: true, // 启用 ES6 模块输出
        },
        plugins: [
        ],
        optimization: {
            minimize: false,
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                }),
            ],
        },
    })
};