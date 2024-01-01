import type { slideover as slideoverConfig } from '@nuxt/ui/dist/runtime/ui.config'

import type { Optional } from './'
import type { LinksUi } from './elements'

export interface HeaderConfig {
  button: {
    base: string
    icon: {
      close: string
      open: string
    }
  }
  center: string
  container: string
  left: string
  links?: Partial<LinksUi>
  logo: string
  panel: {
    card: {
      center: string
      footer: string
      header: string
      links: string
    }
    slideover: Optional<typeof slideoverConfig>
  }
  right: string
  socials?: Partial<LinksUi>
  wrapper: string
}
