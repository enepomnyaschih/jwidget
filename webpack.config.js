var webpack = require("webpack");

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: "./dist/jwidget.js",
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' as resolvable extension.
		extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
	},

	module: {
		loaders: [
			// All files with a '.ts' extension will be handled by 'ts-loader'.
			{ test: /\.ts$/, loader: "ts-loader" }
		],

		preLoaders: [
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ test: /\.js$/, loader: "source-map-loader" }
		]
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
	},

	plugins: [
		//new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
};
