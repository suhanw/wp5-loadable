'use strict';

const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								exportLocalsConvention: 'camelCase',
								localIdentName: '[local]_[hash:base64:5]',
							},
						},
					},
					'less-loader',
				],
			},
		],
	},

	resolve: {
		extensions: ['.js', '.less'],
	},

	plugins: [
		new MiniCssExtractPlugin({ // extracts css from bundle
			filename: `styles/[name].css`,
		}),
		new LoadablePlugin({ // to enable SSR code splitting
			filename: `loadable-stats.json`, // list of webpack chunk assets
			writeToDisk: true 
		}),
	]
};
