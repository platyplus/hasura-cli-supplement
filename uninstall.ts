import { ModuleCommand } from './types.ts'
import { error } from './utils.ts'

const uninstall: ModuleCommand = async ({ module, options }) => {
  if (!module) error('You should specify a module') // TODO move to functions
  console.log('uninstall module', module)
}

export default uninstall
