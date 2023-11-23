import type { slideover as USlideover } from '@nuxt/ui/dist/runtime/ui.config'
import type { LinkConfig } from './elements'

export interface HeaderConfig {
  wrapper: string,
  container: string,
  left: string,
  center: string,
  links?: Partial<LinkConfig>,
  right: string,
  socials?: Partial<LinkConfig>,
  logo: string,
  button: {
    base: string,
    icon: {
      open: string,
      close: string
    }
  },
  panel: {
    slideover: Partial<USlideover>
    card: {
      header: string,
      center: string,
      links: string,
      footer: string
    }
  }
}