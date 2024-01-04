import type { DeepPartial, LinksUi, Strategy } from '#s94-ui/types'
import type { divider } from '#ui/ui.config'

export interface FooterUi {
  center: string
  container: string
  divider?: DeepPartial<typeof divider> & { strategy?: Strategy }
  left: string
  legal: string
  links?: Partial<LinksUi> & { strategy?: Strategy }
  logo: string
  right: string
  socials?: Partial<LinksUi> & { strategy?: Strategy }
  wrapper: string
}

export type FooterConfig = Partial<FooterUi>
