import to from "to-case";
import { generateComponentFiles } from "./lib/index.js";

const generateComponent = async (
	componentName: string,
	srcFolderPath: string,
	customDOM?: string | null,
	customCSS?: string | null,
	customJSExtension?: string | null,
	customCssExtension?: string | null,
	nextjsSassSupport?: boolean,
): Promise<string[]> => {
	const title = to.pascal(componentName);
	const folderName = to.slug(componentName);
	const filesCreated = await generateComponentFiles({
		title,
		folderName,
		srcFolderPath,
		customDOM,
		customCSS,
		customJSExtension,
		customCssExtension,
		nextjsSassSupport,
	});
	return filesCreated;
};

export default generateComponent;
