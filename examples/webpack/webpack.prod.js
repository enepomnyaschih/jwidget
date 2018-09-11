const merge = require("webpack-merge"),
	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
	common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
});
