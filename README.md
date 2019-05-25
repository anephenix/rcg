#RCG

A Node.js library and CLI for generating React components.

### Features

- Generates a React component based on a given name
- Creates the component and accompanying files and folders
- Takes time out of generating files and folders for React components

### Install

```
npm i @anephenix/rcg
```

### Usage

There are 2 ways that you can use RCG - as a command in your terminal, or as a library in your Node.js code.

#### CLI

After you have installed rcg, you can call it with npx

```
npx rcg MyComponent
```

This will do the following:

- Create a folder called 'my-component' in the src/components folder
- Inside that folder, it will create these files:
  - A React component file called MyComponent.js
  - A styling file called MyComponent.scss
  - A test file called MyComponent.test.js
