const webpack = require('webpack');
const path = require('path');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const isProdEnv = process.env.WEBPACK_ENV === 'production';

const config = {
    devtool: 'source-map',
    debug: !isProdEnv,
    entry: './source/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.less', '.html', '.json'],
        alias: {
            app: path.resolve(__dirname, 'source/app.js')
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['ng-annotate', 'babel?presets[]=es2015', 'import-glob'], exclude: /node_modules/ },
            { test: /\.less$/, loaders: ['style', 'css', 'less', 'import-glob'] },
            { test: /\.html$/, loaders: ['raw']}
        ]
    },
    plugins: isProdEnv ? [
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([{ from: './source/index.html', to: 'index.html' }])
    ] : [],
    lessLoader: {
        lessPlugins: isProdEnv ? [
            new LessPluginCleanCSS({ advanced: true })
        ] : []
    }
};

module.exports = config;