export type Strategy = 'merge' | 'override'

export type DeepPartial<T> = Partial<{
  [P in keyof T]: { [key: string]: object | string } | DeepPartial<T[P]>
}>

type DeepKey<T, Keys extends string[]> =
  Keys extends [infer First, ...infer Rest]
    ? First extends keyof T
      ? Rest extends string[]
        ? DeepKey<T[First], Rest>
        : never
      : never
    : T

export type ExtractDeepKey<T, Path extends string[]> = DeepKey<T, Path> extends infer Result
  ? Result extends Record<string, any> ? keyof Result : never
  : never
