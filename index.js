// NPM Dependencies
const to = require('to-case');

// File Dependencies
const { generateComponentFiles } = require('./lib');

/*
	Generates the React component's files
*/
const generateComponent = async (
	componentName,
	srcFolderPath,
	customDOM,
	customCSS,
	customJSExtension
) => {
	const title = to.pascal(componentName);
	const folderName = to.slug(componentName);
	await generateComponentFiles({
		title,
		folderName,
		srcFolderPath,
		customDOM,
		customCSS,
		customJSExtension
	});
};

module.exports = generateComponent;
