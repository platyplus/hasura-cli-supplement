import { stringify } from 'https://deno.land/std/encoding/yaml.ts'
import { copy } from 'https://deno.land/std/fs/mod.ts'

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
  // * Create a valid config.yaml file
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
  // TODO mute, no not the errors - and stop if errors
  await hasuraCli('migrate apply', false, { ...options, project: tempProject })
  if (hasuraConfig.version == 1) {
    console.log('Version 1') // TODO remove
    // * copy the module's migration into the migrations of the project
    // TODO use fs.walk (and then filter files depending on config v1 / config v2)
    await copy(`${module.path}/migrations`, `${options.project}/migrations`, {
      overwrite: true,
    })
  } else {
    console.warn(
      'The installation of a module in a config v2 projet is not available yet'
    )
  }

  console.log(tempProject)
  // await Deno.remove(tempDir, { recursive: true });

  console.warn('unfinished script')
}

export default install
