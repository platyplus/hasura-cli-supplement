import { parse } from 'https://deno.land/std/encoding/yaml.ts'

type GeneralOptions = { project: string; [key: string]: any }

type HasuraConfig = {
  version?: 1 | 2
  metadata_directory?: string
}

//   TODO use Deno.dir('home') when stable
export const HOME_DIR = Deno.env.get('HOME')

export const error = (message: string): never => {
  console.error(message)
  Deno.exit(1)
}

export const getHasuraConfig = async (path: string): Promise<HasuraConfig> => {
  try {
    const decoder = new TextDecoder('utf-8')
    const data = await Deno.readFile(`${path}/config.yaml`)
    const config = parse(decoder.decode(data)) as HasuraConfig
    if (!config.version) config.version = 2
    return config
  } catch (e) {
    return error(`Cannot load Hasura config.yaml`)
  }
}

export const generalOptions = async ({
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
