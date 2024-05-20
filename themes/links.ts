import type { TV } from 'tailwind-variants'

export default {
  slots: {
    root: 'not-prose flex items-center',
    active: 'text-primary',
    inactive: 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white',
    base: 'relative inline-flex gap-x-2 font-light',
    externalIcon: 'i-ph-arrow-up-right-light',
    externalLinkBase: 'top-0 h-fit',
    externalLinkIconClass: 'subpixel-antialiased text-gray-700 dark:text-gray-300',
    iconClass: 'place-self-center',
    labelRoot: 'relative inline-flex max-w-full',
    labelBase: '',
  },
  variants: {
    vertical: {
      false: {
        root: 'gap-x-4',
        active: 'underline underline-offset-[10%]',
        base: 'hover:underline underline-offset-[10%] decoration-from-font',
        externalLinkBase: 'static -mx-1',
        labelRoot: 'gap-x-1',
      },
      true: {
        root: 'max-w-[inherit] flex-col items-start gap-y-2 font-light',
        base: 'max-w-full group',
        externalLinkBase: 'absolute right-0 translate-x-full',
        labelRoot: 'gap-x-2',
        labelBase: 'max-w-full truncate',
      },
    },
    variant: {
      default: {},
      line: {},
    },
  },
  compoundVariants: [
    {
      vertical: true,
      variant: 'line' as const,
      class: {
        root: 'border-s border-gray-300 dark:border-gray-700',
        active: 'border-current',
        base: 'pl-4 -ml-[1px] mr-[1px] border-s',
        inactive: 'border-transparent hover:border-black dark:hover:border-white',
      },
    },
    {
      vertical: true,
      variant: 'default' as const,
      class: {
        base: 'hover:underline underline-offset-[10%] decoration-from-font',
      },
    },
  ],
  defaultVariants: {
    vertical: false,
    variant: 'line' as const,
  },
} satisfies Omit<Parameters<TV>[0], 'compoundVariants' | 'defaultVariants'> & { compoundVariants: any, defaultVariants: any }
