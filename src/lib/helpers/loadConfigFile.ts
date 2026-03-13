import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

interface ConfigFileOptions {
	directory?: string;
	jsExtension?: string;
	cssExtension?: string;
	nextjsSassSupport?: boolean;
}

const loadConfigFileIfExists = async (): Promise<ConfigFileOptions> => {
	const expectedConfigFilePath = path.join(process.cwd(), "rcg.config.js");
	try {
		await fs.access(expectedConfigFilePath);
	} catch {
		return {};
	}
	console.log(
		`Using configuration settings found at ${expectedConfigFilePath}`,
	);
	const configModule = await import(pathToFileURL(expectedConfigFilePath).href);
	return (configModule.default ?? configModule) as ConfigFileOptions;
};

export default loadConfigFileIfExists;
