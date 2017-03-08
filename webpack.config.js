var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var CommonChunks = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.js',
    minChunks: Infinity
});
var ExtractLess = new ExtractText('css/[name].css');
var HtmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    hash: true
});
var DefinePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})

module.exports = {
	inline: true,
	entry: {
		index: './js/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'bulid'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js'
	},
	plugins: [
        CommonChunks,
        HtmlPlugin,
        DefinePlugin,
        ExtractLess
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
        		loader: ExtractText.extract('style', 'css!less')
        	},
        	{
        		test: /\.js$/,
        		loader: "babel",
                query: {
                    presets: ['es2015']
                },
        		exclude: /node_modules/
        	}
        ]
    },
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.less']
    }
};