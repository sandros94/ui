import type { DeepPartial } from '#s94-ui/types'
import type { AppConfig } from 'nuxt/schema'

import { button, toggle } from '@nuxt/ui/dist/runtime/types'

import type { ExtractDeepKey } from '../utils'

export interface ColorModeUi {
  button: DeepPartial<typeof button>
  classFallback: string
  toggle: DeepPartial<typeof toggle>
}

export interface ColorModeConfig {
  default: {
    button: {
      color: ColorModeButtonColor
      variant: ColorModeButtonVariant
    }
    classFallback: string
    offIcon: string
    onIcon: string
    style: 'button' | 'toggle'
    toggle: {
      color: ColorModeToggleColor
    }
  }
  style: Partial<ColorModeUi>
}

export type ColorModeToggleColor = ExtractDeepKey<AppConfig, ['s94Ui', 'colorMode', 'style', 'toggle', 'color']> | keyof ColorModeConfig['style']['toggle']['color']
export type ColorModeButtonColor = ExtractDeepKey<AppConfig, ['s94Ui', 'colorMode', 'style', 'button', 'color']> | keyof ColorModeConfig['style']['button']['color']
export type ColorModeButtonVariant = ExtractDeepKey<AppConfig, ['s94Ui', 'colorMode', 'style', 'button', 'variant']> | keyof ColorModeConfig['style']['button']['variant']
