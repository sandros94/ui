export * from './elements'
export * from './layout'
export * from './units'
export * from './utils'

export type S94UiConfig = {
  header?: {
    height?: string
  }
  light?: {
    foreground?: string
    background?: string
  }
  dark?: {
    foreground?: string
    background?: string
  }
}
