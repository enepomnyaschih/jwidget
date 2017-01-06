var path = require("path"),
	webpack = require("webpack"),
	CleanWebpackPlugin = require('clean-webpack-plugin');

var optimize = process.argv.indexOf('--optimize') !== -1;

module.exports = {
	context: path.resolve(__dirname, "dist/src"),
	entry: "./index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "jwidget.js",
	},

	devtool: optimize ? undefined : "source-map",

	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	},

	module: {
		loaders: [
			{ test: /\.ts$/, loader: "ts" }
		],

		preLoaders: [
			{ test: /\.js$/, loader: optimize ? "webpack-strip-block" : "source-map" }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist'], {
			exclude: ['src']
		})
	].concat(optimize ? [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compressor: {
				warnings: false
			}
		})
	] : [])
};
