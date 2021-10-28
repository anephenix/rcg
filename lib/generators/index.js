// Dependencies
const {
	getFileContentForComponent,
	generateComponentFile,
} = require('./component');
const { getFileContentForStyleFile, generateStyleFile } = require('./style');
const { getFileContentForTestFile, generateTestFile } = require('./test');

module.exports = {
	getFileContentForComponent,
	getFileContentForStyleFile,
	getFileContentForTestFile,
	generateComponentFile,
	generateTestFile,
	generateStyleFile,
};
