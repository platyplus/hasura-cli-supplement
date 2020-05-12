import { ModuleCommand } from './types.ts'

const upgrade: ModuleCommand = async ({ moduleName }) => {
  if (!moduleName) throw Error('You should specify a module')
  console.log('upgrade module:', moduleName)
  console.warn('unfinished script')
}

export default upgrade
