import { promises as fs } from "fs";
import path from "path";

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
