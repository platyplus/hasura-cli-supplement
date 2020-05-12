const hasuraCli = async (args: string | string[], mute = true) => {
  if (typeof args === 'string') args = args.split(' ')
  const cli = Deno.run({
    cmd: ['hasura', ...args],
    stdout: mute ? 'null' : 'inherit',
  })
  await cli.status()
  cli.close()
}

// * Check if the Hasura CLI is installed, installs it if not
try {
  await hasuraCli('version')
} catch {
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