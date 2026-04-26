import { spawnSync } from "node:child_process";
import assert from "assert";
import path from "path";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	it,
} from "vitest";
import {
	createExampleConfigFile,
	exampleConfigFilePath,
} from "../../dist/lib/helpers/generateConfigFile.js";
import { version } from "../../package.json";
import { exec, exists, readdir, readFile, unlink } from "../helpers";

const seed = (dirs: string[]): void => {
	const dir = path.join(process.cwd(), ...dirs);
	spawnSync("mkdir", ["-p", dir]);
};

const cleanup = (dir: string): void => {
	const fullPath = path.join(process.cwd(), dir);
	spawnSync("rm", ["-rf", fullPath]);
};

const removeExampleConfigFile = async (): Promise<void> => {
	await unlink(exampleConfigFilePath);
};

describe("rcg binary", () => {
	describe("init", () => {
		it("should create an example config file in the current working directory", async () => {
			const command = "./bin/rcg init";
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const fileExists = await exists(exampleConfigFilePath);
			assert(fileExists);
			await removeExampleConfigFile();
		});
	});

	describe("default, no config file present", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(
			process.cwd(),
			"src",
			"components",
			folderName,
		);

		beforeEach(async () => {
			seed(["src", "components"]);
		});

		afterEach(async () => {
			cleanup(path.join("src", "components"));
		});

		it("should create a component with a given name in the src/components directory", async () => {
			const command = `./bin/rcg ${title}`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe("default, config file present", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(process.cwd(), "components", folderName);

		const command = `./bin/rcg ${title} --jsExtension=jsx`;
		let recordedStdout: string | null = null;
		let recordedStderr: string | null = null;

		beforeAll(async () => {
			seed(["components"]);
			await createExampleConfigFile();
			const { stdout, stderr } = await exec(command);
			recordedStdout = stdout;
			recordedStderr = stderr;
		});

		afterAll(async () => {
			cleanup("components");
			await removeExampleConfigFile();
		});

		it("should note that it is loading config options from the rcg.config.js file", async () => {
			const homeDir = process.cwd();
			assert.strictEqual(
				recordedStdout,
				`Using configuration settings found at ${exampleConfigFilePath}
Created files:\n
${homeDir}/components/my-test-component/MyTestComponent.jsx
${homeDir}/components/my-test-component/MyTestComponent.scss
${homeDir}/components/my-test-component/MyTestComponent.test.jsx
`,
			);
			assert.equal(recordedStderr, "");
		});

		it("should create the component in the folder path specified in the rcg.config.js file", async () => {
			const folderExists = await exists(folderPath);
			assert(folderExists);
		});

		it("should create the files with the file extension specified in the command line arguments", async () => {
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.jsx`,
				`${title}.test.jsx`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe("--version", () => {
		it("should return the version of the program", async () => {
			const command = "./bin/rcg --version";
			const { stdout } = await exec(command);
			assert.equal(stdout, `${version}\n`);
		});
	});

	describe("--directory", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const directory = "pages";
		const folderPath = path.join(process.cwd(), directory, folderName);

		beforeEach(async () => {
			seed([directory]);
		});

		afterEach(async () => {
			cleanup(directory);
		});

		it("should create a component at the specified directory", async () => {
			const command = `./bin/rcg ${title} --directory ${directory}`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.test.js`,
				`${title}.scss`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe("--jsExtension", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(
			process.cwd(),
			"src",
			"components",
			folderName,
		);

		beforeEach(async () => {
			seed(["src", "components"]);
		});

		afterEach(async () => {
			cleanup(path.join("src", "components"));
		});

		it("should create a component with a custom file extension on the end, as well as the test file extension", async () => {
			const command = `./bin/rcg ${title} --jsExtension jsx`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [`${title}.jsx`, `${title}.test.jsx`];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
		});
	});

	describe("--cssExtension", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(
			process.cwd(),
			"src",
			"components",
			folderName,
		);

		beforeEach(async () => {
			seed(["src", "components"]);
		});

		afterEach(async () => {
			cleanup(path.join("src", "components"));
		});

		it("should create a component with a custom file extension on the end", async () => {
			const command = `./bin/rcg ${title} --cssExtension style.js`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [`${title}.style.js`];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
			const componentFile = path.join(folderPath, `${title}.js`);
			const componentFileContent = await readFile(componentFile, "utf8");
			assert(
				componentFileContent.match(`import './${title}.style.js';`) !== null,
			);
		});
	});

	describe("--props", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(
			process.cwd(),
			"src",
			"components",
			folderName,
		);

		beforeEach(async () => {
			seed(["src", "components"]);
		});

		afterEach(async () => {
			cleanup(path.join("src", "components"));
		});

		it("should create a JS component with destructured props when props are specified", async () => {
			const command = `./bin/rcg ${title} --props title:string description:string available:boolean`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const componentFile = path.join(folderPath, `${title}.js`);
			const componentFileContent = await readFile(componentFile, "utf8");
			assert(
				componentFileContent.includes(
					"const MyTestComponent = ({ title, description, available }) =>",
				),
			);
		});

		it("should create a TSX component with a TypeScript interface when props are specified with tsx extension", async () => {
			const command = `./bin/rcg ${title} --jsExtension tsx --props title:string description:string available:boolean`;
			const { stderr } = await exec(command);
			assert.equal(stderr, "");
			const componentFile = path.join(folderPath, `${title}.tsx`);
			const componentFileContent = await readFile(componentFile, "utf8");
			assert(componentFileContent.includes("interface MyTestComponentProps {"));
			assert(componentFileContent.includes("\ttitle: string;"));
			assert(componentFileContent.includes("\tdescription: string;"));
			assert(componentFileContent.includes("\tavailable: boolean;"));
			assert(
				componentFileContent.includes(
					"const MyTestComponent = ({ title, description, available }: MyTestComponentProps) =>",
				),
			);
		});
	});

	describe("universal behaviour", () => {
		const title = "MyTestComponent";
		const folderName = "my-test-component";
		const folderPath = path.join(
			process.cwd(),
			"src",
			"components",
			folderName,
		);

		beforeEach(async () => {
			seed(["src", "components"]);
		});

		afterEach(async () => {
			cleanup(path.join("src", "components"));
		});

		it("should log all of the files that were created after executing the binary", async () => {
			const command = `./bin/rcg ${title}`;
			const { stdout, stderr } = await exec(command);

			assert.equal(stderr, "");
			const folderExists = await exists(folderPath);
			assert(folderExists);
			const files = await readdir(folderPath);
			const expectedFiles = [
				`${title}.js`,
				`${title}.scss`,
				`${title}.test.js`,
			];
			for (const file of expectedFiles) {
				assert(files.indexOf(file) !== -1);
			}
			assert.equal(
				stdout,
				`Created files:

${path.join(folderPath, expectedFiles[0])}
${path.join(folderPath, expectedFiles[1])}
${path.join(folderPath, expectedFiles[2])}
`,
			);
		});
	});
});
