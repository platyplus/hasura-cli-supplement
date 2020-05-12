export const error = (message: string) => {
  console.error(message)
  Deno.exit(1)
}
