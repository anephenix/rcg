import createFile from "../helpers/createFile.js";

interface GetDOMOptions {
	folderName: string;
	nextjsSassSupport?: boolean | null;
	customDOM?: string | null;
}

export interface ComponentProp {
	name: string;
	type: string;
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

const isTypeScriptExtension = (ext?: string | null): boolean =>
	ext === "ts" || ext === "tsx";

const buildPropsInterface = (props: ComponentProp[], title: string): string => {
	const lines = props.map((p) => `\t${p.name}: ${p.type};`).join("\n");
	return `\ninterface ${title}Props {\n${lines}\n}\n`;
};

const buildPropsArg = (
	props: ComponentProp[],
	title: string,
	isTypeScript: boolean,
): string => {
	const names = props.map((p) => p.name).join(", ");
	return isTypeScript ? `{ ${names} }: ${title}Props` : `{ ${names} }`;
};

interface FileContentTemplateOptions {
	importStatement: string;
	title: string;
	element: string;
	customProps?: ComponentProp[] | null;
	isTypeScript?: boolean;
}

const fileContentTemplate = ({
	importStatement,
	title,
	element,
	customProps,
	isTypeScript,
}: FileContentTemplateOptions): string => {
	const hasProps = customProps && customProps.length > 0;
	const propsInterface =
		hasProps && isTypeScript ? buildPropsInterface(customProps, title) : "";
	const propsArg = hasProps
		? buildPropsArg(customProps, title, isTypeScript ?? false)
		: "";
	return `
${importStatement}
${propsInterface}
const ${title} = (${propsArg}) => (${element});

export default ${title};`;
};

const getFileContentForComponent = (
	title: string,
	folderName: string,
	customDOM?: string | null,
	customCssExtension?: string | null,
	nextjsSassSupport?: boolean | null,
	customProps?: ComponentProp[] | null,
	customJSExtension?: string | null,
): string => {
	const element = getDOM({ folderName, nextjsSassSupport, customDOM });
	const nextJsStylesVariable = nextjsSassSupport ? "styles from " : "";
	const fileExtension = nextjsSassSupport ? "module.scss" : customCssExtension;
	const importStatement = `import ${nextJsStylesVariable}'./${title}.${fileExtension}';`;
	return fileContentTemplate({
		importStatement,
		title,
		element,
		customProps,
		isTypeScript: isTypeScriptExtension(customJSExtension),
	});
};

interface GenerateComponentFileOptions {
	title: string;
	folderName: string;
	folderPath: string;
	customDOM?: string | null;
	customJSExtension?: string | null;
	customCssExtension?: string | null;
	nextjsSassSupport?: boolean | null;
	customProps?: ComponentProp[] | null;
}

const generateComponentFile = async ({
	title,
	folderName,
	folderPath,
	customDOM,
	customJSExtension,
	customCssExtension,
	nextjsSassSupport,
	customProps,
}: GenerateComponentFileOptions): Promise<string> => {
	const jsExtension = customJSExtension || "js";
	const fileName = `${title}.${jsExtension}`;
	const fileContent = getFileContentForComponent(
		title,
		folderName,
		customDOM,
		customCssExtension,
		nextjsSassSupport,
		customProps,
		customJSExtension,
	);
	return await createFile(folderPath, fileName, fileContent);
};

export { generateComponentFile, getFileContentForComponent };
