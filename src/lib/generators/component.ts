import createFile from "../helpers/createFile.js";

interface GetDOMOptions {
	folderName: string;
	nextjsSassSupport?: boolean | null;
	customDOM?: string | null;
}

const getDOM = ({
	folderName,
	nextjsSassSupport,
	customDOM,
}: GetDOMOptions): string => {
	let element = `<div id='${folderName}' />`;
	if (nextjsSassSupport) element = `<div id={styles['${folderName}']} />`;
	if (customDOM) element = `<div id='${folderName}'>${customDOM}</div>`;
	if (customDOM && nextjsSassSupport)
		element = `<div id={styles['${folderName}']}>${customDOM}</div>`;
	return element;
};

interface FileContentTemplateOptions {
	importStatement: string;
	title: string;
	element: string;
}

const fileContentTemplate = ({
	importStatement,
	title,
	element,
}: FileContentTemplateOptions): string => {
	return `
${importStatement}

const ${title} = () => (${element});

export default ${title};`;
};

const getFileContentForComponent = (
	title: string,
	folderName: string,
	customDOM?: string | null,
	customCssExtension?: string | null,
	nextjsSassSupport?: boolean | null,
): string => {
	const element = getDOM({ folderName, nextjsSassSupport, customDOM });
	const nextJsStylesVariable = nextjsSassSupport ? "styles from " : "";
	const fileExtension = nextjsSassSupport ? "module.scss" : customCssExtension;
	const importStatement = `import ${nextJsStylesVariable}'./${title}.${fileExtension}';`;
	return fileContentTemplate({ importStatement, title, element });
};

interface GenerateComponentFileOptions {
	title: string;
	folderName: string;
	folderPath: string;
	customDOM?: string | null;
	customJSExtension?: string | null;
	customCssExtension?: string | null;
	nextjsSassSupport?: boolean | null;
}

const generateComponentFile = async ({
	title,
	folderName,
	folderPath,
	customDOM,
	customJSExtension,
	customCssExtension,
	nextjsSassSupport,
}: GenerateComponentFileOptions): Promise<string> => {
	const jsExtension = customJSExtension || "js";
	const fileName = `${title}.${jsExtension}`;
	const fileContent = getFileContentForComponent(
		title,
		folderName,
		customDOM,
		customCssExtension,
		nextjsSassSupport,
	);
	return await createFile(folderPath, fileName, fileContent);
};

export { generateComponentFile, getFileContentForComponent };
