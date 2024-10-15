import { defineNuxtModule } from 'nuxt/kit'
import { defu } from 'defu'

import type { DeepPartial } from '#ui/types/utils'
import type * as allThemes from '#s94-ui/themes'

export default defineNuxtModule({
  meta: {
    name: 's94-ui',
  },
  setup(_, nuxt) {
    nuxt.options.appConfig.s94Ui ||= {}
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, {
      buttonGroup: {
        base: 'w-full',
      },
      colors: {
        info: 'sky',
        neutral: 'neutral',
        primary: 'orange',
      },
      icons: {
        menu: 'i-heroicons-bars-2',
      },
      textarea: {
        slots: {
          root: 'w-full',
        },
      },
    })
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<typeof allThemes>
  }
}
