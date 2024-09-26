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
    colors: {
      gray: 'neutral',
      primary: 'orange',
    },
    modal: {
      slots: {
        overlay: 'bg-background/75 dark:bg-background/75',
        content: 'bg-background dark:bg-background',
      },
    },
    slideover: {
      slots: {
        overlay: 'bg-background/75 dark:bg-background/75',
        content: 'bg-background dark:bg-background',
      },
    },
  },
})
