import { ModuleCommand } from './types.ts'
import { error } from './utils.ts'

const upgrade: ModuleCommand = async ({ module }) => {
  if (!module) error('You should specify a module') // TODO move to functions
  console.log('upgrade module', module)
}

export default upgrade
