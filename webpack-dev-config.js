/**
 * 开发模式下的webpack配置
 * 在整个项目开发过程中，几乎99%的时间都是在这个模式下进行的
 * 注意。两种模式的配置有较大差异！！
 */

const path = require('path');
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import precss from 'precss';
import autoprefixer from 'autoprefixer';
import rucksackCss from 'rucksack-css';

let config = {
    index: path.resolve(__dirname, 'index.web.js'),
    basePath: `${__dirname}/build`,
}
export default {
    debug: true,
    devtool: 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: [
        './web/webpack-public-path',  // 服务器静态资源路径配置，保证首先载入
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        config.index
    ],
    target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
    output: {
        path: config.basePath, // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/', // 服务器静态资源路径配置
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
            __DEV__: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
            template: 'web/index.html',
            title: '开发模式',
            favicon: './web/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            hash: true,
            // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
            // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
            inject: 'body'
        })
    ],
    resolve: {
        extensions: ['', '.js', 'jsx'],

        // 路径别名, 懒癌福音
        alias: {
            "react-native": "react-native-web",
            "mobx-react/native": "mobx-react",
            "model": path.resolve(__dirname, "app/model"),
            "components": path.resolve(__dirname, "app/components"),
            "fonts": path.resolve(__dirname, "app/components/icons"),
            "utils": path.resolve(__dirname, "app/utils"),
            "constants": path.resolve(__dirname, "app/constants"),
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel',]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loaders: [
            //         'babel-loader?cacheDirectory=true'
            //     ]
            // },
            // {
            //     // Most react-native libraries include uncompiled ES6 JS.
            //     test: /\.js$/,
            //     include: /node_modules\/react-native-/,
            //     loader: 'babel-loader',
            //     query: { cacheDirectory: true }
            // },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'app/components'),
                loaders: [
                    'style',
                    'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss?parser=postcss-scss'
                ]
            },
            // 组件样式，需要私有化，单独配置,
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'app/containers'),
                loaders: [
                    'style',
                    'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    'postcss?parser=postcss-scss'
                ]
            },
            // 组件样式，需要私有化，单独配置
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'app/styles'),
                loader: 'style!css!postcss?parser=postcss-scss'
            },
            // 公有样式，不需要私有化，单独配置
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]'
            },
        ]
    },
    postcss: () => [precss, autoprefixer, rucksackCss]
};
