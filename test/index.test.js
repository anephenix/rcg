const assert = require('assert');
const path = require('path');

// File Dependencies
const generateComponent = require('../index');
const { exists, cleanup } = require('./helpers');

describe('generateComponent', function() {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const srcFolderPath = process.cwd();
	const folderPath = path.join(process.cwd(), folderName);

	beforeEach(async function() {
		await cleanup(folderPath);
	});

	afterEach(async function() {
		await cleanup(folderPath);
	});

	it('should generate a boilerplate for a react component, given a name and a containing folder', async function() {
		const filesCreated = await generateComponent(title, srcFolderPath);
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
		assert.deepEqual(
			[
				path.join(folderPath, `${title}.js`),
				path.join(folderPath, `${title}.scss`),
				path.join(folderPath, `${title}.test.js`),
			],
			filesCreated
		);
	});
});
