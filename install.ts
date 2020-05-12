import { ModuleCommand } from './types.ts'
import { error } from './utils.ts'

const install: ModuleCommand = async ({ module, options: { project } }) => {
  if (!module) error('You should specify a module') // TODO move to functions
  console.log('install module', module)
  console.log(project)
}

export default install
