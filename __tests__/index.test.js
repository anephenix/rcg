const assert = require('assert');
const path = require('path');

// File Dependencies
const generateComponent = require('../index');
const { exists, cleanup } = require('../helpers');

describe('generateComponent', () => {
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

	it('should generate a boilerplate for a react component, given a name and a containing folder', async () => {
		await generateComponent(title, srcFolderPath);
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
