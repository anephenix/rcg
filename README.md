# RCG

A Node.js library and CLI for generating React components.

[![Greenkeeper badge](https://badges.greenkeeper.io/anephenix/rcg.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/anephenix/rcg.svg?style=shield)](https://circleci.com/gh/anephenix/rcg)
[![Coverage Status](https://coveralls.io/repos/github/anephenix/rcg/badge.svg?branch=master)](https://coveralls.io/github/anephenix/rcg?branch=master)

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

### Running Tests

```
npm t
```

### License and Credits

&copy; 2019 Anephenix OÜ. RCG is licensed under the MIT License.
