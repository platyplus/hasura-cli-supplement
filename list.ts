import { ModuleCommand } from './types.ts'
import repository from './repository.ts'

const list: ModuleCommand = async ({ options }) => {
  console.log('list modules')
  console.log(repository)
}
export default list
