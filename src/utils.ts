import chalk from 'chalk'
import consola from 'consola'

import { Configuration } from '@nuxt/types'

import { scope } from './constants'

export const logger = consola.withScope(scope)

export const addBadgeMessage = (
  options: Configuration,
  enabled: boolean = true
) => {
  const status = enabled
    ? chalk.green.bold('enabled')
    : chalk.red.bold('disabled')

  options.cli!.badgeMessages.push(`Laravel support is ${status}`)
}

export const getModuleOptions = (
  options: Configuration,
  moduleKey: string,
  optionsKey?: string
) => {
  if (options.modules) {
    const nuxtModule = options.modules.find(
      m => (Array.isArray(m) && m[0] === moduleKey) || m === moduleKey
    )

    if (nuxtModule) {
      const optKey = optionsKey || moduleKey.split(/[-/]/).pop()

      const moduleOptions = Object.assign(
        {},
        (Array.isArray(nuxtModule) && nuxtModule[1]) || {},
        optKey ? options[optKey] : {}
      )

      if (Object.keys(moduleOptions).length) {
        return moduleOptions
      }
    }
  }

  return null
}
