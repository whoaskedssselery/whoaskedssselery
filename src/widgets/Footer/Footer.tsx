import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { links } from '@/shared/config/links'
import { useT } from '@/shared/i18n/useT'
import { type Lang, useSettings } from '@/shared/store/settings'
import { RollText } from '@/shared/ui/RollText/RollText'
import { WarmTooltip } from '@/shared/ui/WarmTooltip/WarmTooltip'
import './Footer.scss'

const START = 5
const BURST_MS = 1300

const leafForms: Record<Lang, Partial<Record<Intl.LDMLPluralRule, string>>> = {
	en: { one: 'cabbage leaf', other: 'cabbage leaves' },
	ru: { one: 'лист', few: 'листа', many: 'листов', other: 'листа' },
}

const cabbageLine = (lang: Lang, count: number) => {
	const forms = leafForms[lang]
	const leaves = forms[new Intl.PluralRules(lang).select(count)] ?? forms.other
	return lang === 'ru'
		? `Съел ${count} ${leaves} капусты, пока верстал этот сайт`
		: `Ate ${count} ${leaves} while building this site`
}

type Leaf = { id: number; x: number; y: number; rotate: number; size: number; tone: string }
type Burst = { id: number; left: number; top: number; leaves: Leaf[] }

const tones = ['#a8dc78', '#8cc65a', '#c3e89c']
let nextId = 0

const makeBurst = (left: number, top: number): Burst => ({
	id: nextId++,
	left,
	top,
	leaves: Array.from({ length: 5 }, () => ({
		id: nextId++,
		x: (Math.random() - 0.5) * 140,
		y: -(40 + Math.random() * 50),
		rotate: (Math.random() - 0.5) * 540,
		size: 18 + Math.random() * 14,
		tone: tones[Math.floor(Math.random() * tones.length)],
	})),
})

const LeafIcon = ({ tone }: { tone: string }) => (
	<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
		<path
			d="M12 2.5c-5.2 2-8.5 6.3-8.5 10.8a8.5 8.5 0 0 0 17 0c0-4.5-3.3-8.8-8.5-10.8Z"
			fill={tone}
		/>
		<path
			d="M12 6v15M12 11 8.4 8.6M12 11l3.6-2.4M12 15.5l-4.2-2.6M12 15.5l4.2-2.6"
			fill="none"
			stroke="#5f9e35"
			strokeWidth="1.2"
			strokeLinecap="round"
		/>
	</svg>
)

const Cabbage = () => {
	const t = useT('footer')
	const lang = useSettings((s) => s.lang)
	const reduce = useReducedMotion()
	const [eaten, setEaten] = useState(START)
	const [bursts, setBursts] = useState<Burst[]>([])
	const timers = useRef<number[]>([])

	useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

	return (
		<WarmTooltip content={t('more')}>
			<button
				type="button"
				className="footer__cabbage"
				onClick={(event) => {
					setEaten((count) => count + 1)
					if (reduce) return
					const rect = event.currentTarget.getBoundingClientRect()
					const left = event.clientX ? event.clientX - rect.left : rect.width / 2
					const top = event.clientY ? event.clientY - rect.top : rect.height / 2
					const burst = makeBurst(left, top)
					setBursts((list) => [...list, burst])
					timers.current.push(
						window.setTimeout(
							() => setBursts((list) => list.filter((b) => b.id !== burst.id)),
							BURST_MS,
						),
					)
				}}
			>
				<span aria-live="polite">{cabbageLine(lang, eaten)}</span>
				{bursts.map((burst) => (
					<span
						key={burst.id}
						className="footer__burst"
						style={{ left: burst.left, top: burst.top }}
						aria-hidden="true"
					>
						{burst.leaves.map((leaf) => (
							<motion.span
								key={leaf.id}
								className="footer__leaf"
								style={{ width: leaf.size, height: leaf.size }}
								initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.4 }}
								animate={{
									x: leaf.x,
									y: [0, leaf.y, leaf.y + 70],
									rotate: leaf.rotate,
									opacity: [1, 1, 0],
									scale: 1,
								}}
								transition={{
									duration: 1.2,
									ease: 'easeOut',
									y: { duration: 1.2, times: [0, 0.35, 1], ease: ['easeOut', 'easeIn'] },
									opacity: { duration: 1.2, times: [0, 0.7, 1] },
								}}
							>
								<LeafIcon tone={leaf.tone} />
							</motion.span>
						))}
					</span>
				))}
			</button>
		</WarmTooltip>
	)
}

const Email = () => {
	const t = useT('footer')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (!copied) return
		const timer = window.setTimeout(() => setCopied(false), 1600)
		return () => window.clearTimeout(timer)
	}, [copied])

	return (
		<WarmTooltip content={t('copy')}>
			<button
				type="button"
				className="footer__link roll-trigger"
				onClick={() => {
					navigator.clipboard
						?.writeText(links.email)
						.then(() => setCopied(true))
						.catch(() => {})
				}}
			>
				<RollText>{copied ? t('copied') : links.email}</RollText>
			</button>
		</WarmTooltip>
	)
}

const Outbound = ({ href, label }: { href: string | null; label: string }) => {
	const t = useT('footer')
	if (!href)
		return (
			<span className="footer__link" data-soon="true">
				{label} <span className="footer__soon">{t('soon')}</span>
			</span>
		)
	return (
		<a className="footer__link roll-trigger" href={href} target="_blank" rel="noopener noreferrer">
			<RollText>{label}</RollText>
			<ArrowUpRight size={13} weight="bold" aria-hidden="true" />
		</a>
	)
}

export const Footer = () => {
	const t = useT('footer')

	return (
		<footer className="footer">
			<div className="footer__plate">
				<Cabbage />

				<ul className="footer__links">
					<li>
						<Email />
					</li>
					<li>
						<Outbound href={links.hh} label="hh.ru" />
					</li>
					<li>
						<Outbound href={links.avito} label={t('avito')} />
					</li>
				</ul>

				{links.cv ? (
					<a className="footer__cv" href={links.cv} download>
						<DownloadSimple size={16} weight="bold" aria-hidden="true" />
						{t('cv')} PDF
					</a>
				) : (
					<span className="footer__cv" data-soon="true">
						<DownloadSimple size={16} weight="bold" aria-hidden="true" />
						{t('cv')} PDF · {t('soon')}
					</span>
				)}
			</div>
		</footer>
	)
}
