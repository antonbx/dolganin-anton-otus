// webpack --mode development

const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'lit/src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve('lit/dist')
	},
	plugins: [
	],
	module: {
		rules: [
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