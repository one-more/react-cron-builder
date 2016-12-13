'use strict';

const webpack = require('webpack'),
    nib = require('nib'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: './static',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /bower_components/],
                loader: 'babel-loader'
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ],
        resolve: {
            extensions: ['', '.js', '.styl']
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('bundle.css', {
            allChunks: false
        })
    ],
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "bower_components"],
        root: process.cwd() + '/src'
    },
    stylus: {
        include: [process.cwd()+'/src/styles/includes'],
        import: ['_variables', '~nib/lib/nib/index.styl'],
        use: nib()
    }
};