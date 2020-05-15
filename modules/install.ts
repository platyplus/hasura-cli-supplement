import { copy, walk, ensureFile } from 'https://deno.land/std/fs/mod.ts'

import { getHasuraConfig, error } from '../utils.ts'
import hasuraCli from '../hasura-cli.ts'
import { ModuleCommand } from './types.ts'
import { getModule } from './repository.ts'
import { createTempProject, applyMigrations } from './utils.ts'

const install: ModuleCommand = async ({ moduleName, options }) => {
  if (!moduleName) return error('You should specify a module')
  const module = await getModule(moduleName)
  if (module.install?.pre) console.log(module.install.pre)
  console.log(`Installing module: ${moduleName}...`)
  const hasuraConfig = await getHasuraConfig(options.project)
  const tempProject = await createTempProject(hasuraConfig)

  // * Copy the module's migrations
  try {
    await copy(`${module.path}/migrations`, `${tempProject}/migrations`)
  } catch (e) {
    return error(`The module '${moduleName}' has no 'migrations' directory!`)
  }

  // * Run the module's migrations
  await applyMigrations(tempProject, options)

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
  try {
    await hasuraCli('metadata export', 'error', options)
  } catch {
    await Deno.remove(tempProject, { recursive: true })
    return error('Impossible to export metadata.')
  }

  // * Delete temporaty project directory
  await Deno.remove(tempProject, { recursive: true })
  console.log(`Module ${moduleName} installed.`)
  if (module.install?.post) console.log(module.install.post)
}

export default install
