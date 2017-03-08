var path = require("path"),
	webpack = require("webpack"),
	CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "dist/src"),
	entry: "./test/all.ts",
	output: {
		path: path.resolve(__dirname, "dist/test"),
		filename: "all.js",
	},

	devtool: "source-map",

	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".js"]
	},

	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader" },
			{ test: /\.js$/, loader: "source-map-loader", enforce: "pre" }
		]
	},

	plugins: [
		new CleanWebpackPlugin(["dist"], {
			exclude: [".npmignore", "src", "package.json", "test/bower_components"]
		})
	]
};
