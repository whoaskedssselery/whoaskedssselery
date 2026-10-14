import { useT } from '@/shared/i18n/useT'
import { withViewTransition } from '@/shared/lib/viewTransition'
import { type Lang, syncDocument, useSettings } from '@/shared/store/settings'
import { WarmTooltip } from '@/shared/ui/WarmTooltip/WarmTooltip'
import './LangToggle.scss'

const options: { value: Lang; label: string; name: string }[] = [
	{ value: 'en', label: 'EN', name: 'English' },
	{ value: 'ru', label: 'RU', name: 'Русский' },
]

export const LangToggle = () => {
	const lang = useSettings((s) => s.lang)
	const t = useT('controls')

	const select = (next: Lang) => {
		if (next === lang) return
		const root = document.documentElement
		root.dataset.vt = 'lang'
		const transition = withViewTransition(() => {
			useSettings.getState().setLang(next)
			syncDocument({ theme: useSettings.getState().theme, lang: next })
		})
		if (transition) transition.finished.finally(() => delete root.dataset.vt)
		else delete root.dataset.vt
	}

	return (
		// biome-ignore lint/a11y/useSemanticElements: an inline pair of text buttons, not a form group
		<div className="lang-toggle" role="group" aria-label={t('language')}>
			{options.map(({ value, label, name }, index) => (
				<span key={value} className="lang-toggle__item">
					{index > 0 && (
						<span className="lang-toggle__slash" aria-hidden="true">
							/
						</span>
					)}
					<WarmTooltip side="bottom" content={name}>
						<button
							type="button"
							className="lang-toggle__option"
							aria-pressed={lang === value}
							lang={value}
							onClick={() => select(value)}
						>
							{label}
						</button>
					</WarmTooltip>
				</span>
			))}
		</div>
	)
}
