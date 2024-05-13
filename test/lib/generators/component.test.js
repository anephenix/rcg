// Dependencies
const assert = require('assert');
const path = require('path');
const {
	expectedComponentContent,
	expectedComponentContentWithDom,
} = require('../../data');
const {
	getFileContentForComponent,
	generateComponentFile,
} = require('../../../lib/generators/component');
const { exists, readFile, mkdir, checkAndRemove } = require('../../helpers');

describe('getFileContentForComponent', function() {
	it('should return the file content for a React component', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		assert.equal(
			getFileContentForComponent(title, folderName, null, 'scss', false),
			expectedComponentContent
		);
	});

	it('should allow for custom html to be passed into the component', function() {
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

	it('should enable the user to generate a component for NextJs built-in sass support', function() {
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

	it('should enable the user to generate a component for NextJs built-in sass support and custom DOM', function() {
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

describe('generateComponentFile', function() {
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
		async function() { return await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			]); }
	);

	afterEach(
		async function() { return await checkAndRemove(folderPath, [
				filePath,
				filePathWithCustomJSExtension,
			]); }
	);

	it('should create the file for the React Component, based on the name', async function() {
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

	it('should also create a file with custom DOM, if custom DOM is passed', async function() {
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

	it('can create the file with a custom extension, if a custom extension is passed', async function() {
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
