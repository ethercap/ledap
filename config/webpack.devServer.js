const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function r(...args) {
    return path.resolve('../', ...args);
}

module.exports = () => {

    return merge(baseWebpackConfig('dev'), {
        mode: 'development',
        entry: {
            index: {
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
            },
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
            port: 8002,
            server: 'http',
            hot: false,
            open: true,
            devMiddleware: {
                writeToDisk: true,
            }
        },
        output: {
            path: path.resolve('examples/dist'),
            filename: '[name].js',
            globalObject: 'this'
        },
        plugins: [
            new CleanWebpackPlugin()
        ]
    })
};