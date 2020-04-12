// NPM Dependencies
const util = require('util');
const fs = require('fs');
const path = require('path');

// File Dependencies
const {
	generateComponentFile,
	generateTestFile,
	generateStyleFile,
} = require('./generators');

/* Promisified functions */
const mkdir = util.promisify(fs.mkdir);

/*
	This generates the files for the React component:

	- The React component
	- The Styling file
	- The test file for the React component
*/
const generateComponentFiles = async ({
	title,
	folderName,
	srcFolderPath,
	customDOM,
	customCSS,
	customJSExtension,
	customCssExtension,
}) => {
	const folderPath = path.join(srcFolderPath, folderName);
	await mkdir(folderPath);
	await generateStyleFile({
		title,
		folderName,
		folderPath,
		customCSS,
		customCssExtension,
	});
	await generateComponentFile({
		title,
		folderName,
		folderPath,
		customDOM,
		customJSExtension,
		customCssExtension,
	});
	await generateTestFile({
		title,
		folderName,
		folderPath,
		customJSExtension,
	});
};

module.exports = {
	generateComponentFiles,
};
