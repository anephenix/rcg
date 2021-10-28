// Dependencies
const createFile = require('../helpers/createFile');

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

module.exports = { getFileContentForComponent, generateComponentFile };
