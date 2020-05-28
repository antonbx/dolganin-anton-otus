const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const filename = ext => `[name].[hash].${ext}`;

module.exports = {
	context: path.resolve(__dirname, 'webpack/src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.tsx']
	},
	output: {
		filename: filename('js'),
		path: path.resolve('webpack/dist')
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript',
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			}
		]
	}
};