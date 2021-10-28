// Dependencies
const createFile = require('../helpers/createFile');

/*
	Generates the file content for the test file
*/
const getFileContentForTestFile = (title) => {
	return `
import ${title} from './${title}';

describe('${title}', () => {
	${title};
	test.todo('should do something');
});`;
};

/*
	Generates the test file
*/
const generateTestFile = async ({ title, folderPath, customJSExtension }) => {
	if (!customJSExtension) customJSExtension = 'js';
	const fileName = `${title}.test.${customJSExtension}`;
	const fileContent = getFileContentForTestFile(title);
	return await createFile(folderPath, fileName, fileContent);
};

module.exports = { getFileContentForTestFile, generateTestFile };
