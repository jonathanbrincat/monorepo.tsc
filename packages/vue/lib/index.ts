export {default as default} from './Foobar.vue'
export {default as useCountdown} from '@brincat/core'

export function foo() {
  return 'Hello from vue package index'
}

/**
lib/index.ts → dist/esm/index.js, dist/cjs/index.js, dist/bundle.min.js...
(!) Error when using sourcemap for reporting an error: Can't resolve original location of error.
lib/Foobar.vue?vue&type=style&index=0&scoped=5a15da39&lang.css (2:0)
(!) Unresolved dependencies
https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
@brincat/core (imported by "lib/index.ts")
vue (imported by "lib/Foobar.vue")
(!) Plugin typescript: @rollup/plugin-typescript TS2307: Cannot find module './Foobar.vue' or its corresponding type declarations.
lib/index.ts: (1:34)

1 export {default as default} from './Foobar.vue'


[!] RollupError: Expression expected (Note that you need plugins to import files that are not JavaScript)
lib/Foobar.vue?vue&type=style&index=0&scoped=5a15da39&lang.css (2:0)
 */