import hasuraCli from './hasura-cli.ts'
import modules from './modules/index.ts'

if (Deno.args[0] === 'modules') await modules(Deno.args)
else await hasuraCli(Deno.args, false)
