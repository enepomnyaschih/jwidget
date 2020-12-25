const merge = require("webpack-merge").default,
	common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map"
});
