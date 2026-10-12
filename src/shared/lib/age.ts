import type { Lang } from '@/shared/store/settings'

const BIRTHDAY = new Date(2006, 3, 28)

export const ageOn = (now = new Date()) => {
	const years = now.getFullYear() - BIRTHDAY.getFullYear()
	const hadBirthday =
		now.getMonth() > BIRTHDAY.getMonth() ||
		(now.getMonth() === BIRTHDAY.getMonth() && now.getDate() >= BIRTHDAY.getDate())
	return hadBirthday ? years : years - 1
}

const yearForms: Partial<Record<Intl.LDMLPluralRule, string>> = {
	one: 'год',
	few: 'года',
	many: 'лет',
	other: 'года',
}

export const formatAge = (lang: Lang, age = ageOn()) =>
	lang === 'ru'
		? `${age} ${yearForms[new Intl.PluralRules('ru').select(age)] ?? yearForms.other}`
		: String(age)
