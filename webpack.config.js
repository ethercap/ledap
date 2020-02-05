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
            index: './src/index.ts'
        },
        output: {
            path: r('dist'),
            filename: '[name].js',
            library: 'ledap',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        resolve: {
            modules: [r('node_modules'), r('src')],
            extensions: ['.ts', '.js', '.vue', '.json'],
            alias: {
                '@': path.resolve('./src')
            }
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
                    loader: 'eslint-loader',
                    options: {
                        cache: false,
                        fix: true,
                        failOnError: true,
                        ext: '.js,ts',
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
            new Lodash({
                'caching': true,
                'paths': true
            })
        ]
    };

    const devConfig = merge(commonConfig, {
        mode: 'development',
        entry: {
            'ledap': './src/index.ts',
            'ledap.core': './src/index.core.ts'
        },
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            new Clean()
        ]
    });

    const prodConfig = merge(commonConfig, {
        mode: 'production',
        entry: {
            'ledap.min': './src/index.ts',
            'ledap.core.min': './src/index.core.ts'
        },
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