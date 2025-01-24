# RCG

A Node.js library and CLI for generating React components.

[![npm version](https://badge.fury.io/js/%40anephenix%2Frcg.svg)](https://badge.fury.io/js/%40anephenix%2Frcg)
[![CI](https://github.com/anephenix/rcg/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/rcg/actions/workflows/node.js.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/67061d6077ef7ceaa0c9/test_coverage)](https://codeclimate.com/github/anephenix/rcg/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/67061d6077ef7ceaa0c9/maintainability)](https://codeclimate.com/github/anephenix/rcg/maintainability) [![Socket Badge](https://socket.dev/api/badge/npm/package/@anephenix/rcg)](https://socket.dev/npm/package/@anephenix/rcg)

### Features

-   Generates a React component based on a given name
-   Creates the component and accompanying files and folders
-   Takes time out of generating files and folders for React components

### Install

```
npm i @anephenix/rcg
```

### Usage

There are 2 ways that you can use RCG - via CLI, or as an NPM module in your Node.js code.

#### via CLI

After you have installed rcg, cd into your React app, and run this:

```
npx rcg MyComponent
```

This will do the following:

-   Create a folder called 'my-component' in the src/components folder
-   Inside that folder, it will create these files:
    -   A React component file called MyComponent.js
    -   A styling file called MyComponent.scss
    -   A test file called MyComponent.test.js

You can also generate the component in a different folder:

```
npx rcg LoginPage --directory pages
```

This will generate a folder called 'login-page' in the pages folder, such as for a Next.js app.

To add custom DOM to insert into the React component, you can pass the `--dom` flag:

```
npx rcg NavBar --dom="<div id='logo'>Logo here</div>"
```

To add custom CSS to insert into the SASS file for the component, you can pass the `--css` flag:

```
npx rcg NavBar --css="#logo { color: #ffcc00;}"
```

To specify a custom file extension for the component and test file names (e.g. jsx, tsx), you can pass the `--jsExtension` flag:

```
npx rcg NavBar --jsExtension=jsx
```

To specify a custom file extension for the css file (e.g. .style.js), you can pass the `--cssExtension` flag:

```
npx rcg NavBar --cssExtension=style.js
```

By default, it generates a scss file. This will likely change in the future to a default pattern of css-in-js

#### via NPM

You can load it this way:

```javascript
const path = require('path');
const rcg = require('@anephenix/rcg');

const componentName = 'MyComponent';
const srcFolderPath = path.join(process.cwd(), 'src', 'components');

(async () => {
	await rcg(componentName, srcFolderPath);
})();
```

If you want the React component to include custom DOM and/or the SASS file to include custom CSS, you can also pass these parameters:

```javascript
const path = require('path');
const rcg = require('@anephenix/rcg');

const componentName = 'MyComponent';
const srcFolderPath = path.join(process.cwd(), 'src', 'components');

const customDOM = '<p>Hello</p>';
const customCSS = 'p { color: red; } ';
const customJSExtension = 'jsx';
const customCssExtension = 'style.js';

(async () => {
	await rcg(
		componentName,
		srcFolderPath,
		customDOM,
		customCSS,
		customJSExtension,
		customCssExtension
	);
})();
```

### Loading options from a config file

Rather than having to specify arguments via the CLI each time, you can load them via a rcg.config.js file, with these contents:

```javascript
const path = require('path');

const config = {
	// Put the component folder and file in the components directory
	directory: path.join(process.cwd(), 'components'),
	// Use the jsx filename extension for the component files
	jsExtension: 'jsx',
};

module.exports = config;
```

You can create an rcg.config.js file by running this command:

```
npx rcg init
```

### Running Tests

```
npm t
```

### License and Credits

&copy; 2025 Anephenix OÜ. RCG is licensed under the MIT License.
