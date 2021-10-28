// Dependencies
const createFile = require('../helpers/createFile');

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

module.exports = { getFileContentForStyleFile, generateStyleFile };
