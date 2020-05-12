export type GeneralOptions = { project: string; [key: string]: any }

export type ModuleCommand = (params: {
  module?: string | number
  options: GeneralOptions
}) => Promise<void>
