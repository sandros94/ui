export * from './elements'
export * from './layout'
export * from './units'
export * from './utils'

export type S94UiConfig = {
  /* eslint-disable perfectionist/sort-object-types */
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
  /* eslint-enable perfectionist/sort-object-types */
}
