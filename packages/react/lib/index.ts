// export { default as default } from './Foobar'
export { default as useCountdown } from '@brincat/core'

export function foo() {
  return 'Hello from react package index'
}

/* 
doesn't export the default ie. the react component. might be issue with needing jsx plugin. or settings in tsconfig
*/

/* 
(!) Plugin typescript: @rollup/plugin-typescript TS1003: Identifier expected.
lib/index.ts: (1:21)

1 import { default as default } from './Foobar'


(!) Unresolved dependencies
https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
@brincat/core (imported by "lib/index.ts")
(!) Missing global variable name
https://rollupjs.org/configuration-options/#output-globals
Use "output.globals" to specify browser global variable names corresponding to external modules:
@brincat/core (guessing "core")
*/