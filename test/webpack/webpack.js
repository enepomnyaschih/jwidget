const path = require("path"),
	CleanWebpackPlugin = require("clean-webpack-plugin");

const publicFolder = "dist";

const babelLoader = {
	loader: 'babel-loader',
	options: {
		presets: [
			[
				path.resolve(__dirname, "../node_modules/babel-preset-env"),
				{
					"targets": {
						"browsers": [
							"last 2 versions",
							"IE >= 11"
						]
					}
				}
			]
		]
	}
};

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	context: path.resolve(__dirname, "../src"),
	entry: {
		all: './all.ts'
	},
	output: {
		filename: "all.js",
		path: path.resolve(__dirname, "../" + publicFolder),
		publicPath: "/"
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.jw.html$/,
				loader: path.resolve(__dirname, "./CustomHtmlLoader.js")
			},
			{
				test: /\.js$/,
				use: [babelLoader]
			},
			{
				test: /\.ts$/,
				use: [
					babelLoader,
					{
						loader: "ts-loader"
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([publicFolder], {
			root: path.resolve(__dirname, "..")
		})
	],
	stats: {
		assets: false,
		children: false,
		entrypoints: false,
		modules: false
	}
};
