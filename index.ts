import { parse } from 'https://deno.land/std/flags/mod.ts'
import { GeneralOptions } from './types.ts'
import hasuraCli from './hasura-cli.ts'
import operations from './operations.ts'
import { error } from './utils.ts'

const generalOptions = async ({
  project,
  ...other
}: {
  [key: string]: string
}): Promise<GeneralOptions> => {
  project = project || Deno.cwd()
  try {
    const dirInfo = await Deno.lstat(project)
    if (!dirInfo.isDirectory) error(`${project} is not a directory`)
  } catch {
    error(`${project} does not exist`)
  }
  return {
    project,
    ...other,
  }
}

const { args } = Deno
if (args[0].toLowerCase() === 'module') {
  const { _: command, ...rawOptions } = parse(args)
  let [, moduleCommand, module] = command
  const options = await generalOptions(rawOptions)
  operations(moduleCommand)({ module, options })
} else await hasuraCli(args, false)
