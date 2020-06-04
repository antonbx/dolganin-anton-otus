const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const filename = ext => `[name].[hash].${ext}`;

module.exports = {
	context: path.resolve(__dirname, 'webpack/src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js']
	},
	output: {
		filename: filename('js'),
		path: path.resolve('webpack/dist')
	},
	resolve: {
		extensions: ['.js', '.ts', '.vue'],
		alias: {
			vue: 'vue/dist/vue.esm.js'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
		new VueLoaderPlugin()
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
				test: /\.vue$/,
				loader: 'vue-loader'
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
			}
		]
	}
};