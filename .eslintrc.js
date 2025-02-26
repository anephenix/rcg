module.exports = {
	env: {
		commonjs: true,
		es6: true,
		mocha: true,
		node: true,
	},
	extends: 'eslint:recommended',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	plugins: ['jest'],
	ignores: [
		'coverage',
		'node_modules'
	]
};
