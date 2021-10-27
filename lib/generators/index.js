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
	await writeFile(filePath, fileContent);
	return filePath;
};

/*
	Generates the file content for the React component
*/
const getFileContentForComponent = (
	title,
	folderName,
	customDOM,
	customCssExtension,
	nextjsSassSupport
) => {
	let element = `<div id='${folderName}' />`;
	if (nextjsSassSupport) element = `<div id={styles['${folderName}']} />`;
	if (customDOM) element = `<div id='${folderName}'>${customDOM}</div>`;
	if (customDOM && nextjsSassSupport)
		element = `<div id={styles['${folderName}']}>${customDOM}</div>`;
	const nextJsStylesVariable = nextjsSassSupport ? 'styles from ' : '';
	const fileExtension = nextjsSassSupport
		? 'module.scss'
		: customCssExtension;
	return `
import ${nextJsStylesVariable}'./${title}.${fileExtension}';

const ${title} = () => (${element});
			
export default ${title};`;
};

/*
	Generates the file content for the Styling file
*/
const getFileContentForStyleFile = (title, customCSS) => {
	const css = customCSS || '// TODO - put styling information here';
	return `
#${title} {
	${css}
}`;
};

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
	Generates the React component file
*/
const generateComponentFile = async ({
	title,
	folderName,
	folderPath,
	customDOM,
	customJSExtension,
	customCssExtension,
	nextjsSassSupport,
}) => {
	if (!customJSExtension) customJSExtension = 'js';
	const fileName = `${title}.${customJSExtension}`;
	const fileContent = getFileContentForComponent(
		title,
		folderName,
		customDOM,
		customCssExtension,
		nextjsSassSupport
	);
	return await createFile(folderPath, fileName, fileContent);
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

/*
	Generates the styling file
*/
const generateStyleFile = async ({
	title,
	folderName,
	folderPath,
	customCSS,
	customCssExtension,
	nextjsSassSupport,
}) => {
	const fileName = `${title}.${
		nextjsSassSupport ? 'module.scss' : customCssExtension || 'scss'
	}`;
	const fileContent = getFileContentForStyleFile(folderName, customCSS);
	return await createFile(folderPath, fileName, fileContent);
};

module.exports = {
	createFile,
	getFileContentForComponent,
	getFileContentForStyleFile,
	getFileContentForTestFile,
	generateComponentFile,
	generateTestFile,
	generateStyleFile,
};
