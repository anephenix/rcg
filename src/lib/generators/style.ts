import createFile from "../helpers/createFile.js";

const getFileContentForStyleFile = (
	title: string,
	customCSS?: string | null,
): string => {
	const css = customCSS || "// TODO - put styling information here";
	return `
#${title} {
	${css}
}`;
};

interface GenerateStyleFileOptions {
	title: string;
	folderName: string;
	folderPath: string;
	customCSS?: string | null;
	customCssExtension?: string | null;
	nextjsSassSupport?: boolean | null;
}

const generateStyleFile = async ({
	title,
	folderName,
	folderPath,
	customCSS,
	customCssExtension,
	nextjsSassSupport,
}: GenerateStyleFileOptions): Promise<string> => {
	const fileName = `${title}.${
		nextjsSassSupport ? "module.scss" : customCssExtension || "scss"
	}`;
	const fileContent = getFileContentForStyleFile(folderName, customCSS);
	return await createFile(folderPath, fileName, fileContent);
};

export { getFileContentForStyleFile, generateStyleFile };
