import globals from 'globals';
import babelParser from '@babel/eslint-parser';

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