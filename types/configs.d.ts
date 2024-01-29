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
  S94UiConfig,
} from '#s94-ui/types'

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

declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: Partial<S94UiConfig> & DeepPartial<AllConfigs>
  }
}
