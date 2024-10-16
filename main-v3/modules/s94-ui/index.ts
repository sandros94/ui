import {
  createResolver,
  defineNuxtModule,
  addLayout,
  installModule,
  hasNuxtModule,
  addComponentsDir,
  addImportsDir,
} from 'nuxt/kit'
import { defu } from 'defu'
import { ensureDependencyInstalled } from 'nypm'

import { globalComponent } from './utils'
import type { DeepPartial } from '#ui/types/utils'
import type * as allThemes from '#s94-ui/themes'

export type * from './runtime/types'

export interface ModuleOptions {
  prefix: string
  global: boolean | ('elements' | 'layouts' | 'units')[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 's94-ui',
    configKey: 's94Ui',
    compatibility: {
      nuxt: '>=3.13.2',
    },
  },
  defaults: {
    prefix: 'S',
    global: false,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.alias['#s94-ui'] = resolve('./runtime')

    nuxt.options.s94Ui = options

    if (!hasNuxtModule('@nuxt/ui')) {
      await installModule('@nuxt/ui')
      await ensureDependencyInstalled('@tailwindcss/typography')
    }

    nuxt.options.appConfig.s94Ui ||= {}
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, {
      buttonGroup: {
        base: 'w-full',
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

    if (hasNuxtModule('nuxt-qrcode')) {
      nuxt.options.qrcode = defu(nuxt.options.qrcode, {
        options: {
          whiteColor: 'var(--ui-bg)',
          blackColor: 'var(--ui-text-highlighted)',
        },
      })
    }

    addComponentsDir({
      global: globalComponent(nuxt.options.s94Ui.global, 'elements'),
      path: resolve('./runtime/components/elements'),
      pathPrefix: false,
      prefix: nuxt.options.s94Ui.prefix,
    })
    addComponentsDir({
      global: globalComponent(nuxt.options.s94Ui.global, 'layouts'),
      path: resolve('./runtime/components/layouts'),
      pathPrefix: false,
      prefix: nuxt.options.s94Ui.prefix,
    })
    addComponentsDir({
      global: globalComponent(nuxt.options.s94Ui.global, 'units'),
      path: resolve('./runtime/components/units'),
      pathPrefix: false,
      prefix: nuxt.options.s94Ui.prefix,
    })

    addImportsDir(resolve('./runtime/composables'))

    addLayout(resolve('./runtime/layouts/page.vue'), 'page')
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Theme configuration */
    s94Ui?: DeepPartial<typeof allThemes>
  }
}
