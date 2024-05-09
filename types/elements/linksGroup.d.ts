import type { AppConfig } from 'nuxt/schema'

import type { ExtractDeepKey } from '../utils'
import type { Links, LinksUi, LinksVariant } from '#s94-ui/types'

export interface LinksGroup {
  label?: string
  links: Links
}

export interface LinksGroupUi {
  group: {
    base?: string
    label?: string
    links?: Partial<LinksUi> & { variant?: LinksVariant, vertical?: boolean }
  }
  wrapper: string
}

export interface LinksGroupConfig {
  default: {
    variant: LinksGroupVariant
  }
  variant: {
    centered: LinksGroupUi
    default: LinksGroupUi
    rtl: LinksGroupUi
  }
}

export type LinksGroupVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'linksGroup', 'variant']> | keyof LinksGroupConfig['variant']
