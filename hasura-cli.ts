const hasuraCli = async (
  args: string | string[],
  log: boolean | 'error' = 'error',
  options: { [key: string]: string } = {}
) => {
  if (typeof args === 'string') args = args.split(' ')
  const cli = Deno.run({
    cmd: [
      'hasura',
      ...args,
      ...Object.entries(options)
        .map<string[]>(([key, value]) => [`--${key}`, value])
        .flat(),
    ],
    stdout: log === true ? 'inherit' : 'null',
    stderr: !!log ? 'inherit' : 'null',
  })
  const { code } = await cli.status()
  cli.close()
  if (code !== 0) throw new Error()
}

// * Check if the Hasura CLI is installed, installs it if not
try {
  await hasuraCli('version', false)
} catch (error) {
  const bash = Deno.run({ cmd: ['bash'], stdin: 'piped' })
  const installScript = await fetch(
    'https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh'
  )
  await bash.stdin?.write(new Uint8Array(await installScript.arrayBuffer()))
  bash.stdin?.close()
  await bash.status()
  bash.close()
}

export default hasuraCli
