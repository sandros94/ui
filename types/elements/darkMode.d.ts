import type { DeepPartial } from '#s94-ui/types'
import type { AppConfig } from 'nuxt/schema'

import type { button, toggle } from '#ui/ui.config'
import type { ButtonColor, ButtonSize, ButtonVariant, ToggleColor, ToggleSize } from '#ui/types'

import type { ExtractDeepKey } from '../utils'

export interface DarkModeUi {
  button: typeof button
  toggle: typeof toggle
}

export interface DarkModeConfig {
  default: {
    button: {
      color: ButtonColor
      size: ButtonSize
      variant: ButtonVariant
    }
    offIcon: string
    onIcon: string
    style: 'button' | 'toggle'
    toggle: {
      color: ToggleColor
      size: ToggleSize
    }
  }
  style: Partial<DarkModeUi>
}
