import { stringify } from 'https://deno.land/std/encoding/yaml.ts'

import hasuraCli from '../hasura-cli.ts'
import { error } from '../utils.ts'
import { GeneralOptions, HasuraConfig } from '../types.ts'

export const createTempProject = async (hasuraConfig: HasuraConfig) => {
  // * Create a temporary project directory
  const tempProject = await Deno.makeTempDir()

  // * Create a valid config.yaml file: only modules written in config v1 work
  await Deno.writeFile(
    `${tempProject}/config.yaml`,
    new TextEncoder().encode(stringify({ ...hasuraConfig, version: 1 }))
  )
  return tempProject
}

export const applyMigrations = async (
  project: string,
  options: GeneralOptions
) => {
  try {
    await hasuraCli('migrate apply', 'error', {
      ...options,
      project,
    })
  } catch {
    await Deno.remove(project, { recursive: true })
    return error('Impossible to apply migrations.')
  }
}
