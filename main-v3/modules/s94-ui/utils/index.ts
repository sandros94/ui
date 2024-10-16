import type { ModuleOptions } from '..'

export function globalComponent(
  global: ModuleOptions['global'],
  component: Exclude<ModuleOptions['global'], boolean>[number],
): boolean {
  if (!Array.isArray(global)) return true

  return global.includes(component)
}
