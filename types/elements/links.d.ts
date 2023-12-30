import type { AppConfig } from 'nuxt/schema'
import type { ExtractDeepKey } from '../utils'
import type { Link as ULink } from '@nuxt/ui/dist/runtime/types'

export interface Link extends ULink {
  label?: string
  icon?: string
  if?: () => boolean
}

export interface LinksUi {
  active: string
  inactive: string
  wrapper: string
  base: string
  label: string
  iconClass: string
  externalLink: string
}

export interface LinksConfig {
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
  default: {
    variant: LinksVariant
  }
}

export type LinksVariant = keyof LinksConfig['variant']['horizontal'] | keyof LinksConfig['variant']['vertical'] | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'variant', 'horizontal']> | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'variant', 'vertical']>
