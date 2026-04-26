import { promises as fs } from "node:fs";
import path from "node:path";
import type { ComponentProp } from "./generators/component.js";
import {
	generateComponentFile,
	generateStyleFile,
	generateTestFile,
} from "./generators/index.js";

interface GenerateComponentFilesOptions {
	title: string;
	folderName: string;
	srcFolderPath: string;
	customDOM?: string | null;
	customCSS?: string | null;
	customJSExtension?: string | null;
	customCssExtension?: string | null;
	nextjsSassSupport?: boolean;
	customProps?: ComponentProp[] | null;
}

const generateComponentFiles = async ({
	title,
	folderName,
	srcFolderPath,
	customDOM,
	customCSS,
	customJSExtension,
	customCssExtension,
	nextjsSassSupport,
	customProps,
}: GenerateComponentFilesOptions): Promise<string[]> => {
	const folderPath = path.join(srcFolderPath, folderName);
	await fs.mkdir(folderPath, { recursive: true });
	const filesCreated: string[] = [];
	const styleFilePath = await generateStyleFile({
		title,
		folderName,
		folderPath,
		customCSS,
		customCssExtension,
		nextjsSassSupport,
	});
	const componentFilePath = await generateComponentFile({
		title,
		folderName,
		folderPath,
		customDOM,
		customJSExtension,
		customCssExtension,
		nextjsSassSupport,
		customProps,
	});
	const testFilePath = await generateTestFile({
		title,
		folderName,
		folderPath,
		customJSExtension,
	});
	filesCreated.push(componentFilePath);
	filesCreated.push(styleFilePath);
	filesCreated.push(testFilePath);
	return filesCreated;
};

export { generateComponentFiles };
