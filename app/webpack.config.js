const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.js'
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]), // clears the dist folder before building
		new HtmlWebpackPlugin({ // builds the html file for us with the output file(s) in it
			title: 'Finances App',
			template: 'src/index.ejs'
		}),
		new webpack.NamedModulesPlugin(), // added for HMR, causes relative path of module to be displayed for HMR
		new webpack.HotModuleReplacementPlugin() // added for HMR
	]
};