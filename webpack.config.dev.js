const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// import path from 'path';
// import webpack from 'webpack';

// 'webpack-hot-middleware/client',

// plugins: [
// 	new webpack.HotModuleReplacementPlugin(),
// 	new webpack.NoErrorsPlugin(),
// 	new webpack.DefinePlugin({
// 		'process.env': {
// 			NODE_ENV: JSON.stringify('development')
// 		}
// 	}),
// ],

//-- Environment.
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

console.log('webpack.config.dev.js [process.env.NODE_ENV]', process.env.NODE_ENV);

const config = {};
module.exports = config;

if (ENV_DEVELOPMENT) {
	Object.assign(config, {
		devServer: {
			// same path as build convenient have only one index.html setup then.
			contentBase: 'static/',
		},
	});
}

// if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
//
// }

// export default {
Object.assign(config, {
	devtool: 'cheap-module-eval-source-map',

	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'static', 'scripts'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	eslint: {
		configFile: '.eslintrc'
	},
	module: {
		preLoaders: [{
			test: /\.js|\.jsx$/,
			loaders: ['eslint-loader'],
			exclude: ['node_modules']
		}],
		loaders: [{
			test: /\.js|\.jsx$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		}]
	}
});
