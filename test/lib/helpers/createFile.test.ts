import assert from "assert";
import path from "path";
import { afterEach, beforeEach, describe, it } from "vitest";
import createFile from "../../../dist/lib/helpers/createFile.js";
import { exists, readFile, unlink } from "../../helpers";

describe("createFile", () => {
	const fileName = "my-example-file.txt";
	const folderPath = process.cwd();
	const filePath = path.join(folderPath, fileName);

	beforeEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	});

	afterEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	});

	it("should create a file with a given filename, and given content", async () => {
		const fileContent = "Hello world";
		await createFile(folderPath, fileName, fileContent);
		const fileExists = await exists(filePath);
		assert(fileExists);
		const readFileContent = await readFile(filePath);
		assert.equal(readFileContent, fileContent);
	});
});
