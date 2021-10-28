// NPM Dependencies
const util = require('util');
const path = require('path');
const fs = require('fs');

// Promisified functions
const writeFile = util.promisify(fs.writeFile);

/*
	Creates a file with a given folderpath, filename, and the file's path
*/
const createFile = async (folderPath, fileName, fileContent) => {
	const filePath = path.join(folderPath, fileName);
	await writeFile(filePath, fileContent);
	return filePath;
};

module.exports = createFile;
