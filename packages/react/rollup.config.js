import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs' // haven't activated yet. awaiting stable build. although technically this is option. practicality-wise it is needed because you can safeguard you won't be consuming cjs from 3rd party dependencies
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
// import autoprefixer from 'autoprefixer'
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
      nodeResolve(), // so Rollup can find `ms` // JB: optional only needed for demo repo/ if you have 3rd party dependencies in node_modules
      commonjs(), // so Rollup can convert `ms` to an ES module // JB: option needed if source is written commonjs
      typescript(), // so Rollup can convert TypeScript to JavaScript
      postcss(
        { plugins: [] }
        // autoprefixer(),
      ),
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
        format: 'es',
        // sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        // sourcemap: true,
        // name: 'react-lib',
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
      nodeResolve(),
      commonjs(),
      typescript(), // so Rollup can convert TypeScript to JavaScript
      // typescript({ tsconfig: './tsconfig.json' }),
      postcss(
        { plugins: [] }
        // autoprefixer(),
      ),
      terser(),
    ],
  }
]

/* 
doesn't export the default ie. the react component. might be issue with needing jsx plugin. or settings in tsconfig
*/

/*
// ROLE CALL
@rollup/plugin-commonjs // commonjs to es6
@rollup/plugin-typescript // compile ts to js
@rollup/plugin-node-resolve // resolve direct dependencies(from node_modules)
rollup-plugin-peer-deps-external // manage peer dependencies and filter out from the bundle to only if necessary and deduped. May actually be removing such peer dependencies(for instance vue/react) and not bundling them with the published library relying on the fact the consumer of the library will already have this package available in node_modules(and if they don't it will get installed with npm install); pretty nifty 
rollup-plugin-postcss // load and process css
rollup-terser // minify bundle
rollup-plugin-dts // bundle all definition files into one

FIXES.
looks like switching 'module' from esnext to 'nodenext' helped fixed the dependency locating issue when paths weren't being resolved to the modules being imported weren't being found
this also did that doohicky with changing the file extensions from typescript to javascript ahead of time

still issues though when building trying with @rollup/plugin-node-resolve and that did the trick all the errors went away and compiled successsfully. Followed through with vue package, unfortunately
that is still reporting build problems, namely Cannot find module './Foobar.vue' or its corresponding type declarations. and Error: require() of ES Module with postcss(oddly react package doesn't give me this error) - however
I later found react package was attempting to export it's component unlike the vue package

yes still giving build error in react with component exposed
RollupError: Expression expected (Note that you need plugins to import files that are not JavaScript)
lib/Foobar.tsx (3:12)

vue build giving - @rollup/plugin-typescript TS2307: Cannot find module. this seems to be complaining about the .vue extension. quick search on the internet suggests supplying a definition file will help. copied over the older vue and tsx definition files that shipped with vue cli and that seems to of fixed the issue now.

vue and react build giving - (plugin postcss) Error: require() of ES Module.
this error was fixed by installing and activating the rollup commonjs plugin. this is because although my library might be written as ES modules, other dependent 3rd party libraries might not and nodefetch only uses ESM now.
cc. https://stackoverflow.com/questions/69081410/error-err-require-esm-require-of-es-module-not-supported
the offender here was postcss, which must be written in commonjs and using require() prompting the error that couldn't be load ESM modules using require().


1 error remaining in the react build 
[!] RollupError: Expression expected (Note that you need plugins to import files that are not JavaScript)
lib/Foobar.tsx (3:12)
switching 'jsx' from 'preserve to 'react-jsx' appears to make a difference however im now getting a repeat of "[!] (plugin postcss) Error: require() of ES Modules" as it attempts to load the .css with postcss. even though commonjs plugin is enabled
makes no sense. as both vue and react configs are near identical.




went ahead and installed postcss alongside rollup postcss plugin to handle loading of css within js 
npm install postcss rollup-plugin-postcss --save-dev
i.e. import './style.css'

Note that the generated CSS will be injected to <head> by default, and the CSS string is also available as default export unless extract: true:
Inject to `<head>` and also available as `style`
import style from './style.css'

It will also automatically use local PostCSS config files.
- created an empty postcss config file to suit

// for v3
import path from 'path'
postcss({
extract: true,
// Or with custom file name
extract: path.resolve('dist/my-custom-file-name.css')
})

will output to own .css file
*/
