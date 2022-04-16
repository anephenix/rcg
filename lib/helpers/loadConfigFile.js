// Node.js core modules
const fs = require('fs');
const util = require('util');
const path = require('path');

// Helper functions
const exists = util.promisify(fs.exists);

const loadConfigFileIfExists = async () => {
	const expectedConfigFilePath = path.join(process.cwd(), 'rcg.config.js');
	const configFileExists = await exists(expectedConfigFilePath);
	if (!configFileExists) return {};
	console.log(
		`Using configuration settings found at ${expectedConfigFilePath}`
	);
	const configFile = require(expectedConfigFilePath);
	return configFile;
};

module.exports = loadConfigFileIfExists;
