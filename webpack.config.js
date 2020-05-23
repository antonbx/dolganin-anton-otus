// npm install -D webpack webpack-cli
// npm install -D webpack-dev-server (for realtime visualization)
// npm install -D html-webpack-plugin
// npm install -D clean-webpack-plugin
// npm install -D style-loader css-loader
// npm install -D cross-env (for work with env vars)
// npm install -D copy-webpack-plugin (for copy static files, for example favicon.ico)
// npm install --save-dev mini-css-extract-plugin (for saving styles in css-file)
// npm install normalize.css (for @import '~normalize.css')
// npm install terser-webpack-plugin --save-dev (optimization)
// npm install --save-dev optimize-css-assets-webpack-plugin (optimization)
// npm install --save-dev babel-loader @babel/core
// npm install --save-dev @babel/preset-env (into package.josn: "browserslist": "> 0.25%, not dead")
// npm install --save @babel/polyfill


// webpack --mode development
// webpack --mode production
// webpack-dev-server --mode development --open (риалтайм изменения)

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('is dev', isDev);

const optimization = () => {
	const config = {
		// например, одну библиотеку подключаем в нескольких файлах, это позволит библиотеку выносить отдельно
		splitChunks: {
			chunks: 'all'
		}
	};

	if (!isDev) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin()
		];
	}

	return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
	context: path.resolve(__dirname, 'webpack/src'),// по сути префикс ко всем путям, чтобы не писать одинаковое
	mode: 'development',// позволяет не минимизировать выходные файлы
	entry: {
		// если нам надо разделить выход на несоклько файлов, иначе можно указать один
		main: ['@babel/polyfill', './index.jsx'],
		analytics: './analytics.ts'
	},
	output: {
		// учитываем имя бандла, если выходных файлов несколько,
		// а также хешируем имя в зависимости от контента
		filename: filename('js'),
		path: path.resolve('webpack/dist')
	},
	resolve: {
		// чтобы не писать расширения подключаемых файлов, по-умолчанию понимает только js без расширения
		extensions: ['.js', '.json'],
		// алиасы папок файлов, чтобы не париться с путями
		alias: {
			'@models': path.resolve(__dirname, 'webpack/src/models'),
			'@': path.resolve(__dirname, 'src'),
		}
	},
	optimization: optimization(),
	// для запуска риалтайм изменений
	devServer: {
		port: 4200,
		hot: isDev
	},
	plugins: [
		// плагин позволяет билдить целевую страницу сразу с подключенными файлами
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		// для очистки выхлопной директории
		new CleanWebpackPlugin(),
		// копируем некоторую статику
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'webpack/src/favicon.ico'),
				to: path.resolve(__dirname, 'webpack/dist')
			}
		]),
		// говорим, в каком формате сохранять наш css
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				// для всех css ...
				test: /\.css$/,
				// ... запускаем лоадеры, через css-loader учим вебпак понимать css,
				// style-loader позволяет добавлять стили в html
				// вебпак читает справа налево!
				//use: ['style-loader', 'css-loader']
				// если используемый умный экстрактор
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,// изменять сущности без перезагрузки страницы
						}
					},
					'css-loader'
				]
			},
			{
				// для всех css ...
				test: /\.less$/,
				// ... запускаем лоадеры, через css-loader учим вебпак понимать css,
				// style-loader позволяет добавлять стили в html
				// вебпак читает справа налево!
				//use: ['style-loader', 'css-loader']
				// если используемый умный экстрактор
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,// изменять сущности без перезагрузки страницы
						}
					},
					'css-loader',
					'less-loader'
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
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-typescript'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					}
				}
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
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