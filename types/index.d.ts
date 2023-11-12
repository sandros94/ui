import type { Link as ULink } from '@nuxt/ui/dist/runtime/types/link.d'

export interface Link extends ULink {
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
}
