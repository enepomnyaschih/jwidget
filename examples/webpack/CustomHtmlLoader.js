// This loader doesn't do useless things like inline URL preloading, but in exchange it smashes spaces between elements

var loaderUtils = require("loader-utils");
var compile = require("es6-templates").compile;

function getLoaderConfig(context) {
	var query = loaderUtils.getOptions(context) || {};
	var configKey = query.config || 'inlineBlockLoader';
	var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};

	delete query.config;

	return Object.assign(query, config);
}

module.exports = function (content) {
	this.cacheable && this.cacheable();
	var config = getLoaderConfig(this);

	content = content
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/>\s*\n\s*</g, "><");

	if (config.interpolate && config.interpolate !== 'require') {
		// Double escape quotes so that they are not unescaped completely in the template string
		content = content.replace(/\\"/g, "\\\\\"");
		content = content.replace(/\\'/g, "\\\\\'");
		content = compile('`' + content + '`').code;
	} else {
		content = JSON.stringify(content);
	}

	var exportsString = "module.exports = ";
	if (config.exportAsDefault) {
		exportsString = "exports.default = ";

	} else if (config.exportAsEs6Default) {
		exportsString = "export default ";
	}

	return exportsString + content + ";";
};
