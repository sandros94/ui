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
  },
  ui: {
    primary: 'orange',
    gray: 'neutral'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    s94Ui?: {
      header?: {
        height?: string
      },
      light?: {
        foreground?: string
        background?: string
      },
      dark?: {
        foreground?: string
        background?: string
      }
    }
  }
}
