import { copy, expandGlob } from 'https://deno.land/std/fs/mod.ts'
import { getHasuraConfig, error } from '../utils.ts'
import { ModuleCommand } from './types.ts'

import hasuraCli from '../hasura-cli.ts'
import { getModule } from './repository.ts'
import { createTempProject, applyMigrations } from './utils.ts'

const uninstall: ModuleCommand = async ({ moduleName, options }) => {
  if (!moduleName) return error('You should specify a module')
  const module = await getModule(moduleName)
  if (module.uninstall?.pre) console.log(module.uninstall.pre)
  console.log(`Uninstalling module: ${moduleName}...`)
  const hasuraConfig = await getHasuraConfig(options.project)
  const tempProject = await createTempProject(hasuraConfig)

  // * Copy the module's migrations
  try {
    await copy(`${module.path}/migrations`, `${tempProject}/migrations`)
  } catch (e) {
    return error(`The module '${moduleName}' has no 'migrations' directory!`)
  }

  // * Run the module's down migrations
  await applyMigrations(tempProject, { ...options, down: 'all' })

  // * Remove the migrations files from the project
  for await (const { name } of expandGlob(`${module.path}/migrations/*`)) {
    const migrationsOK: string[] = []
    const migrationsKO: string[] = []
    try {
      await Deno.remove(`${options.project}/migrations/${name}`, {
        recursive: true,
      })
      migrationsOK.push(name)
    } catch {
      migrationsKO.push(name)
    }
    if (migrationsOK.length) {
      console.log(`Migrations removed from ${module.path}/migrations:`)
      migrationsOK.forEach((path) => console.log(path))
    }
    if (migrationsKO.length) {
      console.warn(
        `Some migrations have not been found in ${module.path}/migrations:`
      )
      migrationsKO.forEach((path) => console.warn(path))
    }
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
  console.log(`Module ${moduleName} uninstalled.`)
  if (module.uninstall?.post) console.log(module.uninstall.post)
}

export default uninstall
