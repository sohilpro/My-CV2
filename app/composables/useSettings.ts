import type { Bi } from '~/data/portfolio'

export type Locale = 'en' | 'fa'

export const useLocale = () =>
  useCookie<Locale>('locale', { default: () => 'en', maxAge: 60 * 60 * 24 * 365 })

export const useTheme = () =>
  useCookie<'dark' | 'light'>('theme', { default: () => 'dark', maxAge: 60 * 60 * 24 * 365 })

export const useLang = () => {
  const locale = useLocale()
  const t = (x: Bi) => x[locale.value]
  return { locale, t }
}