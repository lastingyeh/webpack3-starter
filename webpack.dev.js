const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	entry: {
		'app.bundle': './src/app.js',
		contact: './src/contact.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		inline: true,
		port: 9000,
		open: true,
	},
});
