// NPM Dependencies
const assert = require('assert');
const path = require('path');

// File Dependencies
const { generateComponentFiles } = require('../../lib');
const { exists, cleanup } = require('../helpers');

describe('generateComponentFiles', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const srcFolderPath = process.cwd();
	const folderPath = path.join(process.cwd(), folderName);

	beforeEach(async () => {
		await cleanup(folderPath);
	});

	afterEach(async () => {
		await cleanup(folderPath);
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
