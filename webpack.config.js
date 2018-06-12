const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: ['css-loader', 'sass-loader'],
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		'app.bundle': './src/app.js',
		contact: './src/contact.js',
		utils: './src/utils.js',
	},
	output: {
		path: path.join(__dirname, 'dist'),
		// filename: '[name].[chunkhash].js', // every file has different hash value
		filename: '[name].[hash].js', // files generate the same hash value at one process (for hot module replacement)
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				// css-loader -> style-loader (loader process)
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				// sass-loader -> css-loader -> style-loader (loader process)
				use: cssConfig,
			},
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.pug$/,
				loader: ['raw-loader', 'pug-html-loader'],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
						},
					},
				],
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					// options: { attrs: [':data-src'] },
				},
			},
		],
	},
	devServer: {
		port: 9000,
		open: true,
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Custom template update',
			template: './src/index.html',
			filename: 'index.html',
			minify: { collapseWhitespace: true },
			hash: true,
			chunks: ['app.bundle'],
		}),
		new HtmlWebpackPlugin({
			title: 'Contact page update',
			template: './src/contact.html',
			filename: 'contact.html',
			minify: { collapseWhitespace: true },
			hash: true,
			excludeChunks: ['app.bundle'],
		}),
		new ExtractTextPlugin({ filename: 'styles.css', disable: !isProd }),
		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
};
