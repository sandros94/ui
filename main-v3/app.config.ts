export default defineAppConfig({
  s94Ui: {}, // keep even if empty, to avoid errors in final projects
  ui: {
    colors: {
      neutral: 'neutral',
      primary: 'orange',
      info: 'sky',
    },
    textarea: {
      slots: {
        root: 'w-full',
      },
    },
  },
})
