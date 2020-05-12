export const error = (message: string) => {
  console.error(message)
  Deno.exit(1)
}

//   TODO use Deno.dir('home') when stable
export const HOME_DIR = `~`
