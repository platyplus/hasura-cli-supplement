import { parse } from 'https://deno.land/std/flags/mod.ts'

import { defaultOptions, error } from '../utils.ts'

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

const getOperation = (command: string | number) => {
  if (!command) return error('You should specify a command')
  const operation = operations[command]
  if (!operation) return error(`Unknow module command: ${command}`)
  return operation
}

const modulesCommand = async (args: string[]) => {
  const {
    _: [, command, name],
    ...options
  } = parse(args)
  getOperation(command)({
    moduleName: name as string,
    options: await defaultOptions(options),
  })
}

export default modulesCommand
