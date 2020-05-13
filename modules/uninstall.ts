import { error } from '../utils.ts'
import { ModuleCommand } from './types.ts'

const uninstall: ModuleCommand = async ({ moduleName, options }) => {
  if (!moduleName) return error('You should specify a module')
  console.log('uninstall module:', moduleName)
  console.warn('unfinished script')
}

export default uninstall
