export default defineAppConfig({
  s94Ui: {
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
  },
  ui: {
    gray: 'neutral',
    primary: 'orange',
    modal: {
      background: 'bg-background dark:bg-background',
      overlay: {
        background: 'bg-background/75 dark:bg-background/75',
      },
    },
    slideover: {
      background: 'bg-background dark:bg-background',
      overlay: {
        background: 'bg-background/75 dark:bg-background/75',
      },
    },
  },
})
