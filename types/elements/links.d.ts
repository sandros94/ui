import type { Link as ULink } from '@nuxt/ui/dist/runtime/types'
import { links } from '#s94-ui/ui.config'
import type { AppConfig } from 'nuxt/schema'
import type { ExtractDeepKey } from '../utils'

export interface Link extends ULink {
  label?: string
  icon?: string
  if?: () => boolean
}

export type LinksHorizontalVariant = keyof typeof links.horizontal.variant | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'horizontal', 'variant']>
export type LinksVerticalVariant = keyof typeof links.vertical.variant | ExtractDeepKey<AppConfig, ['s94Ui', 'links', 'vertical', 'variant']>

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
