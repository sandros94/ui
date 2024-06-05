import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'flex flex-wrap gap-4',
    base: 'p-2 w-fit',
    label: 'pb-2 text-lg uppercase',
    linksRoot: '',
    linksBase: '',
  },
  variants: {
    variant: {
      centered: {
        root: 'justify-center',
        base: 'text-center',
        linksBase: 'mx-auto',
      },
      rtl: {
        base: 'text-right',
        linksBase: 'ml-auto',
      },
    },
  },
} satisfies Parameters<TV>[0]
