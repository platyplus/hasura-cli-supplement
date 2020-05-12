import { HOME_DIR, error } from './utils.ts'
const REPO_DIR = `${HOME_DIR}/.hasura-modules`

try {
  const dirInfo = await Deno.lstat(REPO_DIR)
  if (!dirInfo.isDirectory) error(`${REPO_DIR} is not a directory`)
  // TODO git pull
} catch {
  const cli = Deno.run({
    cmd: [
      'git',
      'clone',
      'https://github.com/platyplus/hasura-modules.git',
      REPO_DIR,
    ],
    stdout: 'null',
  })
  await cli.status()
  cli.close()
}
const modules: string[] = []
for await (const dirEntry of Deno.readDir(`${REPO_DIR}/modules`)) {
  if (dirEntry.isDirectory) {
    console.log(dirEntry.name)
    modules.push(dirEntry.name)
  }
}
export default modules
