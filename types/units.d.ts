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
  panel: {
    wrapper: string,
    header: string,
    body: string
  },
  button: {
    base: string,
    icon: {
      open: string,
      close: string
    }
  },
  slideover: {
    overlay: {
      background: string
    },
    card: {
      header: string,
      center: string,
      links: string,
      footer: string
    }
  }
}