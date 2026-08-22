import { runInit } from "../dist/lib/helpers/generateConfigFile.js";

(async () => {
	await runInit({ yes: true });
})();
