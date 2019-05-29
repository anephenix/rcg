// This file tests the rcg binary

// NPM Dependencies
const assert = require('assert');
const childProcess = require('child_process');
const util = require('util');
const exec = util.promisify(childProcess.exec);
const { version } = require('../../package.json');

describe('rcg binary', () => {
	describe('default', () => {
		it.todo(
			'should create a component with a given name in the src/components directory'
		);
	});
	describe('--version', () => {
		it('should return the version of the program', async () => {
			const command = './bin/rcg --version';
			const { stdout } = await exec(command);
			assert.equal(stdout, `${version}\n`);
		});
	});
	describe('--directory', () => {
		it.todo('should create a component at the specified directory');
	});
});
