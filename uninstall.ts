import { ModuleCommand } from './types.ts'

const uninstall: ModuleCommand = async ({ moduleName, options }) => {
  if (!moduleName) throw Error('You should specify a module')
  console.log('uninstall module:', moduleName)
  console.warn('unfinished script')
}

export default uninstall
