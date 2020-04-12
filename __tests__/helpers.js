const fs = require('fs');
const util = require('util');
const path = require('path');
const childProcess = require('child_process');
const writeFile = util.promisify(fs.writeFile);


// Promisified functions
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);
const readdir = util.promisify(fs.readdir);
const exec = util.promisify(childProcess.exec);

const cleanup = async folderPath => {
	const folderExists = await exists(folderPath);
	if (!folderExists) return;
	const files = await readdir(folderPath);
	for (const file of files) {
		await unlink(path.join(folderPath, file));
	}
	await rmdir(folderPath);
};

module.exports = {
	exists,
	writeFile,
	readFile,
	unlink,
	mkdir,
	rmdir,
	readdir,
	exec,
	cleanup
};
