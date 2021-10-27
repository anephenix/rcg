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
	nextjsSassSupport,
}) => {
	const folderPath = path.join(srcFolderPath, folderName);
	await mkdir(folderPath, { recursive: true });
	const filesCreated = [];
	const styleFilePath = await generateStyleFile({
		title,
		folderName,
		folderPath,
		customCSS,
		customCssExtension,
		nextjsSassSupport,
	});
	const componentFilePath = await generateComponentFile({
		title,
		folderName,
		folderPath,
		customDOM,
		customJSExtension,
		customCssExtension,
		nextjsSassSupport,
	});
	const testFilePath = await generateTestFile({
		title,
		folderName,
		folderPath,
		customJSExtension,
	});
	filesCreated.push(componentFilePath);
	filesCreated.push(styleFilePath);
	filesCreated.push(testFilePath);
	return filesCreated;
};

module.exports = {
	generateComponentFiles,
};
