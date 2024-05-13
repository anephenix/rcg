const globals = require('globals');
const pluginJs = require('@eslint/js');
const mochaPlugin = require('eslint-plugin-mocha');

module.exports = [
	{files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
	{languageOptions: { globals: globals.node}},
	pluginJs.configs.recommended,
	mochaPlugin.configs.flat.recommended,
	{
		rules: {
			'mocha/no-setup-in-describe': 'off',
		}
	}
];