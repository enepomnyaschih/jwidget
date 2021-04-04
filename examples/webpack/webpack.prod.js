const merge = require("webpack-merge").default,
	CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
	TerserPlugin = require("terser-webpack-plugin"),
	common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin()
		]
	}
});
