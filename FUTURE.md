# Future ideas

### CLI

`npx rcg init` now asks which folder to put components in, which JS file extension to use, and
whether to enable Next.js SASS module support, then writes the answers to rcg.config.js.

Extending that wizard further would need these to be built first:

-   Ask you what style you want React components to use (class, pure function) - not supported yet, generator only produces function components
-   Ask you what style library you want to use (sass, styled-components, css-in-js) - not supported yet, generator only produces a SASS-style template
-   Ask you what testing library you want to use (jest, mocha, ava, enzyme, react-testing-library) - not supported yet, generator only produces one generic jest/vitest-style test template

### Support for FELA styles

Volvo Cars uses Fela in combination with their UI library vcc-ui. It would be good to be able to
generate components that use FELA for the CSS, rather than SCSS.
