import { expandGlob, exists } from 'https://deno.land/std/fs/mod.ts'
import { parse } from 'https://deno.land/std/encoding/yaml.ts'

import { HOME_DIR, error } from '../utils.ts'
import { Module } from './types.ts'

const REPO_DIR = `${HOME_DIR}/.hasura-modules`
const MODULES_REPO = 'https://github.com/platyplus/hasura-modules.git'

try {
  const dirInfo = await Deno.stat(REPO_DIR)
  if (!dirInfo.isDirectory) error(`${REPO_DIR} is not a directory`)
  const reset = Deno.run({
    cmd: ['git', '-C', REPO_DIR, 'reset', '--hard', '--quiet'],
    stdout: 'null',
  })
  await reset.status()
  reset.close()
  const pull = Deno.run({
    cmd: ['git', '-C', REPO_DIR, 'pull', '--quiet'],
    stdout: 'null',
  })
  await pull.status()
  pull.close()
} catch (error) {
  const git = Deno.run({
    cmd: ['git', 'clone', '--quiet', MODULES_REPO, REPO_DIR],
    stdout: 'null',
  })
  await git.status()
  git.close()
}

export const getModule = async (name: string): Promise<Module> => {
  try {
    const decoder = new TextDecoder('utf-8')
    const data = await Deno.readFile(`${REPO_DIR}/${name}/module.yaml`)
    return {
      ...(parse(decoder.decode(data)) as Module),
      name,
      path: `${REPO_DIR}/${name}`,
    }
  } catch (e) {
    return error(`Module not found: ${name}`)
  }
}

export const getAllModules = async () => {
  const modules: Module[] = []
  for await (const e of expandGlob(`*/`, {
    root: REPO_DIR,
    exclude: ['.git'],
  })) {
    if (await exists(`${e.path}/module.yaml`))
      modules.push(await getModule(e.name))
  }
  return modules
}
