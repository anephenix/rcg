import assert from "assert";
import path from "path";
import { afterEach, beforeEach, describe, it } from "vitest";
import {
	generateTestFile,
	getFileContentForTestFile,
} from "../../../dist/lib/generators/test.js";
import { expectedTestContent } from "../../data";
import { checkAndRemove, exists, mkdir, readFile } from "../../helpers";

describe("getFileContentForTestFile", () => {
	it("should return the file content for a test file for the React component", () => {
		const title = "MyTestComponent";
		assert.equal(getFileContentForTestFile(title), expectedTestContent);
	});
});

describe("generateTestFile", () => {
	const title = "MyTestComponent";
	const folderName = "my-test-component";
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.test.js`);
	const customJSExtension = "jsx";
	const filePathWithCustomJSExtension = path.join(
		folderPath,
		`${title}.test.${customJSExtension}`,
	);

	beforeEach(async () => {
		return await checkAndRemove(folderPath, [
			filePath,
			filePathWithCustomJSExtension,
		]);
	});

	afterEach(async () => {
		return await checkAndRemove(folderPath, [
			filePath,
			filePathWithCustomJSExtension,
		]);
	});

	it("should create the test file, based on the name of the component", async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateTestFile({ title, folderPath });
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(getFileContentForTestFile(title), fileContent);
	});

	it("can create the test file with a custom extension, if a custom extension is passed", async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateTestFile({
			title,
			folderPath,
			customJSExtension,
		});
		const fileExists = await exists(filePathWithCustomJSExtension);
		assert(fileExists);
		const fileContent = await readFile(filePathWithCustomJSExtension);
		assert.equal(getFileContentForTestFile(title), fileContent);
	});
});
