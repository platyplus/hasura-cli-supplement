const execCli = async (command: string, args?: string[], mute = true) => {
  // TODO mute
  const cli = Deno.run({
    cmd: ['hasura', command, ...(args || [])],
  })
  await cli.status()
  cli.close()
}

const installHasuraCli = async () => {
  const bash = Deno.run({ cmd: ['bash'], stdin: 'piped' })
  const installScript = await fetch(
    'https://github.com/hasura/graphql-engine/raw/stable/cli/get.sh'
  )
  await bash.stdin?.write(new Uint8Array(await installScript.arrayBuffer()))
  bash.stdin?.close()
  await bash.status()
  bash.close()
}

try {
  await execCli('version', [])
} catch {
  await installHasuraCli()
}

console.log('Done')
