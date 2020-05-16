import { ModuleCommand } from './types.ts'
import { getAllModules } from './repository.ts'
const LIST_FORMAT = '%s\t\t%s'

const list: ModuleCommand = async () => {
  console.log(LIST_FORMAT, 'NAME', 'DESCRIPTION')
  for (const { name, description } of await getAllModules()) {
    console.log(LIST_FORMAT, name, description)
  }
}
export default list
