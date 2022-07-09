// /* eslint-disable */
// const path = require('path');
// const dotenv = require('dotenv');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
// const {} = require('webpack-dev-server');

// if (!['development', 'production'].includes(process.env.NODE_ENV)) {
// 	throw new Error(`\`NODE_ENV\` isn't set`);
// }

// const env = { ...dotenv.config().parsed, NODE_ENV: process.env.NODE_ENV };

// const envToInject = Object.entries(env).reduce((acc, [key, value]) => {
// 	acc[`process.env.${key}`] = JSON.stringify(value);

// 	return acc;
// }, {});

// const isDev = process.env.NODE_ENV === 'development';

// module.exports = () => {
// 	return {
// 		mode: env.NODE_ENV,
// 		devtool: false,
// 		context: path.resolve(__dirname, '.'),
// 		entry: ['./src/index.tsx'],
// 		output: {
// 			path: path.resolve(__dirname, './dist'),
// 			filename: `${isDev ? '' : '[name].[contenthash:8].'}bundle.js`,
// 			publicPath: '/',
// 			pathinfo: false,
// 		},
// 		module: {
// 			rules: [
// 				{
// 					test: /\.ts(x?)$/,
// 					loader: 'ts-loader',
// 					exclude: [/dist/, /node_modules/],
// 					options: {
// 						transpileOnly: isDev,
// 					},
// 				},
// 				{
// 					test: /\.(woff|woff2|eot|ttf|otf)$/i,
// 					type: 'asset/resource',
// 				},
// 				{
// 					test: /\.(?:ico|gif|png|jpeg|webp|svg)$/i,
// 					type: 'asset/resource',
// 				},
// 				{
// 					test: /\.(scss|css)$/,
// 					use: ['style-loader', 'css-loader'],
// 				},
// 			],
// 		},
// 		resolve: {
// 			extensions: ['.ts', '.tsx', '.js'],
// 			//TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
// 			//@ts-ignore
// 			plugins: [new TsconfigPathsPlugin()],
// 			alias: {
// 				process: 'process/browser',
// 			},
// 		},
// 		// resolve: {
// 		// 	extensions: ['.ts', '.tsx', '.js', '.jsx'],
// 		// 	alias: {
// 		// 		src: path.resolve(__dirname, './src/'),
// 		// 	},
// 		// },
// 		plugins: [
// 			new webpack.DefinePlugin(envToInject),
// 			new HtmlWebpackPlugin({
// 				template: './public/index.html',
// 				favicon: './public/favicon.png',
// 			}),
// 			new ForkTsCheckerWebpackPlugin({
// 				// eslint: {
// 				// 	files: './src/**/*.{ts,tsx,js,jsx}',
// 				// },
// 			}),
// 		],
// 		...(isDev
// 			? {
// 					devServer: {
// 						historyApiFallback: {
// 							index: '/',
// 						},
// 						open: ['/'],
// 						port: 3000,
// 						client: {
// 							overlay: true,
// 						},
// 					},
// 			  }
// 			: {}),
// 	};
// };

import path from 'path';
import webpack, { Configuration } from 'webpack';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {} from 'webpack-dev-server';

dotenv.config({ path: './.env' });

const webpackConfig = (env): Configuration => {
	const isProd = process.env.NODE_ENV === 'production';

	return {
		entry: './src/index.tsx',
		...(isProd ? {} : { devtool: 'eval-source-map' }),
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					extractComments: true,
				}),
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			//TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
			//@ts-ignore
			plugins: [new TsconfigPathsPlugin()],
			alias: {
				process: 'process/browser',
			},
		},
		output: {
			path: path.join(__dirname, '/dist'),
			// filename: `${env.development ? '' : '[name].[contenthash:8].'}bundle.js`,
			filename: 'bundle-[fullhash].js',
			// publicPath: env.development ? '/' : `${env.PUBLIC_URL}/`
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: !isProd,
					},
					exclude: [/dist/, /node_modules/],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(?:ico|gif|png|jpeg|webp|svg)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(scss|css)$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			new webpack.DefinePlugin({
				'process.env.PRODUCTION': env.production || !env.development,
				'process.env.NAME': JSON.stringify(require('./package.json').name),
				'process.env.VERSION': JSON.stringify(require('./package.json').version),
				'process.env': JSON.stringify(process.env),
			}),
			new ForkTsCheckerWebpackPlugin({
				// eslint: {
				// 	files: './src/**/*.{ts,tsx,js,jsx}',
				// },
			}),
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
			new webpack.EnvironmentPlugin({ ...env }),
			new CompressionPlugin({
				algorithm: 'gzip',
			}),
		],
		devServer: {
			historyApiFallback: true,
			port: 3000,
			client: {
				overlay: true,
			},
		},
	};
};

export default webpackConfig;
