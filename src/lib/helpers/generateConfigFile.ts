import { promises as fs } from "node:fs";
import path from "node:path";
import { confirm } from "@inquirer/prompts";
import promptForConfig, { type ConfigAnswers } from "./promptForConfig.js";

const exampleConfigFilePath = path.join(process.cwd(), "rcg.config.js");

const defaultAnswers: ConfigAnswers = {
	directory: "components",
	jsExtension: "js",
	cssExtension: "scss",
	nextjsSassSupport: false,
};

const buildConfigFileContent = (answers: ConfigAnswers): string => {
	return `import { join } from 'path';

export default {
	directory: join(process.cwd(), '${answers.directory}'),
	jsExtension: '${answers.jsExtension}',
	cssExtension: '${answers.cssExtension}',
	nextjsSassSupport: ${answers.nextjsSassSupport},
};
`;
};

const configFileExists = async (): Promise<boolean> => {
	try {
		await fs.access(exampleConfigFilePath);
		return true;
	} catch {
		return false;
	}
};

interface RunInitOptions {
	yes?: boolean;
}

const runInit = async ({ yes }: RunInitOptions = {}): Promise<void> => {
	const interactive = !yes && Boolean(process.stdin.isTTY);
	const exists = await configFileExists();

	try {
		if (exists) {
			if (interactive) {
				const shouldOverwrite = await confirm({
					message: `${exampleConfigFilePath} already exists. Overwrite it?`,
					default: false,
				});
				if (!shouldOverwrite) {
					console.log("Skipped creating rcg.config.js");
					return;
				}
			} else {
				console.log(
					`Overwriting existing config file at ${exampleConfigFilePath}`,
				);
			}
		}

		const answers = interactive ? await promptForConfig() : defaultAnswers;
		console.log("Creating config file at", exampleConfigFilePath);
		await fs.writeFile(exampleConfigFilePath, buildConfigFileContent(answers));
	} catch (error) {
		if (error instanceof Error && error.name === "ExitPromptError") {
			console.log("\nCancelled.");
			process.exitCode = 1;
			return;
		}
		throw error;
	}
};

export {
	buildConfigFileContent,
	defaultAnswers,
	exampleConfigFilePath,
	runInit,
};
