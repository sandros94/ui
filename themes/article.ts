import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'max-w-screen-md mx-auto px-4 my-6',
    headlineRoot: 'my-12',
    headlineSpan: '',
    section: 'px-2 lg:px-8 mt-8 text-justify',
    paragraph: 'max-w-[50ch] text-justify text-lg mx-auto my-4',
  },
} satisfies Parameters<TV>[0]
