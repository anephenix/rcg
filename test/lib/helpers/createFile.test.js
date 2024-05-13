// NPM Dependencies
const assert = require('assert');
const path = require('path');
const createFile = require('../../../lib/helpers/createFile');
const { exists, readFile, unlink } = require('../../helpers');

describe('createFile', function() {
	const fileName = 'my-example-file.txt';
	const folderPath = process.cwd();
	const filePath = path.join(folderPath, fileName);

	beforeEach(async function() {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	});

	afterEach(async function() {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	});

	it('should create a file with a given filename, and given content', async function() {
		const fileContent = 'Hello world';
		await createFile(folderPath, fileName, fileContent);
		const fileExists = await exists(filePath);
		assert(fileExists);
		const readFileContent = await readFile(filePath);
		assert.equal(readFileContent, fileContent);
	});
});
