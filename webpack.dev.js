var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var CommonChunks = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.js',
    minChunks: Infinity
});

var Ocurrence = new webpack.optimize.OccurenceOrderPlugin();
var HotModule = new webpack.HotModuleReplacementPlugin();
var NoError = new webpack.NoErrorsPlugin();
var ExtractLess = new ExtractText('[name].css');
var HtmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/templates/index.html',
    hash: true,
    favicon: './src/images/favicon.ico'
});
var DefinePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("development")
    }
});

module.exports = {
    watch: true,
    debug: true,
    devtool: 'cheap-source-map',
    entry: {
        index: ['webpack-dev-server/client?http://localhost:3002', 'webpack/hot/dev-server', path.resolve(__dirname, 'src/views/index.js')],
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.resolve(__dirname, 'bulid'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    plugins: [
        HotModule,
        CommonChunks,
        HtmlPlugin,
        DefinePlugin,
        ExtractLess,
        Ocurrence,
        NoError
    ],
    module: {
        preloaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
        }],
        loaders: [
            {
                test: /\.less$/,
                loader: ExtractText.extract('style', 'css-loader!less-loader')
            },
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                },
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'js')]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.less']
    }
};