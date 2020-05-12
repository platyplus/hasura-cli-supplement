import { parse } from 'https://deno.land/std/encoding/yaml.ts'
import { HasuraConfig } from './types.ts'

//   TODO use Deno.dir('home') when stable
export const HOME_DIR = Deno.env.get('HOME')

export const getHasuraConfig = async (path: string): Promise<HasuraConfig> => {
  try {
    const decoder = new TextDecoder('utf-8')
    const data = await Deno.readFile(`${path}/config.yaml`)
    return parse(decoder.decode(data)) as HasuraConfig
  } catch {
    throw Error(`Cannot load Hasura config.yaml`)
  }
}
