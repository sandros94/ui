import { type TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'min-h-full flex flex-col overflow-hidden',
    header: 'flex-none px-4 py-5 sm:px-6',
    base: 'grow px-4 py-5 sm:px-6 overflow-y-auto',
    footer: 'flex-none px-4 py-5 sm:px-6',
  },
} satisfies Parameters<TV>[0]
