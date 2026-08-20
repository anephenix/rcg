import assert from "assert";
import { afterEach, beforeEach, describe, it, vi } from "vitest";
import { exists, readFile, unlink } from "../../helpers";

vi.mock("@inquirer/prompts", () => ({
	confirm: vi.fn(),
	input: vi.fn(),
	select: vi.fn(),
}));

const { confirm, input, select } = await import("@inquirer/prompts");
const {
	buildConfigFileContent,
	defaultAnswers,
	exampleConfigFilePath,
	runInit,
} = await import("../../../dist/lib/helpers/generateConfigFile.js");

const setTTY = (isTTY: boolean): void => {
	Object.defineProperty(process.stdin, "isTTY", {
		value: isTTY,
		configurable: true,
	});
};

describe("buildConfigFileContent", () => {
	it("should build the config file content from the given answers", () => {
		const content = buildConfigFileContent({
			directory: "pages",
			jsExtension: "tsx",
			cssExtension: "module.scss",
			nextjsSassSupport: true,
		});
		assert(content.includes("directory: join(process.cwd(), 'pages')"));
		assert(content.includes("jsExtension: 'tsx'"));
		assert(content.includes("cssExtension: 'module.scss'"));
		assert(content.includes("nextjsSassSupport: true"));
	});
});

describe("runInit", () => {
	const originalIsTTY = process.stdin.isTTY;

	beforeEach(() => {
		vi.mocked(confirm).mockReset();
		vi.mocked(input).mockReset();
		vi.mocked(select).mockReset();
	});

	afterEach(async () => {
		setTTY(originalIsTTY);
		if (await exists(exampleConfigFilePath))
			await unlink(exampleConfigFilePath);
	});

	it("should write the default config and skip prompts when yes is true", async () => {
		setTTY(true);
		await runInit({ yes: true });
		assert(await exists(exampleConfigFilePath));
		const content = await readFile(exampleConfigFilePath);
		assert.equal(content, buildConfigFileContent(defaultAnswers));
		assert(!vi.mocked(confirm).mock.calls.length);
		assert(!vi.mocked(input).mock.calls.length);
		assert(!vi.mocked(select).mock.calls.length);
	});

	it("should write the default config and skip prompts when not running in a TTY", async () => {
		setTTY(false);
		await runInit({});
		assert(await exists(exampleConfigFilePath));
		const content = await readFile(exampleConfigFilePath);
		assert.equal(content, buildConfigFileContent(defaultAnswers));
		assert(!vi.mocked(input).mock.calls.length);
	});

	it("should prompt for answers and write them when running interactively", async () => {
		setTTY(true);
		vi.mocked(input)
			.mockResolvedValueOnce("pages")
			.mockResolvedValueOnce("css");
		vi.mocked(select).mockResolvedValueOnce("tsx");
		vi.mocked(confirm).mockResolvedValueOnce(false);

		await runInit({});

		const content = await readFile(exampleConfigFilePath);
		assert.equal(
			content,
			buildConfigFileContent({
				directory: "pages",
				jsExtension: "tsx",
				cssExtension: "css",
				nextjsSassSupport: false,
			}),
		);
	});

	it("should ask to overwrite an existing config file, and skip writing when declined", async () => {
		setTTY(true);
		await runInit({ yes: true });
		const originalContent = await readFile(exampleConfigFilePath);

		vi.mocked(confirm).mockResolvedValueOnce(false);
		await runInit({});

		const content = await readFile(exampleConfigFilePath);
		assert.equal(content, originalContent);
		assert(!vi.mocked(input).mock.calls.length);
	});

	it("should overwrite an existing config file when accepted", async () => {
		setTTY(true);
		await runInit({ yes: true });

		vi.mocked(confirm)
			.mockResolvedValueOnce(true) // overwrite confirmation
			.mockResolvedValueOnce(true); // nextjsSassSupport
		vi.mocked(input).mockResolvedValueOnce("pages");
		vi.mocked(select).mockResolvedValueOnce("jsx");

		await runInit({});

		const content = await readFile(exampleConfigFilePath);
		assert.equal(
			content,
			buildConfigFileContent({
				directory: "pages",
				jsExtension: "jsx",
				cssExtension: "scss",
				nextjsSassSupport: true,
			}),
		);
	});
});
