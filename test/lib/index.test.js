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

	it('should generate the source folder path if it does not exist', async () => {
		const otherTitle = 'MyOtherTestComponent';
		const otherFolderName = 'my-other-test-component';
		const otherSrcFolderPath = path.join(process.cwd(), 'new-folder');
		const otherFolderPath = path.join(
			process.cwd(),
			'new-folder',
			otherFolderName
		);

		await generateComponentFiles({
			title: otherTitle,
			folderName: otherFolderName,
			srcFolderPath: otherSrcFolderPath,
		});
		const srcfolderExists = await exists(otherSrcFolderPath);
		assert(srcfolderExists);
		const folderExists = await exists(otherFolderPath);
		assert(folderExists);
		const componentExists = await exists(
			path.join(otherFolderPath, `${otherTitle}.js`)
		);
		assert(componentExists);
		const testExists = await exists(
			path.join(otherFolderPath, `${otherTitle}.test.js`)
		);
		assert(testExists);
		const styleExists = await exists(
			path.join(otherFolderPath, `${otherTitle}.scss`)
		);
		assert(styleExists);

		await cleanup(otherFolderPath);
		await cleanup(otherSrcFolderPath);
	});
});
