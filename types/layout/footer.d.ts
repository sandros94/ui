import type { DeepPartial, LinksGroupUi, LinksGroupVariant, LinksUi, Strategy } from '#s94-ui/types'
import type { divider } from '#ui/ui.config'
import type { AppConfig } from 'nuxt/schema'

import type { ExtractDeepKey } from '../utils'

export interface FooterUi {
  center: string
  container: string
  divider?: DeepPartial<typeof divider> & { strategy?: Strategy }
  left: string
  legal: string
  linksGroup?: {
    ui?: Partial<LinksGroupUi> & { strategy?: Strategy }
    variant?: LinksGroupVariant
  }
  logo: string
  right: string
  socials?: Partial<LinksUi> & { strategy?: Strategy }
  wrapper: string
}

export interface FooterConfig {
  default: {
    variant: FooterVariant
  }
  variant: {
    default: Partial<FooterUi>
  }
}

export type FooterVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'footer', 'variant']> | keyof FooterConfig['variant']
