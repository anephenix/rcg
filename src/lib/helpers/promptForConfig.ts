import { confirm, input, select } from "@inquirer/prompts";

interface ConfigAnswers {
	directory: string;
	jsExtension: string;
	cssExtension: string;
	nextjsSassSupport: boolean;
}

const promptForConfig = async (): Promise<ConfigAnswers> => {
	const directory = await input({
		message: "Which folder should generated components go in?",
		default: "components",
	});
	const jsExtension = await select({
		message: "Which file extension should components use?",
		choices: [
			{ name: "js", value: "js" },
			{ name: "jsx", value: "jsx" },
			{ name: "ts", value: "ts" },
			{ name: "tsx", value: "tsx" },
		],
		default: "js",
	});
	const nextjsSassSupport = await confirm({
		message: "Enable Next.js built-in SASS module support?",
		default: false,
	});
	const cssExtension = nextjsSassSupport
		? "scss"
		: await input({
				message: "Which extension should style files use?",
				default: "scss",
			});
	return { directory, jsExtension, cssExtension, nextjsSassSupport };
};

export default promptForConfig;
export type { ConfigAnswers };
