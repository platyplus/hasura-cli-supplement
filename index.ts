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
    const dirInfo = await Deno.stat(project)
    if (!dirInfo.isDirectory) throw Error(`${project} is not a directory`)
  } catch (e) {
    return error(`${project} does not exist`)
  }
  return {
    project,
    ...other,
  }
}

if (Deno.args[0] === 'module') {
  const {
    _: [, command, name],
    ...options
  } = parse(Deno.args)
  operations(command)({
    moduleName: name as string,
    options: await generalOptions(options),
  })
} else await hasuraCli(Deno.args, false)
