const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');

// Promisified functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);
const readdir = util.promisify(fs.readdir);
const exec = util.promisify(childProcess.exec);

module.exports = {
	exists,
	readFile,
	unlink,
	mkdir,
	rmdir,
	readdir,
	exec
};
