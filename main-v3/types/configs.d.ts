import type { DeepPartial } from '#s94-ui/types'
import type * as allThemes from '#s94-ui/themes'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<typeof allThemes>
  }
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<typeof allThemes>
  }
}
