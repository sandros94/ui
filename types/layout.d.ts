import type { slideover as slideoverConfig } from '@nuxt/ui/dist/runtime/ui.config'
import type { LinksClasses } from './elements'
import type { Optional } from './'

export interface HeaderConfig {
  wrapper: string
  container: string
  left: string
  center: string
  links?: Partial<LinksClasses>
  right: string
  socials?: Partial<LinksClasses>
  logo: string
  button: {
    base: string
    icon: {
      open: string
      close: string
    }
  }
  panel: {
    slideover: Optional<typeof slideoverConfig>
    card: {
      header: string
      center: string
      links: string
      footer: string
    }
  }
}