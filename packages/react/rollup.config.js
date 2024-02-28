// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import pkg from './package.json' assert { type: 'json' } // import asseting required or else Node complains attempting to load upon build // NOTE: if you get an error when using the 'assert' key word, use the 'with' keyword instead

export default [
  /*
  {
    input: 'lib/index.ts',
    output: {
      name: '@brincat/vue',
      // file: 'umd/index.js',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      // resolve(), // so Rollup can find `ms` // JB: optional only needed for demo repo
      // commonjs(), // so Rollup can convert `ms` to an ES module // JB: option needed if source is written commonjs
      typescript(), // so Rollup can convert TypeScript to JavaScript
    ]
  },
  */

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'lib/index.ts',
    // external: ['ms'],
    // external: ['@brincat/core'],
    output: [
      {
        file: 'dist/esm/index.js',
        // file: pkg.module,
        format: 'es'
      },
      {
        file: 'dist/cjs/index.js',
        // file: pkg.main,
        format: 'cjs'
      },
      {
        name: 'foobar', // As we have an export, we need to provide the name of a global variable that will be created by our bundle so that other code can access our export via this variable.
        file: 'dist/bundle.min.js',
        format: 'iife', // As format, we choose iife. This format wraps the code so that it can be consumed via a script tag in the browser while avoiding unwanted interactions with other code.
        plugins: [terser()]
      }
    ],
    plugins: [
      typescript(), // so Rollup can convert TypeScript to JavaScript
    ],
  }
]
