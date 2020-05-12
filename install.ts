import { stringify } from 'https://deno.land/std/encoding/yaml.ts'
import { copy } from 'https://deno.land/std/fs/mod.ts'
import { ModuleCommand } from './types.ts'
import { getModule } from './repository.ts'
import { getHasuraConfig, error } from './utils.ts'

const install: ModuleCommand = async ({ moduleName, options: { project } }) => {
  if (!moduleName) throw Error('You should specify a module')
  const module = await getModule(moduleName)
  console.log('installing module:', moduleName)
  const hasuraConfig = await getHasuraConfig(project)

  // * Create a temporary project directory
  const tempProject = await Deno.makeTempDir()
  // * Create a valid config.yaml file
  await Deno.writeFile(
    `${tempProject}/config.yaml`,
    new TextEncoder().encode(stringify({ ...hasuraConfig, version: 1 }))
  )
  try {
    await copy(`${module.path}/migrations`, `${tempProject}/migrations`)
  } catch (e) {
    return error(`The module ${moduleName} has no 'migrations' directory!`)
  }
  if (hasuraConfig.version == 1) {
    console.log('Version 1')
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
