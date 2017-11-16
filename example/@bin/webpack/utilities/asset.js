module.exports.resolve = ($, assetType, options = {}) => {
	if ($(`${$('argv.lifecycle')}.useRelativePath`)) {
		options.useRelativePath = true;
		options.cssOutputPath = $('path.output.style');
		options.outputPath = $(`path.output.${assetType}`);
		options.name = '[name].[hash:7].[ext]';
	} else {
		options.name = $(`path.output.${assetType}`, '[name].[hash:7].[ext]');
	}
	return options;
};
