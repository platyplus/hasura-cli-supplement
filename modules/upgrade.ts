import * as log from 'https://deno.land/std/log/mod.ts'

import { error } from '../utils.ts'
import { ModuleCommand } from './types.ts'

const upgrade: ModuleCommand = async ({ moduleName }) => {
  if (!moduleName) return error('You should specify a module')
  console.log(`Upgrading module: ${moduleName}...`)
  log.warning(
    "Unfinished script. Run the 'install' command to upgrade to the last available version."
  )
}

export default upgrade
