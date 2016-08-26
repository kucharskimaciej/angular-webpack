const webpack = require('webpack');
const path = require('path');

const isProdEnv = process.env.WEBPACK_ENV === 'production';

const config = {
    devtool: 'source-map',
    entry: './source/index',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            app: path.resolve(__dirname, 'source/app.js')
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['ng-annotate', 'babel?presets[]=es2015', 'import-glob'], exclude: /node_modules/ },
            { test: /\.html$/, loaders: ['raw']}
        ]
    },
    plugins: isProdEnv ? [
        new webpack.optimize.UglifyJsPlugin()
    ] : []
};

module.exports = config;