import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs' // haven't activated yet. awaiting stable build. although technically this is option. practicality-wise it is needed because you can safeguard you won't be consuming cjs from 3rd party dependencies
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx' // not really needed yet. haven't moved to jsx in vue. is there a react equivalent? does there need to be? tsconfig seems to handle this for react.
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' } // import asseting required or else Node complains attempting to load upon build // NOTE: if you get an error when using the 'assert' key word, use the 'with' keyword instead

export default [
  {
    input: 'lib/index.ts',
    output: {
      name: '@brincat/vue',
      file: 'umd/index.js',
      // file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      peerDepsExternal(),
      resolve(), // so Rollup can find `ms` // JB: optional only needed for demo repo // JB: optional only needed for demo repo/ if you have 3rd party dependencies in node_modules
      commonjs(), // so Rollup can convert `ms` to an ES module // JB: option needed if source is written commonjs
      vue(),
      typescript(), // so Rollup can convert TypeScript to JavaScript
      postcss(),
      terser(),
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'lib/index.ts',
    external: ['@brincat/core'], // should list npm dependencies(as oppose to dev dependencies)
    output: [
      {
        file: pkg.module,
        format: 'es'
      },
      {
        file: pkg.main,
        format: 'cjs',
        // name: 'vue-lib',
      },
      {
        name: 'foobar', // As we have an export, we need to provide the name of a global variable that will be created by our bundle so that other code can access our export via this variable.
        file: 'dist/bundle.min.js',
        format: 'iife', // As format, we choose iife. This format wraps the code so that it can be consumed via a script tag in the browser while avoiding unwanted interactions with other code.
        plugins: [terser()]
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      vue(),
      typescript(), // so Rollup can convert TypeScript to JavaScript // typescript({ tsconfig: './tsconfig.json', sourceMap: true, }),
      postcss(),
      terser(),
    ],
  }
]

/*
# compile to a <script> containing a self-executing function ('iife')
rollup main.js --file bundle.js --format iife
# compile to a CommonJS module ('cjs')
rollup main.js --file bundle.js --format cjs
# UMD format requires a bundle name
rollup main.js --file bundle.js --format umd --name "myBundle"


Rollup can import existing CommonJS modules through a plugin.
`npm install @rollup/plugin-commonjs --save-dev`

https://github.com/rollup/rollup-starter-lib
  https://github.com/rollup/rollup-starter-lib/tree/typescript => @rollup/plugin-typescript
  https://github.com/rollup/rollup-starter-lib/tree/babel
  https://github.com/rollup/rollup-starter-lib/tree/buble
https://github.com/rollup/rollup-starter-app

npm run build builds the library to dist, generating three files:

dist/how-long-till-lunch.cjs.js A CommonJS bundle, suitable for use in Node.js, that requires the external dependency. This corresponds to the "main" field in package.json
dist/how-long-till-lunch.esm.js an ES module bundle, suitable for use in other people's libraries and applications, that imports the external dependency. This corresponds to the "module" field in package.json
dist/how-long-till-lunch.umd.js a UMD build, suitable for use in any environment (including the browser, as a <script> tag), that includes the external dependency. This corresponds to the "browser" field in package.json
iffe - suitable for <script> tags to run the code in the browser avoiding conflicts with global namespace

PLUGINS
https://github.com/rollup/awesome

rollup-plugin-vue is deprecated (last activity 2019)
recommendation is for vite and vitejs/plugin-vue
https://www.npmjs.com/package/@vitejs/plugin-vue

NOTE: For JSX / TSX support, @vitejs/plugin-vue-jsx is also needed
- might also be a dependancy on @vue/babel-plugin-jsx
*/

/*
Remember, these are all subtly associated and can be use in place of one another or in conjunction but they all have distinct differences

TypeScript Compiler(TSC)
- for mapping and parsing the typescript, making sure it is error free and valid and compiling it into javascript; can convert to esm and cjs

Bundlers
Webpack
Rollup
Esbuild
- for mapping and collecting dependencies, optimisation and collecting everthing together so it can be run(primarily in the browser). can convert to esm, cjs, umd, amd and iffe
  Note: these do not transpile javascript like Babel. Esbuild is a bit of an edge case as it is built to modern expectations to handle ESM(like Vite)
- These offer complimentaryy features such as tree-shaking, and code splitting(chunks), loading and processing of and non-javascript content within the javascript, such as SVG, CSS, Sass, JSON, images, markdown, pug, jsx etc..., and will minimise and obfuscate the code, handle file and linked asset renaming to cache bust.
- You can add typescript support to these(tsconfig)
- You can add transpiler support to these(babel)

Transpiler
Babel
Buble
- acts as an intepretor for all versions and variations of javascript and bridges cross-compatibility issues such as bad syntax and missing features, by patching the code it parses and outputs
*/

/* 
USEFUL REFERENCE - lol this is stuff I was doing back in 2017!! obviously times have moved on. They're even copying my file structure convention now! Stuff that used to be ignored and taken for granted, that I agonised over to get right, architecture and inclusion of tests specs and story book. parent index.js exports too. It's like someone copied one of my old component libraries! Not that anyone used to listen to me back then. Obviously I was a pioneer lol or maybe I was just onto a good thing because I know my shit.
https://dev.to/alexeagleson/how-to-create-and-publish-a-react-component-library-2oe
https://dev.to/siddharthvenkatesh/component-library-setup-with-react-typescript-and-rollup-onj
https://blog.harveydelaney.com/creating-your-own-react-component-library/
https://medium.com/@tomaszmularczyk89/guide-to-building-a-react-components-library-with-rollup-and-styled-jsx-694ec66bd2
https://medium.com/grandata-engineering/how-i-set-up-a-react-component-library-with-rollup-be6ccb700333
*/