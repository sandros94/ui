import type { DeepPartial, S94UiConfig } from '#s94-ui/types'
import type { AllConfigs } from '#s94-ui/types/configs'

export default defineAppConfig({
  s94Ui: {
    header: {
      height: '4.5rem'
    },
    light: {
      foreground: '#000000',
      background: '#fafafa'
    },
    dark: {
      foreground: '#fafafa',
      background: '#0f0f0f'
    }
  } as Partial<S94UiConfig> & DeepPartial<AllConfigs>,
  ui: {
    primary: 'orange',
    gray: 'neutral'
  }
})
