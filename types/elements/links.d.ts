import type { Link as ULink } from '@nuxt/ui/dist/runtime/types'
import type { AppConfig } from 'nuxt/schema'

import type { ExtractDeepKey } from '../utils'

export interface Link extends ULink {
  icon?: string
  if?: () => boolean
  label?: string
}

export interface LinksUi {
  active: string
  base: string
  externalLink: string
  iconClass: string
  inactive: string
  label: string
  wrapper: string
}

export interface LinksConfig {
  default: {
    variant: LinksVariant
  }
  variant: {
    horizontal: {
      default: LinksUi
      line: Partial<LinksUi>
    }
    vertical: {
      default: LinksUi
      line: Partial<LinksUi>
    }
  }
}

export type LinksVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'variant', 'horizontal']> | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'variant', 'vertical']> | keyof LinksConfig['variant']['horizontal'] | keyof LinksConfig['variant']['vertical']
