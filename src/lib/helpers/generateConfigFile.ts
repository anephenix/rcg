import { promises as fs } from "fs";
import path from "path";

const exampleConfigFilePath = path.join(process.cwd(), "rcg.config.js");

const createExampleConfigFile = async (): Promise<void> => {
	const exampleConfig = `import { join } from 'path';
export default {
	directory: join(process.cwd(), 'components'),
	jsExtension: 'js',
};
`;
	console.log("Creating example config file at", exampleConfigFilePath);
	await fs.writeFile(exampleConfigFilePath, exampleConfig);
};

export { exampleConfigFilePath, createExampleConfigFile };
