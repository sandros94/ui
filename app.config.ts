import type { DeepPartial, S94UiConfig } from '#s94-ui/types'
import type { AllConfigs } from '#s94-ui/types/configs'

export default defineAppConfig({
  s94Ui: {
    /* eslint-disable perfectionist/sort-objects */
    header: {
      height: '4.5rem',
    },
    light: {
      background: '#fafafa',
      foreground: '#000000',
    },
    dark: {
      background: '#090909',
      foreground: '#fafafa',
    },
    /* eslint-enable perfectionist/sort-objects */
  } as Partial<S94UiConfig> & DeepPartial<AllConfigs>,
  ui: {
    gray: 'neutral',
    primary: 'orange',
  },
})
