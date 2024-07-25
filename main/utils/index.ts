import { createDefu, defu } from 'defu'
import { extendTailwindMerge } from 'tailwind-merge'
import type { Strategy } from '#s94-ui/types'

const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      icons: [(classPart: string) => classPart.startsWith('i-')],
    },
  },
})

const defuTwMerge = createDefu((obj, key, value, namespace) => {
  if (namespace === 'default' || namespace.startsWith('default.')) {
    return false
  }
  if (namespace === 'popper' || namespace.startsWith('popper.')) {
    return false
  }
  if (namespace.endsWith('avatar') && key === 'size') {
    return false
  }
  if (namespace.endsWith('chip') && key === 'size') {
    return false
  }
  if (namespace.endsWith('badge') && (key === 'size' || key === 'color' || key === 'variant')) {
    return false
  }
  if (typeof obj[key] === 'string' && typeof value === 'string' && obj[key] && value) {
    // @ts-expect-error can be instanciated with any
    obj[key] = customTwMerge(obj[key], value)
    return true
  }
})

export function mergeConfig<T>(strategy: Strategy | string, ...configs: any): T {
  if (strategy === 'override') {
    return defu({}, ...configs) as T
  }

  return defuTwMerge({}, ...configs) as T
}
