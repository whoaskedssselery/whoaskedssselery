import { useSettings } from '@/shared/store/settings'
import { dictionary, type Localized } from './dictionary'

type Dictionary = typeof dictionary
type Section = keyof Dictionary

export const useT = <S extends Section>(section: S) => {
	const lang = useSettings((s) => s.lang)
	return (key: keyof Dictionary[S]) => (dictionary[section][key] as Localized<string>)[lang]
}

export const useLocalized = () => {
	const lang = useSettings((s) => s.lang)
	return <T>(value: Localized<T>): T => value[lang]
}
