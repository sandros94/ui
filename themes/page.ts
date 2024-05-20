import { type TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'min-h-svh flex flex-col overflow-x-hidden',
    header: 'h-[--header-height] flex-none',
    wrapper: ' grow flex flex-col lg:flex-row',
    left: 'flex-none max-lg:w-full lg:w-72',
    right: 'flex-none max-lg:w-full lg:w-72',
    container: 'grow max-lg:order-last flex flex-col',
    top: 'flex-none',
    content: 'grow',
    bottom: 'flex-none',
    footer: 'flex-none',
  },
} satisfies Parameters<TV>[0]
