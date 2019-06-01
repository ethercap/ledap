const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const Clean = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const Lodash = require('lodash-webpack-plugin');

function r(...args) {
    return path.resolve(...args);
}

module.exports = (env = {}, argv) => {
    const prod = env.prod || env === 'prod';

    const commonConfig = {
        context: r('.'),
        entry: {
            index: './src/index.ts',
            base: './src/base/index.ts',
            widgets: './src/widgets/index.ts',
            'platforms/vue': './src/platforms/vue/index.ts',
        },
        output: {
            path: r('dist'),
            filename: '[name].js',
            library: 'ether-mvc',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        resolve: {
            modules: [r('node_modules'), r('src')],
            extensions: ['.ts', '.js', '.vue', '.json'],
        },
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'ts-loader'
                }, {
                    loader: 'tslint-loader',
                    options: {
                        fix: true
                    }
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            }]
        },
        plugins: [
            new Clean(),
            new Lodash({
                'caching': true,
                'paths': true
            })
        ]
    };

    const devConfig = merge(commonConfig, {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
    });

    const prodConfig = merge(commonConfig, {
        mode: 'production',
        optimization: {
            minimizer: [
                new Terser({
                    cache: true,
                    parallel: true,
                }),
            ]
        }
    });

    return prod ? prodConfig : devConfig;
};
