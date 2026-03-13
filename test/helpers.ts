import { exec as execCallback } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { promisify } from "util";

const exec = promisify(execCallback);

const exists = async (filePath: string): Promise<boolean> => {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
};

const readFile = (
	filePath: string,
	encoding?: BufferEncoding,
): Promise<string> => fs.readFile(filePath, encoding || "utf8");

const writeFile = (filePath: string, content: string): Promise<void> =>
	fs.writeFile(filePath, content);

const unlink = (filePath: string): Promise<void> => fs.unlink(filePath);

const mkdir = (dirPath: string): Promise<string | undefined> =>
	fs.mkdir(dirPath);

const rmdir = (dirPath: string): Promise<void> => fs.rmdir(dirPath);

const readdir = (dirPath: string): Promise<string[]> => fs.readdir(dirPath);

const cleanup = async (folderPath: string): Promise<void> => {
	const folderExists = await exists(folderPath);
	if (!folderExists) return;
	const files = await readdir(folderPath);
	for (const file of files) {
		await unlink(path.join(folderPath, file));
	}
	await rmdir(folderPath);
};

const checkAndRemove = async (
	folderPath: string,
	filePaths: string[],
): Promise<void> => {
	for (const filePath of filePaths) {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	}
	const folderExists = await exists(folderPath);
	if (folderExists) await rmdir(folderPath);
};

export {
	exists,
	writeFile,
	readFile,
	unlink,
	mkdir,
	rmdir,
	readdir,
	exec,
	cleanup,
	checkAndRemove,
};
