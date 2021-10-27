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
	generateStyleFile,
} = require('../../../lib/generators');
const { exists, readFile, unlink, mkdir, rmdir } = require('../../helpers');
const {
	expectedComponentContent,
	expectedComponentContentWithDom,
	expectedSASSContent,
	expectedSASSContentWithCustomCSS,
	expectedTestContent,
} = require('../../data');

const checkAndRemove = async (folderPath, filePaths) => {
	for await (const filePath of filePaths) {
		const fileExists = await exists(filePath);
		if (fileExists) await unlink(filePath);
	}
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
			getFileContentForComponent(title, folderName, null, 'scss', false),
			expectedComponentContent
		);
	});

	it('should allow for custom html to be passed into the component', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const customDOM = '<div>Welcome here</div>';
		const customCssExtension = 'scss';
		const nextjsSassSupport = false;
		assert.equal(
			getFileContentForComponent(
				title,
				folderName,
				customDOM,
				customCssExtension,
				nextjsSassSupport
			),
			expectedComponentContentWithDom(customDOM, nextjsSassSupport)
		);
	});

	it('should enable the user to generate a component for NextJs built-in sass support', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const customDOM = null;
		const customCssExtension = 'scss';
		const nextjsSassSupport = true;
		assert.equal(
			getFileContentForComponent(
				title,
				folderName,
				customDOM,
				customCssExtension,
				nextjsSassSupport
			),
			expectedComponentContentWithDom(customDOM, nextjsSassSupport)
		);
	});

	it('should enable the user to generate a component for NextJs built-in sass support and custom DOM', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const customDOM = '<div>Welcome here</div>';
		const customCssExtension = 'scss';
		const nextjsSassSupport = true;
		assert.equal(
			getFileContentForComponent(
				title,
				folderName,
				customDOM,
				customCssExtension,
				nextjsSassSupport
			),
			expectedComponentContentWithDom(customDOM, nextjsSassSupport)
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
	const customJSExtension = 'jsx';
	const filePathWithCustomJSExtension = path.join(
		folderPath,
		`${title}.${customJSExtension}`
	);
	const customDOM = '<div>Welcome here</div>';

	beforeEach(
		async () =>
			await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			])
	);
	afterEach(
		async () =>
			await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			])
	);

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

	it('should also create a file with custom DOM, if custom DOM is passed', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateComponentFile({
			title,
			folderName,
			folderPath,
			customDOM,
		});
		const fileExists = await exists(filePath);
		assert(fileExists);
		const fileContent = await readFile(filePath);
		assert.equal(
			getFileContentForComponent(title, folderName, customDOM),
			fileContent
		);
	});

	it('can create the file with a custom extension, if a custom extension is passed', async () => {
		await mkdir(folderPath);
		const folderExists = await exists(folderPath);
		assert(folderExists);
		await generateComponentFile({
			title,
			folderName,
			folderPath,
			customDOM,
			customJSExtension,
		});
		const fileExists = await exists(filePathWithCustomJSExtension);
		assert(fileExists);
		const fileContent = await readFile(filePathWithCustomJSExtension);
		assert.equal(
			getFileContentForComponent(title, folderName, customDOM),
			fileContent
		);
	});
});

describe('generateTestFile', () => {
	const title = 'MyTestComponent';
	const folderName = 'my-test-component';
	const folderPath = path.join(process.cwd(), folderName);
	const filePath = path.join(folderPath, `${title}.test.js`);
	const customJSExtension = 'jsx';
	const filePathWithCustomJSExtension = path.join(
		folderPath,
		`${title}.test.${customJSExtension}`
	);

	beforeEach(
		async () =>
			await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			])
	);
	afterEach(
		async () =>
			await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			])
	);

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

	it('can create the test file with a custom extension, if a custom extension is passed', async () => {
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
