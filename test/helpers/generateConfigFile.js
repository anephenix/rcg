// Dependencies
const path = require('path');
const { writeFile } = require('../helpers');

const exampleConfigFilePath = path.join(process.cwd(), 'rcg.config.js');
const createExampleConfigFile = async () => {
	const exampleConfig = `const path = require('path');
	module.exports = { directory: path.join(process.cwd(), 'components'), jsExtension: 'js' }`;
	return await writeFile(exampleConfigFilePath, exampleConfig);
};

module.exports = {
	exampleConfigFilePath,
	createExampleConfigFile,
};
