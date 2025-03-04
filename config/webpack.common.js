const path = require('path');
const { ProgressPlugin } = require('webpack')
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const lessModuleRegex = /\.modules?\.less$/;
const cssModuleRegex = /\.modules?\.css$/;

function r(...args) {
    return path.resolve('../', ...args);
}

module.exports = (env) => {
    return {
        context: path.resolve(__dirname, '../'),
        resolve: {
            // modules: ['node_modules', 'src'],
            extensions: ['.ts', '.js', '.json', '.tsx', '.jsx', '.less'],
            alias: {
                '@': path.resolve(__dirname, '../src')
            }
        },
        module: {
            rules: [{
                test: /\.(jsx?)|(tsx?)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            // 'lodash'
                            'lodash',
                            // ['import', {  // 导入一个插件
                            //     libraryName: 'antd',   // 暴露的库名
                            //     style: true // 直接将ants样式文件动态编译成行内样式插入，就不需要每次都导入
                            // }]
                        ],
                        compact: true,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ]
                    }
                }]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.webp$/, /\.svg$/],
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    }
                }]
            },
            {
                test: /\.css$/i,
                exclude: cssModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    }
                ],
            },
            {
                test: /\.(less)$/i,
                exclude: lessModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            },
            {
                test: cssModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            // importLoaders: 1,
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]'
                            },
                        }
                    }
                ],
            },
            {
                test: lessModuleRegex,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]',
                                mode: "global",
                                auto: true,
                                // getLocalIdent: (context, localIdentName, localName, options) => {
                                //     if (localName.indexOf("_module") > -1) {
                                //         return localIdentName;
                                //     }
                                //     return localName;
                                // }
                                // auto: true,
                                // exportGlobals: true,
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            // lessOptions: {
                            //     modules: {
                            //         localIdentName: '[local]_[hash:base64:5]'
                            //     }
                            // }

                        }
                    }
                ],
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
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
                extensions: '.js,.ts,.jsx,.tsx',
            }),
            new LodashWebpackPlugin({
                caching: true,
                paths: true
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                }),
            ],
        },
    };
}