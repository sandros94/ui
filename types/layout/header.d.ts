import type { CardUi, LinksUi, Optional } from '#s94-ui/types'
import type { slideover as slideoverConfig } from '@nuxt/ui/dist/runtime/ui.config'
import type { AppConfig } from 'nuxt/schema'

import type { ExtractDeepKey } from '../utils'

export interface HeaderUi {
  center: string
  container: string
  left: string
  links?: Partial<LinksUi>
  logo: string
  mobileButton: {
    base?: string
    icon?: {
      close?: string
      open?: string
    }
  }
  panel: {
    card?: Partial<CardUi> & {
      links?: string
      panelCenter?: string
    }
    slideover?: Optional<typeof slideoverConfig> & { side?: 'left' | 'right' }
  }
  right: string
  socials?: Partial<LinksUi>
  wrapper: string
}

export interface HeaderConfig {
  default: {
    mobileButton?: {
      icon?: {
        close?: string
        open?: string
      }
    }
    variant: HeaderVariant
  }
  variant: {
    default: HeaderUi
    rtl: Partial<HeaderUi>
  }
}

export type HeaderVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'header', 'variant']> | keyof HeaderConfig['variant']
