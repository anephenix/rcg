// NPM Dependencies
const assert = require('assert');
const path = require('path');
// File Dependencies
const {
	createFile,
	getFileContentForComponent,
	getFileContentForStyleFile,
	getFileContentForTestFile,
	generateComponentFile,
	generateTestFile,
	generateStyleFile
} = require('../../../lib/generators');
const { exists, readFile, unlink, mkdir, rmdir } = require('../../helpers');
const {
	expectedComponentContent,
	expectedComponentContentWithDom,
	expectedSASSContent,
	expectedSASSContentWithCustomCSS,
	expectedTestContent
} = require('../../data');

const checkAndRemove = async (folderPath, filePath) => {
	const fileExists = await exists(filePath);
	if (fileExists) await unlink(filePath);
	const folderExists = await exists(folderPath);
	if (folderExists) await rmdir(folderPath);
};

describe('createFile', () => {
	const fileName = 'my-example-file.txt';
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

	it('should create a file with a given filename, and given content', async () => {
		const fileContent = 'Hello world';
		await createFile(folderPath, fileName, fileContent);
		const fileExists = await exists(filePath);
		assert(fileExists);
		const readFileContent = await readFile(filePath);
		assert.equal(readFileContent, fileContent);
	});
});

describe('getFileContentForComponent', () => {
	it('should return the file content for a React component', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		assert.equal(
			getFileContentForComponent(title, folderName),
			expectedComponentContent
		);
	});

	it('should allow for custom html to be passed into the component', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const customDOM = '<div>Welcome here</div>';
		assert.equal(
			getFileContentForComponent(title, folderName, customDOM),
			expectedComponentContentWithDom(customDOM)
		);
	});
});

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

describe('getFileContentForTestFile', () => {
	it('should return the file content for a test file for the React component', () => {
		const title = 'MyTestComponent';
		assert.equal(getFileContentForTestFile(title), expectedTestContent);
	});
});

describe('generateComponentFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.js`);

	beforeEach(async () => await checkAndRemove(folderPath, filePath));
	afterEach(async () => await checkAndRemove(folderPath, filePath));

	it('should create the file for the React Component, based on the name', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateComponentFile({ title, folderName, folderPath });
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(
			getFileContentForComponent(title, folderName),
			fileContent
		);
	});
});

describe('generateTestFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.test.js`);

	beforeEach(async () => await checkAndRemove(folderPath, filePath));
	afterEach(async () => await checkAndRemove(folderPath, filePath));

	it('should create the test file, based on the name of the component', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateTestFile({ title, folderPath });
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(getFileContentForTestFile(title), fileContent);
	});
});

describe('generateStyleFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.scss`);

	beforeEach(async () => await checkAndRemove(folderPath, filePath));
	afterEach(async () => await checkAndRemove(folderPath, filePath));

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
});
