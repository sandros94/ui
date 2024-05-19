import type {
  CardConfig,
  DarkModeConfig,
  DeepPartial,
  FooterConfig,
  HeaderConfig,
  HeroConfig,
  LinksConfig,
  LinksGroupConfig,
  MainConfig,
} from '#s94-ui/types'
import type * as allThemes from '#s94-ui/themes'

export interface AllConfigs {
  card: CardConfig
  darkMode: DarkModeConfig
  footer: FooterConfig
  header: HeaderConfig
  hero: HeroConfig
  links: LinksConfig
  linksGroup: LinksGroupConfig
  main: MainConfig
}

export type S94UiConfig = {
  header?: {
    height?: string
  }
  light?: {
    background?: string
    foreground?: string
  }
  dark?: {
    background?: string
    foreground?: string
  }
}

export type S94Ui = S94UiConfig & DeepPartial<AllConfigs> & DeepPartial<typeof allThemes>

declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: S94Ui
  }
}
