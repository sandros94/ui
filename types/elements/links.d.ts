import type { Link as ULink } from '@nuxt/ui/dist/runtime/types'
import type { AppConfig } from 'nuxt/schema'
import type { ExtractDeepKey } from '../utils'

export interface Link extends ULink {
  label?: string
  icon?: string
  if?: () => boolean
}

interface LinksClasses {
  active: string
  inactive: string
  wrapper: string
  base: string
  label: string
  iconClass: string
  externalLink: string
}

export interface LinksConfig {
  horizontal: {
    variant: {
      default: LinksClasses
      line: Partial<LinksClasses>
    }
  }
  vertical: {
    variant: {
      default: LinksClasses
      line: Partial<LinksClasses>
    }
  }
  default: {
    variant: LinksHorizontalVariant | LinksVerticalVariant
  }
}

export type LinksHorizontalVariant = keyof LinksConfig['horizontal']['variant'] | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'horizontal', 'variant']>
export type LinksVerticalVariant = keyof LinksConfig['vertical']['variant'] | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'vertical', 'variant']>
