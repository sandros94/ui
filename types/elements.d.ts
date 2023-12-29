import type { Link as ULink } from '@nuxt/ui/dist/runtime/types'

export interface Link extends ULink {
  label?: string
  icon?: string
  if?: () => boolean
}

interface LinkConfig {
  active: string
  inactive: string
  wrapper: string
  base: string
  label: string
  iconClass: string
  externalLink: string
}