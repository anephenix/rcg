// NPM Dependencies
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisified functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);

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
		const expectedContent = `
import './MyTestComponent.scss';

const MyTestComponent = () => (<div id='my-test-component' />);
			
export default MyTestComponent;`;
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		assert.equal(
			getFileContentForComponent(title, folderName),
			expectedContent
		);
	});
});

describe('getFileContentForStyleFile', () => {
	it('should return the file content for a SASS file', () => {
		const expectedContent = `
#my-test-component {
	// TODO - put styling information here
}`;
		const folderName = 'my-test-component';
		assert.equal(getFileContentForStyleFile(folderName), expectedContent);
	});
});

describe('getFileContentForTestFile', () => {
	it('should return the file content for a test file for the React component', () => {
		const expectedContent = `
import MyTestComponent from './MyTestComponent';

describe('MyTestComponent', () => {
	it('should do something');
});`;
		const title = 'MyTestComponent';
		assert.equal(getFileContentForTestFile(title), expectedContent);
	});
});

describe('generateComponentFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.js`);
	beforeEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

	afterEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

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
	beforeEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

	afterEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

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
	beforeEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

	afterEach(async () => {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
		const folderExists = await exists(folderPath);
		if (folderExists) await rmdir(folderPath);
	});

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
