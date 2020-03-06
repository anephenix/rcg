# RCG

A Node.js library and CLI for generating React components.

[![npm version](https://badge.fury.io/js/%40anephenix%2Frcg.svg)](https://badge.fury.io/js/%40anephenix%2Frcg)

[![CircleCI](https://circleci.com/gh/anephenix/rcg.svg?style=shield)](https://circleci.com/gh/anephenix/rcg)
[![Coverage Status](https://coveralls.io/repos/github/anephenix/rcg/badge.svg?branch=master)](https://coveralls.io/github/anephenix/rcg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/67061d6077ef7ceaa0c9/maintainability)](https://codeclimate.com/github/anephenix/rcg/maintainability)

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

(async () => {
    await rcg(
        componentName,
        srcFolderPath,
        customDOM,
        customCSS,
        customJSExtension
    );
})();
```

### Running Tests

```
npm t
```

### License and Credits

&copy; 2020 Anephenix OÜ. RCG is licensed under the MIT License.
