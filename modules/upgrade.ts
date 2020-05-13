import { error } from '../utils.ts'
import { ModuleCommand } from './types.ts'

const upgrade: ModuleCommand = async ({ moduleName }) => {
  if (!moduleName) return error('You should specify a module')
  console.log('upgrade module:', moduleName)
  console.warn('unfinished script')
}

export default upgrade
