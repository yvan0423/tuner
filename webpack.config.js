const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    hash: true
});
const HotModule = new webpack.HotModuleReplacementPlugin();
const NoError = new webpack.NoErrorsPlugin();
var ExtractLess = new ExtractTextPlugin('[name].css');

module.exports = {
	watch: true,
	debug: true,
	devtool: 'cheap-source-map',
	entry: path.resolve(__dirname, 'js/index.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'js/[name].js'
	},
	plugins: {
		HotModule,
		HtmlPlugin,
		NoError,
		ExtractLess
	},
	module: {
		preloader: [{
			test: /\.js|jsx?$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            exclude: /node_modules/
		}],
		loaders: [
			{ test: /\.less$/i, loader: extractLESS.extract(['css', 'less']) },
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.json', '.less']
	}
}