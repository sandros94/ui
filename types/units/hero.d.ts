import type { AppConfig } from 'nuxt/schema'
import type { ExtractDeepKey } from '../utils'
import type { Button } from '#ui/types'
import type { button as UButton } from '#ui/ui.config'

export interface HeroCta extends Button {
  click?: Function
  if?: () => boolean
}

export interface HeroUi {
  base: string
  container: string
  cta: {
    button?: UButton
    wrapper?: string
  }
  headline: string
  subhead: string
  wrapper: string
}

export interface HeroConfig {
  default: {
    style: HeroStyle
    variant: HeroVariant
  }
  variant: {
    horizontal: {
      default: HeroUi
    }
    vertical: {
      default: HeroUi
    }
  }
}

export type HeroStyle = ExtractDeepKey<AppConfig, ['s94Ui', 'hero', 'variant']> | keyof HeroConfig['variant']
export type HeroVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'hero', 'variant', 'horizontal']> | ExtractDeepKey<AppConfig, ['s94Ui', 'hero', 'variant', 'vertical']> | keyof HeroConfig['variant']['horizontal'] | keyof HeroConfig['variant']['vertical']
