import type {
  DarkModeConfig,
  DeepPartial,
  HeroConfig,
} from '#s94-ui/types'
import type * as allThemes from '#s94-ui/themes'

export interface AllConfigs {
  darkMode: DarkModeConfig
  hero: HeroConfig
}

export type S94UiConfig = {
  header: {
    height: string
  }
  light: {
    background: string
    foreground: string
  }
  dark: {
    background: string
    foreground: string
  }
}

export type S94Ui = S94UiConfig & AllConfigs & typeof allThemes

declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<S94Ui>
  }
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<S94Ui>
  }
}
