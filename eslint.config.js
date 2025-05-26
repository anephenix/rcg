import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
	{
		ignores: ['dist/**'], // ✅ Ignore dist folder
	},

	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.mocha,
			},
			parser: babelParser,
			ecmaVersion: 2017,
			sourceType: 'module',
			parserOptions: {
				requireConfigFile: false,
			},
		},

		rules: {
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			semi: ['error', 'always'],
		},
	},
];