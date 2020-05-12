export type GeneralOptions = { project: string; [key: string]: any }

export type ModuleCommand = (params: {
  moduleName?: string
  options: GeneralOptions
}) => Promise<void>

export type Module = {
  name: string
  description: string
}

export type HasuraConfig = {
  version?: 1 | 2
  metadata_directory?: string
}
