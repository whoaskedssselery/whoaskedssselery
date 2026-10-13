import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'
export type Lang = 'en' | 'ru'

type SettingsState = {
	theme: Theme
	lang: Lang
	setTheme: (theme: Theme) => void
	setLang: (lang: Lang) => void
}

const initialTheme = (): Theme =>
	document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
const initialLang = (): Lang => (document.documentElement.lang === 'ru' ? 'ru' : 'en')

export const useSettings = create<SettingsState>()(
	persist(
		(set) => ({
			theme: initialTheme(),
			lang: initialLang(),
			setTheme: (theme) => set({ theme }),
			setLang: (lang) => set({ lang }),
		}),
		{
			name: 'portfolio:settings',
			partialize: ({ theme, lang }) => ({ theme, lang }),
		},
	),
)

export const syncDocument = ({ theme, lang }: Pick<SettingsState, 'theme' | 'lang'>) => {
	const root = document.documentElement
	root.dataset.theme = theme
	root.lang = lang
}
