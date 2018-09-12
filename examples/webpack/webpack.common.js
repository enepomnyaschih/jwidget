const path = require("path"),
	CleanWebpackPlugin = require("clean-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	pages = require("./pages");

const publicFolder = "public";

const entry = {};
for (let key in pages) {
	if (pages.hasOwnProperty(key)) {
		entry[key] = pages[key].path;
	}
}

module.exports = {
	context: path.resolve(__dirname, "../src"),
	entry: entry,
	output: {
		filename: "bundle-[name]-[contenthash].js",
		path: path.resolve(__dirname, "../" + publicFolder)
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: "url-loader",
				options: {
					limit: 10000
				}
			},
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					"stylus-loader"
				]
			},
			{
				test: /\.jw.html$/,
				exclude: /node_modules/,
				loader: path.resolve(__dirname, "./CustomHtmlLoader.js")
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			}
		]
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all"
		}
	},
	plugins: [
		new CleanWebpackPlugin([publicFolder], {
			root: path.resolve(__dirname, "..")
		}),
		new MiniCssExtractPlugin({
			chunkFilename: "[id]-[contenthash].css"
		})
	].concat(Object.keys(pages).map(function (id) {
		const page = pages[id];
		return new HtmlWebpackPlugin({
			chunks: [id],
			filename: id + ".html",
			template: "!!html-webpack-plugin/lib/loader.js!./webpack/" + (page.template || "template") + ".html",
			inject: "body",
			page: id,
			title: id + " - jWidget examples"
		});
	})),
	stats: {
		assets: false,
		children: false,
		entrypoints: false,
		modules: false
	}
};
