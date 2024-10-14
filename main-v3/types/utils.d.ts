export type DeepPartial<T> = Partial<{
  [P in keyof T]: { [key: string]: object | string } | DeepPartial<T[P]>
}>
