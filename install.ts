import { ModuleCommand } from './types.ts'
import { getModule } from './repository.ts'
import { getHasuraConfig } from './utils.ts'

const install: ModuleCommand = async ({ moduleName, options: { project } }) => {
  if (!moduleName) throw Error('You should specify a module')
  const module = await getModule(moduleName)
  console.log('installing module:', moduleName)
  const hasuraConfig = await getHasuraConfig(project)
  console.log('Hasura config version:', hasuraConfig.version)
  console.warn('unfinished script')
}

export default install
