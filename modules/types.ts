import { GeneralOptions } from '../types.ts'

export type ModuleCommand = (params: {
  moduleName?: string
  options: GeneralOptions
}) => Promise<void>

export type Module = {
  path: string
  name: string
  description: string
}
