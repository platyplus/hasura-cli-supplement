import { GeneralOptions } from '../types.ts'

export type ModuleCommand = (params: {
  moduleName?: string
  options: GeneralOptions
}) => Promise<void>

type OperationDescription = {
  pre?: string
  post?: string
}

export type Module = {
  path: string
  name: string
  description: string
  repo?: string
  install?: OperationDescription
  uninstall?: OperationDescription
}
