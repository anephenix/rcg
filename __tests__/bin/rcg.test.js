// This file tests the rcg binary

// NPM Dependencies
const assert = require('assert');
const os = require('os');
const path = require('path');

// File Dependencies
const {
	exists,
	readdir,
	exec,
	readFile,
	writeFile,
	unlink,
} = require('../helpers');
const { version } = require('../../package.json');

const seed = async (dirs) => {
	return await exec(`mkdir -p ${path.join(process.cwd(), ...dirs)}`);
};

const cleanup = async (dir) => {
	return await exec(`rm -rf ${path.join(process.cwd(), dir)}`);
};

describe('rcg binary', () => {
	describe('default, no config file present', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async () => await seed(['src', 'components']));
		afterEach(async () => await cleanup('src'));

		it('should create a component with a given name in the src/components directory', async () => {
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

	describe('default, config file present', () => {
		const exampleConfigFilePath = path.join(process.cwd(), 'rcg.config.js');
		const createExampleConfigFile = async () => {
			const exampleConfig = `const path = require('path');
			module.exports = { directory: path.join(process.cwd(), 'components'), jsExtension: 'js' }`;
			return await writeFile(exampleConfigFilePath, exampleConfig);
		};

		const removeExampleConfigFile = async () => {
			await unlink(exampleConfigFilePath);
		};

		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(process.cwd(), 'components', folderName);

		const command = `./bin/rcg ${title} --jsExtension=jsx`;
		let recordedStdout = null;
		let recordedStderr = null;

		beforeAll(async () => {
			await seed(['components']);
			await createExampleConfigFile();
			const { stdout, stderr } = await exec(command);
			recordedStdout = stdout;
			recordedStderr = stderr;
		});

		afterAll(async () => {
			await cleanup('components');
			await removeExampleConfigFile();
		});

		it('should note that it is loading config options from the rcg.config.js file', async () => {
			const homeDir = os.homedir();
			assert.equal(
				recordedStdout,
				`Using configuration settings found at ${exampleConfigFilePath}
Created files:\n
${homeDir}/Work/anephenix/rcg/components/my-test-component/MyTestComponent.jsx
${homeDir}/Work/anephenix/rcg/components/my-test-component/MyTestComponent.scss
${homeDir}/Work/anephenix/rcg/components/my-test-component/MyTestComponent.test.jsx
`
			);
			assert.equal(recordedStderr, '');
		});

		it('should create the component in the folder path specified in the rcg.config.js file', async () => {
			const folderExists = await exists(folderPath);
			assert(folderExists);
		});

		it('should create the files with the file extension specified in the command line arguments', async () => {
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

	describe('--version', () => {
		it('should return the version of the program', async () => {
			const command = './bin/rcg --version';
			const { stdout } = await exec(command);
			assert.equal(stdout, `${version}\n`);
		});
	});
	describe('--directory', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const directory = 'pages';
		const folderPath = path.join(process.cwd(), directory, folderName);

		beforeEach(async () => await seed([directory]));
		afterEach(async () => await cleanup(directory));

		it('should create a component at the specified directory', async () => {
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
	describe('--jsExtension', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async () => await seed(['src', 'components']));
		afterEach(async () => await cleanup('src'));

		it('should create a component with a custom file extension on the end, as well as the test file extension', async () => {
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
	describe('--cssExtension', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async () => await seed(['src', 'components']));
		afterEach(async () => await cleanup('src'));

		it('should create a component with a custom file extension on the end', async () => {
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

	describe('universal behaviour', () => {
		const title = 'MyTestComponent';
		const folderName = 'my-test-component';
		const folderPath = path.join(
			process.cwd(),
			'src',
			'components',
			folderName
		);

		beforeEach(async () => await seed(['src', 'components']));
		afterEach(async () => await cleanup('src'));

		it('should log all of the files that were created after executing the binary', async () => {
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
