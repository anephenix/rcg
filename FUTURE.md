# Future ideas

### CLI

After you have installed rcg, you can call its command-line with npx

```
npx rcg --init
```

This command will do the following:

-   Ask you which folder you want generated React components to be put in
-   Ask you what style you want React components to use (class, pure function)
-   Ask you what style library you want to use (sass, styled-components, css-in-js)
-   Ask you what testing library you want to use (jest, mocha, ava, enzyme, react-testing-library)

It will then put these options in a config file somewhere, which rcg will look for and read
every time it wants to create a react component, though the config can be overriden with cli options.

So, task breakdown...

-   Get the codebase generating code somehow
