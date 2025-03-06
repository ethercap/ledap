const path = require('path');
const { merge } = require('webpack-merge');
const { ProgressPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

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
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash'],
                    }
                }, {
                    loader: 'ts-loader'
                }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash'],
                    }
                }]
            }]
        },
        plugins: [
            new ProgressPlugin({
                activeModules: true,
                entries: true,
                modules: true,
                modulesCount: 1,
                profile: false,
                dependencies: true,
                dependenciesCount: 1,
            }),
            new ESLintWebpackPlugin({
                cache: false,
                fix: true,
                failOnError: true,
                extensions: '.js,ts',
            }),
            new LodashWebpackPlugin({
                caching: true,
                paths: true
            })
        ]
    };

    const devConfig = merge(commonConfig, {
        mode: 'development',
        entry: {
            'ledap': './src/index.ts',
            'ledap.core': './src/index.core.ts'
        },
        devtool: 'eval-source-map',
        devServer: {
            client: {
                progress: true,
            },
            static: {
                directory: path.join(__dirname, 'examples')
            },
            watchFiles: ['src/**/*', 'examples/**/*'],
            port: 8011,
            server: 'http',
            hot: false,
            open: true,
            devMiddleware: {
                writeToDisk: true,
            }
        },
        output: {
            path: r('examples/dist')
        },
        plugins: [
            new CleanWebpackPlugin()
        ]
    });

    const prodConfig = merge(commonConfig, {
        mode: 'production',
        entry: {
            'ledap.min': './src/index.ts',
            'ledap.core.min': './src/index.core.ts'
        },
        optimization: {
            minimize: true
        }
    });

    return prod ? prodConfig : devConfig;
};