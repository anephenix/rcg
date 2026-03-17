import createFile from "../helpers/createFile.js";

const getFileContentForTestFile = (title: string): string => {
	return `
import ${title} from './${title}';

describe('${title}', () => {
	${title};
	test.todo('should do something');
});`;
};

interface GenerateTestFileOptions {
	title: string;
	folderName?: string;
	folderPath: string;
	customJSExtension?: string | null;
}

const generateTestFile = async ({
	title,
	folderPath,
	customJSExtension,
}: GenerateTestFileOptions): Promise<string> => {
	const jsExtension = customJSExtension || "js";
	const fileName = `${title}.test.${jsExtension}`;
	const fileContent = getFileContentForTestFile(title);
	return await createFile(folderPath, fileName, fileContent);
};

export { generateTestFile, getFileContentForTestFile };
