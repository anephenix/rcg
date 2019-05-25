// NPM Dependencies
const util = require('util');
const path = require('path');
const fs = require('fs');

// Promisified functions
const writeFile = util.promisify(fs.writeFile);

/*
	Creates a file with a given folderpath, filename, and the file's content
*/
const createFile = async (folderPath, fileName, fileContent) => {
	const filePath = path.join(folderPath, fileName);
	try {
		return await writeFile(filePath, fileContent);
	} catch (err) {
		throw err;
	}
};

/*
	Generates the file content for the React component
*/
const getFileContentForComponent = (title, folderName) => {
	return `
import './${title}.scss';

const ${title} = () => (<div id='${folderName}' />);
			
export default ${title};`;
};

/*
	Generates the file content for the Styling file
*/
const getFileContentForStyleFile = title => {
	return `
#${title} {
	// TODO - put styling information here
}`;
};

/*
	Generates the file content for the test file
*/
const getFileContentForTestFile = title => {
	return `
import ${title} from './${title}';

describe('${title}', () => {
	it('should do something');
});`;
};

/*
	Generates the React component file
*/
const generateComponentFile = async ({ title, folderName, folderPath }) => {
	const fileName = `${title}.js`;
	const fileContent = getFileContentForComponent(title, folderName);
	return await createFile(folderPath, fileName, fileContent);
};

/*
	Generates the test file
*/
const generateTestFile = async ({ title, folderPath }) => {
	const fileName = `${title}.test.js`;
	const fileContent = getFileContentForTestFile(title);
	return await createFile(folderPath, fileName, fileContent);
};

/*
	Generates the styling file
*/
const generateStyleFile = async ({ title, folderName, folderPath }) => {
	const fileName = `${title}.scss`;
	const fileContent = getFileContentForStyleFile(folderName);
	return await createFile(folderPath, fileName, fileContent);
};

module.exports = {
	createFile,
	getFileContentForComponent,
	getFileContentForStyleFile,
	getFileContentForTestFile,
	generateComponentFile,
	generateTestFile,
	generateStyleFile
};
