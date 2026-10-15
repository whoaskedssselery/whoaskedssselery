import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { LangToggle } from '@/features/lang-toggle/LangToggle'
import { ThemeToggle } from '@/features/theme-toggle/ThemeToggle'
import { links } from '@/shared/config/links'
import { useT } from '@/shared/i18n/useT'
import { goToSection } from '@/shared/lib/goToSection'
import { useRouter } from '@/shared/lib/router'
import { scrollToId, setScrollLocked } from '@/shared/lib/scroll'
import { useIntro } from '@/shared/store/intro'
import { RollText } from '@/shared/ui/RollText/RollText'
import { WarmTooltip } from '@/shared/ui/WarmTooltip/WarmTooltip'
import './Header.scss'

const sections = ['stack', 'work', 'contact'] as const
const menuSections = ['about', ...sections] as const
const ease = [0.76, 0, 0.24, 1] as const

const socials = [
	{ name: 'Telegram', href: links.telegram },
	{ name: 'GitHub', href: links.github },
]

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
	const t = useT('nav')

	return (
		<motion.div
			id="mobile-menu"
			className="header__menu"
			initial={{ clipPath: 'inset(0 0 100% 0)' }}
			animate={{ clipPath: 'inset(0 0 0% 0)' }}
			exit={{ clipPath: 'inset(0 0 100% 0)' }}
			transition={{ duration: 0.6, ease }}
		>
			<nav className="header__menu-nav" aria-label={t('label')}>
				{menuSections.map((id, index) => (
					<span className="header__menu-mask" key={id}>
						<motion.a
							className="header__menu-link"
							href={`#${id}`}
							initial={{ y: '110%' }}
							animate={{ y: 0 }}
							exit={{ y: '110%' }}
							transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.06 }}
							onClick={(event) => {
								event.preventDefault()
								onClose()
								goToSection(id, t(id))
							}}
						>
							{t(id)}
						</motion.a>
					</span>
				))}
			</nav>

			<motion.ul
				className="header__menu-socials"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.4 } }}
				exit={{ opacity: 0 }}
			>
				{socials.map(({ name, href }) => (
					<li key={name}>
						<a href={href} target="_blank" rel="noopener noreferrer">
							{name}
							<ArrowUpRight size={14} weight="bold" aria-hidden="true" />
						</a>
					</li>
				))}
			</motion.ul>
		</motion.div>
	)
}

export const Header = () => {
	const t = useT('nav')
	const controls = useT('controls')
	const hero = useT('hero')
	const introDone = useIntro((s) => s.done)
	const [menu, setMenu] = useState(false)
	const burger = useRef<HTMLButtonElement>(null)
	const burgerLabel = menu ? controls('closeMenu') : controls('openMenu')

	useEffect(() => {
		if (!menu) return
		setScrollLocked(true)
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setMenu(false)
		}
		const onResize = () => {
			if (innerWidth >= 640) setMenu(false)
		}
		window.addEventListener('keydown', onKey)
		window.addEventListener('resize', onResize)
		return () => {
			setScrollLocked(false)
			window.removeEventListener('keydown', onKey)
			window.removeEventListener('resize', onResize)
		}
	}, [menu])

	return (
		<header className="header" data-ready={introDone} data-menu={menu}>
			<a
				className="header__brand roll-trigger"
				href="./"
				onClick={(event) => {
					event.preventDefault()
					setMenu(false)
					if (useRouter.getState().route.name === 'home') scrollToId('top')
					else goToSection('top', `${hero('first')} ${hero('last')}`)
				}}
			>
				<RollText>
					{hero('first')} {hero('last')}
				</RollText>
			</a>

			<nav className="header__nav" aria-label={t('label')}>
				{sections.map((id) => (
					<a
						key={id}
						className="header__link roll-trigger"
						href={`#${id}`}
						onClick={(event) => {
							event.preventDefault()
							goToSection(id, t(id))
						}}
					>
						<RollText>{t(id)}</RollText>
					</a>
				))}
			</nav>

			<div className="header__controls">
				<LangToggle />
				<ThemeToggle />
				<WarmTooltip side="bottom" content={burgerLabel}>
					<button
						type="button"
						ref={burger}
						className="header__burger"
						aria-expanded={menu}
						aria-controls="mobile-menu"
						aria-label={burgerLabel}
						onClick={() => setMenu((open) => !open)}
					>
						<span />
						<span />
					</button>
				</WarmTooltip>
			</div>

			<AnimatePresence>
				{menu && (
					<MobileMenu
						onClose={() => {
							setMenu(false)
							burger.current?.focus({ preventScroll: true })
						}}
					/>
				)}
			</AnimatePresence>
		</header>
	)
}
