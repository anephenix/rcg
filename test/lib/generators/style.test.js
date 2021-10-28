// Dependencies
const assert = require('assert');
const path = require('path');
const {
	expectedSASSContent,
	expectedSASSContentWithCustomCSS,
} = require('../../data');
const {
	getFileContentForStyleFile,
	generateStyleFile,
} = require('../../../lib/generators/style');
const { exists, readFile, mkdir, checkAndRemove } = require('../../helpers');

describe('getFileContentForStyleFile', () => {
	it('should return the file content for a SASS file', () => {
		const folderName = 'my-test-component';
		assert.equal(
			getFileContentForStyleFile(folderName),
			expectedSASSContent
		);
	});

	it('should allow for custom CSS to be passed into the file content for a SASS file', () => {
		const folderName = 'my-test-component';
		const customCSS = 'p { color: red; }';
		assert.equal(
			getFileContentForStyleFile(folderName, customCSS),
			expectedSASSContentWithCustomCSS(customCSS)
		);
	});
});

describe('generateStyleFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.scss`);
	const customCSS = 'p { color: red;}';

	beforeEach(async () => await checkAndRemove(folderPath, [filePath]));
	afterEach(async () => await checkAndRemove(folderPath, [filePath]));

	it('should create the style file, based on the name of the component', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateStyleFile({ title, folderPath, folderName });
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(getFileContentForStyleFile(folderName), fileContent);
	});

	it('should also create a file with custom CSS, if custom CSS is passed', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateStyleFile({ title, folderPath, folderName, customCSS });
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(
			getFileContentForStyleFile(folderName, customCSS),
			fileContent
		);
	});

	it('should enable the user to generate a style file for NextJs built-in sass support', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateStyleFile({
			title,
			folderPath,
			folderName,
			nextjsSassSupport: true,
		});
		const nextSassFilePath = path.join(folderPath, `${title}.module.scss`);
		const fileExists = await exists(nextSassFilePath);
		assert(fileExists);
		const fileContent = await readFile(nextSassFilePath);
		assert.equal(getFileContentForStyleFile(folderName), fileContent);
		await checkAndRemove(folderPath, [nextSassFilePath]);
	});
});
