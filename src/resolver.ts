import { basename } from 'path'

import { register } from 'tsconfig-paths'
import { compilerOptions } from './path-resolution.json'

(async () => {
  register({
    baseUrl: basename(__dirname),
    paths: compilerOptions.paths,
  })
})()
