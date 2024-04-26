import type { DeepPartial } from '#s94-ui/types'
import type { AppConfig } from 'nuxt/schema'

import { button, toggle } from '#ui/types'

import type { ExtractDeepKey } from '../utils'

export interface DarkModeUi {
  button: DeepPartial<typeof button>
  classFallback: string
  toggle: DeepPartial<typeof toggle>
}

export interface DarkModeConfig {
  default: {
    button: {
      color: DarkModeButtonColor
      variant: DarkModeButtonVariant
    }
    classFallback: string
    offIcon: string
    onIcon: string
    style: 'button' | 'toggle'
    toggle: {
      color: DarkModeToggleColor
    }
  }
  style: Partial<DarkModeUi>
}

export type DarkModeToggleColor = ExtractDeepKey<AppConfig, ['s94Ui', 'darkMode', 'style', 'toggle', 'color']> | keyof DarkModeConfig['style']['toggle']['color']
export type DarkModeButtonColor = ExtractDeepKey<AppConfig, ['s94Ui', 'darkMode', 'style', 'button', 'color']> | keyof DarkModeConfig['style']['button']['color']
export type DarkModeButtonVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'darkMode', 'style', 'button', 'variant']> | keyof DarkModeConfig['style']['button']['variant']
