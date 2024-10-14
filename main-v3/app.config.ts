export default defineAppConfig({
  s94Ui: {}, // keep even if empty, to avoid errors in final projects
  ui: {
    colors: {
      info: 'sky',
      neutral: 'neutral',
      primary: 'orange',
    },
    textarea: {
      slots: {
        root: 'w-full',
      },
    },
    buttonGroup: {
      base: 'w-full',
    },
  },
})
