import nodePolyfills from 'rollup-plugin-node-polyfills'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolveModule from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning)
  }
}

const plugins = [
  typescript(),
  json(),
]

export default [{
  input: 'src/index.ts',
  output: [{
    file: pkg.main,
    format: 'cjs',
    exports: 'named'
  }, {
    file: pkg.module,
    format: 'es',
    exports: 'named'
  }],
  onwarn,
  plugins: [
    resolveModule(),
    commonjs({
      include: ['node_modules/**']
    }),
    ...plugins
  ],
  external: ['http', 'https', 'url', 'zlib', 'assert', 'stream', 'tty', 'util', 'os']
}, {
  input: 'src/index.ts',
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'formalooAPI',
    exports: 'named',
    intro: 'const global = window;'
  },
  onwarn,
  plugins: [
    resolveModule({
      preferBuiltins: true,
      browser: true
    }),
    commonjs({
      include: ['node_modules/**'],
      browser: true,
      preferBuiltins: false,
      ignoreGlobal: false
    }),
    ...plugins,
    nodePolyfills(),
    terser()
  ]
}]