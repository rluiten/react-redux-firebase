const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');

// Environment.
const NODE_ENV = process.env.NODE_ENV;
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

console.log('webpack environment', process.env.NODE_ENV);

const preLoaders = {
	js: {
		test: /\.jsx?$/,
		loaders: ['eslint-loader'],
		exclude: ['node_modules']
	}
};

const loaders = {
	js: {
		test: /\.jsx?$/,
		loaders: ['babel'],
		include: path.join(__dirname, 'src')
	}
	// scss: {test: /\.scss$/, loader: 'style!css!postcss!sass'}
};

// Config
const config = {};
module.exports = config;

config.resolve = {
	extensions: ['', '.js', '.jsx']
	// modulesDirectories: ['node_modules'],
	// root: path.resolve('.')
};

config.plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
	})
];

if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
	config.entry = {
		main: ['./src/index']
	};

	config.output = {
		path: path.join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: '/'
	};

	config.plugins.push(
		new HtmlWebpackPlugin({
			chunkSortMode: 'dependency',
			filename: 'index.html',
			hash: false,
			inject: 'body',
			template: './src/index.html'
		})
	);

	config.module = {
		preLoaders: [ preLoaders.js ],
		loaders: [ loaders.js ]
	};

	config.eslint = {
		configFile: '.eslintrc'
	};
}

if (ENV_DEVELOPMENT) {
	config.devtool = 'cheap-module-source-map';

	config.entry.main.unshift(
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'babel-polyfill'
	);

	config.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);

	config.devServer = {
		contentBase: './src',
		// historyApiFallback: true,
		host: HOST,
		hot: true,
		port: PORT,
		publicPath: config.output.publicPath,
		stats: {
			cached: true,
			cachedAssets: true,
			chunks: true,
			chunkModules: false,
			colors: true,
			hash: false,
			reasons: true,
			timings: true,
			version: false
		}
	};
}

if (ENV_PRODUCTION) {
	config.devtool = 'source-map';

	config.output.filename = '[name].[chunkhash].js';

	// Over ride production public path
	// so can access last production build in path /static/ under dev server
	config.output.publicPath = '/static/';

	config.module = {
		loaders: [
			loaders.js
			// {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass')}
		]
	};

	config.plugins.push(
		new WebpackMd5Hash(),
		// new ExtractTextPlugin('styles.[contenthash].css'),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: Infinity
		// }),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				dead_code: true, // eslint-disable-line camelcase
				screw_ie8: true, // eslint-disable-line camelcase
				unused: true,
				warnings: false
			}
		})
	);
}
