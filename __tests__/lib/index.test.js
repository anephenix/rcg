const assert = require('assert');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisified functions
const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
// File Dependencies
const { generateComponentFiles } = require('../../lib');

describe('generateComponentFiles', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const srcFolderPath = process.cwd();
	const folderPath = path.join(process.cwd(), folderName);

	beforeEach(async () => {
		const folderExists = await exists(folderPath);
		if (!folderExists) return;
		const files = await readdir(folderPath);
		for (const file of files) {
			await unlink(path.join(folderPath, file));
		}
		await rmdir(folderPath);
	});

	afterEach(async () => {
		const folderExists = await exists(folderPath);
		if (!folderExists) return;
		const files = await readdir(folderPath);
		for (const file of files) {
			await unlink(path.join(folderPath, file));
		}
		await rmdir(folderPath);
	});

	it('should create a containing folder and a set of files for a React component', async () => {
		await generateComponentFiles({ title, folderName, srcFolderPath });
		const folderExists = await exists(folderPath);
		assert(folderExists);
		const componentExists = await exists(
			path.join(folderPath, `${title}.js`)
		);
		assert(componentExists);
		const testExists = await exists(
			path.join(folderPath, `${title}.test.js`)
		);
		assert(testExists);
		const styleExists = await exists(
			path.join(folderPath, `${title}.scss`)
		);
		assert(styleExists);
	});
});
