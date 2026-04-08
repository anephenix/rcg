import { promises as fs } from "node:fs";
import path from "node:path";

const createFile = async (
	folderPath: string,
	fileName: string,
	fileContent: string,
): Promise<string> => {
	const filePath = path.join(folderPath, fileName);
	await fs.writeFile(filePath, fileContent);
	return filePath;
};

export default createFile;
