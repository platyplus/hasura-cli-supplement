import { stringify } from 'https://deno.land/std/encoding/yaml.ts'
import {
  copy,
  walk,
  ensureDir,
  ensureFile,
} from 'https://deno.land/std/fs/mod.ts'

import { ModuleCommand } from './types.ts'
import { getModule } from './repository.ts'
import { getHasuraConfig, error } from '../utils.ts'
import hasuraCli from '../hasura-cli.ts'

const install: ModuleCommand = async ({ moduleName, options }) => {
  if (!moduleName) throw Error('You should specify a module')
  const module = await getModule(moduleName)
  console.log('installing module:', moduleName)
  const hasuraConfig = await getHasuraConfig(options.project)

  // * Create a temporary project directory
  const tempProject = await Deno.makeTempDir()

  // * Create a valid config.yaml file: only modules written in config v1 work
  await Deno.writeFile(
    `${tempProject}/config.yaml`,
    new TextEncoder().encode(stringify({ ...hasuraConfig, version: 1 }))
  )

  // * Copy the module's migrations
  try {
    await copy(`${module.path}/migrations`, `${tempProject}/migrations`)
  } catch (e) {
    return error(`The module '${moduleName}' has no 'migrations' directory!`)
  }

  // * Run the module's migrations
  // TODO stop if errors
  await hasuraCli('migrate apply', false, { ...options, project: tempProject })

  // * Set the file extensions to copy to the project migrations
  const exts = ['sql']
  if (hasuraConfig.version == 1) exts.push('yaml')

  // * Add/replace the migrations files to the project
  for await (const entry of walk(`${module.path}/migrations`, {
    includeDirs: false,
    exts,
  })) {
    const newPath = entry.path.replace(module.path, options.project)
    await ensureFile(newPath)
    await copy(entry.path, newPath, { overwrite: true })
  }

  // * Export updated metadata to the project
  await hasuraCli('metadata export', false, options)

  // * Delete temporaty project directory
  await Deno.remove(tempProject, { recursive: true })
}

export default install
