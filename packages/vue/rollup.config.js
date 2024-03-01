import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx' // not really needed yet. haven't moved to jsx in vue. is there a react equivalent? does there need to be? tsconfig seems to handle this for react.
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
// import autoprefixer from 'autoprefixer'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: 'lib/index.ts',
    output: {
      name: 'catvue',
      file: 'dist/umd/index.js',
      // file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      peerDepsExternal(),
      resolve(), // so Rollup can find `ms` // JB: optional only needed for demo repo // JB: optional only needed for demo repo/ if you have 3rd party dependencies in node_modules
      commonjs(), // so Rollup can convert `ms` to an ES module // JB: option needed if source is written commonjs
      vue(),
      typescript(), // so Rollup can convert TypeScript to JavaScript
      postcss(
        // { plugins: [] }
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
        name: 'catvue',
        file: pkg.main,
        format: 'cjs',
        // sourcemap: true,
      },
      {
        name: 'catvue', // As we have an export, we need to provide the name of a global variable that will be created by our bundle so that other code can access our export via this variable.
        file: 'dist/index.min.js',
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
      // typescript({ tsconfig: './tsconfig.json' }),
      postcss(
        // { plugins: [] }
        // autoprefixer(),
      ),
      terser(),
    ],
  }
]
