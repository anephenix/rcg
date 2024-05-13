// This file tests the rcg binary

// NPM Dependencies
const assert = require('assert');
const path = require('path');

// File Dependencies
const { exists, readdir, exec, readFile, unlink } = require('../helpers.js');
const { version } = require('../../package.json');
const {
	exampleConfigFilePath,
	createExampleConfigFile,
} = require('../../lib/helpers/generateConfigFile');

const seed = async (dirs) => {
	const dir = path.join(process.cwd(), ...dirs);
	return await exec(`mkdir -p ${dir}`);
};

const cleanup = async (dir) => {
	const fullPath = path.join(process.cwd(), dir);
	return await exec(`rm -rf ${fullPath}`);
};

const removeExampleConfigFile = async () => {
	await unlink(exampleConfigFilePath);
};

describe('rcg binary', function() {
	describe('init', function() {
		it('should create an example config file in the current working directory', async function() {
			const command = './bin/rcg init';
			const { stderr } = await exec(command);
			assert.equal(stderr, '');
			const fileExists = await exists(exampleConfigFilePath);
			assert(fileExists);
			await removeExampleConfigFile();
		});
	});

	describe('default, no config file present', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async function() { return await seed(['src', 'components']); });

		afterEach(async function() { return await cleanup('src'); });

		it('should create a component with a given name in the src/components directory', async function() {
			const command = `./bin/rcg ${title}`;
			const { stderr } = await exec(command);
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe('default, config file present', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(process.cwd(), 'components', folderName);

		const command = `./bin/rcg ${title} --jsExtension=jsx`;
		let recordedStdout = null;
		let recordedStderr = null;

		before(async function() {
			await seed(['components']);
			await createExampleConfigFile();
			const { stdout, stderr } = await exec(command);
			recordedStdout = stdout;
			recordedStderr = stderr;
		});

		after(async function() {
			await cleanup('components');
			await removeExampleConfigFile();
		});

		it('should note that it is loading config options from the rcg.config.js file', async function() {
			const homeDir = process.cwd();
			assert.strictEqual(
				recordedStdout,
				`Using configuration settings found at ${exampleConfigFilePath}
Created files:\n
${homeDir}/components/my-test-component/MyTestComponent.jsx
${homeDir}/components/my-test-component/MyTestComponent.scss
${homeDir}/components/my-test-component/MyTestComponent.test.jsx
`
			);
			assert.equal(recordedStderr, '');
		});

		it('should create the component in the folder path specified in the rcg.config.js file', async function() {
			const folderExists = await exists(folderPath);
			assert(folderExists);
		});

		it('should create the files with the file extension specified in the command line arguments', async function() {
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.jsx`,
				`${title}.test.jsx`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe('--version', function() {
		it('should return the version of the program', async function() {
			const command = './bin/rcg --version';
			const { stdout } = await exec(command);
			assert.equal(stdout, `${version}\n`);
		});
	});

	describe('--directory', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const directory = 'pages';
		const folderPath = path.join(process.cwd(), directory, folderName);

		beforeEach(async function() { return await seed([directory]); });

		afterEach(async function() { return await cleanup(directory); });

		it('should create a component at the specified directory', async function() {
			const command = `./bin/rcg ${title} --directory ${directory}`;
			const { stderr } = await exec(command);
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe('--jsExtension', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async function() { return await seed(['src', 'components']); });

		afterEach(async function() { return await cleanup('src'); });

		it('should create a component with a custom file extension on the end, as well as the test file extension', async function() {
			const command = `./bin/rcg ${title} --jsExtension jsx`;
			const { stderr } = await exec(command);
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [`${title}.jsx`, `${title}.test.jsx`];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe('--cssExtension', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async function() { return await seed(['src', 'components']); });

		afterEach(async function() { return await cleanup('src'); });

		it('should create a component with a custom file extension on the end', async function() {
			const command = `./bin/rcg ${title} --cssExtension style.js`;
			const { stderr } = await exec(command);
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [`${title}.style.js`];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
			const componentFile = path.join(folderPath, `${title}.js`);
			const componentFileContent = await readFile(componentFile, 'utf8');
			assert(
				componentFileContent.match(`import './${title}.style.js';`) !==
					null
			);
		});
	});

	describe('universal behaviour', function() {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async function() { return await seed(['src', 'components']); });

		afterEach(async function() { return await cleanup('src'); });

		it('should log all of the files that were created after executing the binary', async function() {
			const command = `./bin/rcg ${title}`;
			const { stdout, stderr } = await exec(command);

			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.scss`,
				`${title}.test.js`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
			assert.equal(
				stdout,
				`Created files:

${path.join(folderPath, expectedFiles[0])}
${path.join(folderPath, expectedFiles[1])}
${path.join(folderPath, expectedFiles[2])}
`
			);
		});
	});
});
