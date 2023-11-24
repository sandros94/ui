export * from './elements'
export * from './layout'
export * from './units'

export type Strategy = string

export type Optional<T> = {
  [P in keyof T]?: T[P] extends object ? Optional<T[P]> : T[P]
}
