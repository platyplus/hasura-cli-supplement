import { ModuleCommand } from './types.ts'
import { getAllModules } from './repository.ts'

const list: ModuleCommand = async ({ options }) => {
  console.log('NAME\t\tDESCRIPTION')
  for (const module of await getAllModules()) {
    console.log('%s\t\t%s', module.name, module.description)
  }
}
export default list
