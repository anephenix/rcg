// This file tests the rcg binary

// NPM Dependencies
const assert = require('assert');
const path = require('path');

// File Dependencies
const { exists, readdir, exec } = require('../helpers');
const { version } = require('../../package.json');

const seed = async dirs => {
	return await exec(`mkdir -p ${path.join(process.cwd(), ...dirs)}`);
};

const cleanup = async dir => {
	return await exec(`rm -rf ${path.join(process.cwd(), dir)}`);
};

describe('rcg binary', () => {
	describe('default', () => {
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
			const { stdout, stderr } = await exec(command);
			assert.equal(stdout, '');
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`
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
			const { stdout, stderr } = await exec(command);
			assert.equal(stdout, '');
			assert.equal(stderr, '');
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});
});
