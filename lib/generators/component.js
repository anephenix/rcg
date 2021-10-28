// Dependencies
const createFile = require('../helpers/createFile');

/**
 * Defines the DOM to put inside of the React component, depending on the
 * folder name, whether the component should support Next.js' built-in SASS
 * support, and whether custom DOM was supplied.
 */
const getDOM = ({ folderName, nextjsSassSupport, customDOM }) => {
	let element = `<div id='${folderName}' />`;
	if (nextjsSassSupport) element = `<div id={styles['${folderName}']} />`;
	if (customDOM) element = `<div id='${folderName}'>${customDOM}</div>`;
	if (customDOM && nextjsSassSupport)
		element = `<div id={styles['${folderName}']}>${customDOM}</div>`;
	return element;
};

const fileContentTemplate = ({ importStatement, title, element }) => {
	return `
${importStatement}

const ${title} = () => (${element});
			
export default ${title};`;
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
	const element = getDOM({ folderName, nextjsSassSupport, customDOM });
	const nextJsStylesVariable = nextjsSassSupport ? 'styles from ' : '';
	const fileExtension = nextjsSassSupport
		? 'module.scss'
		: customCssExtension;
	const importStatement = `import ${nextJsStylesVariable}'./${title}.${fileExtension}';`;
	return fileContentTemplate({ importStatement, title, element });
	// The text template for the file content
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
