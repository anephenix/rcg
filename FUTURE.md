# Future ideas

### CLI

After you have installed rcg, you can call its command-line with npx

```
npx rcg init
```

This command will do the following:

-   Ask you which folder you want generated React components to be put in
-   Ask you what style you want React components to use (class, pure function)
-   Ask you what style library you want to use (sass, styled-components, css-in-js)
-   Ask you what testing library you want to use (jest, mocha, ava, enzyme, react-testing-library)

It will then put these options in the rcg.config.js file.

So, task breakdown...

-   Get the codebase generating code somehow

### Support for FELA styles

Volvo Cars uses Fela in combination with their UI library vcc-ui. It would be good to be able to
generate components that use FELA for the CSS, rather than SCSS.

### Support for TypeScript

Be able to generate the JS files as TypeScript files instead

### Support for Prop Types

Be able to generate components that have prop types specified for them

e.g. --props title:string description:string available:boolean
