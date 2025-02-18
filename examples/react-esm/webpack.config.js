const path = require('path');
const { merge } = require('webpack-merge');
const { ProgressPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

function r(...args) {
    return path.resolve(...args);
}

module.exports = (env = {}, argv) => {
    const prod = env.prod || env === 'prod';
    const publicPath = prod ? '/react-esm/dist' : ''
    const commonConfig = {
        context: r('.'),
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: publicPath
        },
        resolve: {
            modules: [r('node_modules'), r('src')],
            extensions: ['.ts', '.js', '.jsx', 'tsx', '.json'],
            alias: {
                '@': path.resolve('./src')
            }
        },
        module: {
            rules: [{
                test: /\.(jsx?)|(tsx?)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ]
                    }
                }]
            }, {
                test: /\.(css)|(less)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            }]
        },
        // extensions: [".json", '.js', '.jsx', '.ts', '.tsx'],
        plugins: [
            new DefinePlugin({
                'process.env.PUBLIC_URL': publicPath
            }),
            new CopyPlugin({
                patterns: [{ from: 'public', to: '' }],
            }),
            new MiniCssExtractPlugin({
                filename: 'main.css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
                publicUrl: publicPath,
                minify: false
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
        devtool: 'eval-source-map',
        devServer: {
            client: {
                progress: true,
            },
            static: {
                directory: path.join(__dirname, '../')
            },
            watchFiles: ['src/**/*'],
            port: 8012,
            server: 'http',
            hot: false,
            open: true,
            devMiddleware: {
                writeToDisk: false,
            }
        }
    });

    const prodConfig = merge(commonConfig, {
        mode: 'production',
        optimization: {
            minimize: true
        },
        plugins: [
            new CleanWebpackPlugin()
        ]
    });

    return prod ? prodConfig : devConfig;
};