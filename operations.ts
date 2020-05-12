import { ModuleCommand } from './types.ts'
import list from './list.ts'
import install from './install.ts'
import uninstall from './uninstall.ts'
import upgrade from './upgrade.ts'

const operations: { [key: string]: ModuleCommand } = {
  list,
  install,
  uninstall,
  upgrade,
}

export default (command: string | number) => {
  if (!command) throw Error('You should specify a command')
  const operation = operations[command]
  if (!operation) throw Error(`Unknow module command: ${command}`)
  return operation
}
