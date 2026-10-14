import { useId, useRef } from 'react'
import { useT } from '@/shared/i18n/useT'
import { withViewTransition } from '@/shared/lib/viewTransition'
import { syncDocument, useSettings } from '@/shared/store/settings'
import { WarmTooltip } from '@/shared/ui/WarmTooltip/WarmTooltip'
import './ThemeToggle.scss'

const rays = Array.from({ length: 8 }, (_, index) => index * 45)

export const ThemeToggle = () => {
	const theme = useSettings((s) => s.theme)
	const t = useT('controls')
	const ref = useRef<HTMLButtonElement>(null)
	const maskId = useId()
	const label = theme === 'dark' ? t('toLight') : t('toDark')

	const toggle = () => {
		const next = theme === 'dark' ? 'light' : 'dark'
		const root = document.documentElement
		const rect = ref.current?.getBoundingClientRect()
		const x = rect ? rect.left + rect.width / 2 : innerWidth / 2
		const y = rect ? rect.top + rect.height / 2 : 0

		root.dataset.vt = 'theme'
		const transition = withViewTransition(() => {
			useSettings.getState().setTheme(next)
			syncDocument({ theme: next, lang: useSettings.getState().lang })
		})

		if (!transition) {
			delete root.dataset.vt
			return
		}

		const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
		transition.ready.then(() => {
			root.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
				{
					duration: 650,
					easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
					fill: 'forwards',
					pseudoElement: '::view-transition-new(root)',
				},
			)
		})
		transition.finished.finally(() => {
			delete root.dataset.vt
		})
	}

	return (
		<WarmTooltip side="bottom" content={label}>
			<button
				ref={ref}
				type="button"
				className="theme-toggle"
				data-theme={theme}
				onClick={toggle}
				aria-label={label}
			>
				<svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
					<mask id={maskId}>
						<rect width="24" height="24" fill="#fff" />
						<circle className="theme-toggle__shadow" cx="17" cy="7" r="6" fill="#000" />
					</mask>
					<circle className="theme-toggle__core" cx="12" cy="12" r="5" mask={`url(#${maskId})`} />
					<g className="theme-toggle__rays">
						{rays.map((angle) => (
							<line
								key={angle}
								x1="12"
								y1="1.75"
								x2="12"
								y2="3.75"
								transform={`rotate(${angle} 12 12)`}
							/>
						))}
					</g>
				</svg>
			</button>
		</WarmTooltip>
	)
}
