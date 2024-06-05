import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'max-w-screen-lg h-full mx-auto',
    base: 'min-h-fit w-full mx-auto',
  },
  variants: {
    padded: {
      true: {
        root: 'flex flex-col justify-around',
      },
    },
  },
} satisfies Parameters<TV>[0]
